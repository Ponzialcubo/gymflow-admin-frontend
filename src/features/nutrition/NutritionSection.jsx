import React from 'react';
import { useNutrition } from './hooks/useNutrition';
import NutritionHeader from './components/NutritionHeader';
import NutritionForm from './components/NutritionForm';
import NutritionGuide from './components/NutritionGuide';
import RecentPlansFeed from './components/RecentPlansFeed';

export default function NutritionSection() {
  const {
    socios, form, setForm, recientes, mensaje, loading,
    kcalCalculadas, diferenciaKcal, handleSubmit
  } = useNutrition();

  return (
    // UNIFICADO: space-y-8, duration-700 y w-full
    <div className="w-full pb-20 animate-in fade-in duration-700 space-y-8">
      
      {/* Header fuera del card para mayor ligereza visual */}
      <NutritionHeader />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* BLOQUE PRINCIPAL: FORMULARIO Y GUÍA (2/3 del ancho) */}
        <div className="xl:col-span-2 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Formulario de nutrición */}
            <div className="lg:col-span-3">
              <NutritionForm 
                socios={socios}
                form={form}
                setForm={setForm}
                loading={loading}
                handleSubmit={handleSubmit}
                kcalCalculadas={kcalCalculadas}
                diferenciaKcal={diferenciaKcal}
              />
            </div>
            
            {/* Guía lateral de macros (ocupa 2 columnas del grid interno) */}
            <div className="lg:col-span-2 bg-slate-50/50 border-l border-slate-100">
              <NutritionGuide />
            </div>
          </div>
        </div>

        {/* FEED DE PLANES RECIENTES (1/3 del ancho) */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 h-full">
          <RecentPlansFeed recientes={recientes} />
        </div>
      </div>

      {/* MENSAJE DE ESTADO (TOAST) CENTRAL Y PRO */}
      {mensaje.texto && (
        <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 px-10 py-5 rounded-[2rem] shadow-2xl font-black text-xs uppercase tracking-widest z-[200] animate-in slide-in-from-bottom-6 duration-500 flex items-center gap-3 ${
          mensaje.tipo === 'success' 
          ? 'bg-slate-900 text-emerald-400 border-2 border-emerald-400/20' 
          : 'bg-red-600 text-white shadow-red-200'
        }`}>
          <span>{mensaje.tipo === 'success' ? '🥗' : '⚠️'}</span>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}