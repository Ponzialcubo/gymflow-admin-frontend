import React, { useState } from 'react';
import { useNutrition } from './hooks/useNutrition';
import NutritionHeader from './components/NutritionHeader';
import NutritionForm from './components/NutritionForm';
import NutritionGuide from './components/NutritionGuide';
import RecentPlansFeed from './components/RecentPlansFeed';
import DietBuilder from './components/DietBuilder';
import FoodSlideOver from './components/FoodSlideOver';

export default function NutritionSection() {
  const {
    socios, form, setForm, recientes, mensaje, loading,
    kcalCalculadas, diferenciaKcal, handleSubmit,
    comidas, setComidas, catalogoAlimentos
  } = useNutrition();

  // Controla el panel lateral: si está abierto y a qué comida le vamos a añadir el alimento
  const [slideOverState, setSlideOverState] = useState({ isOpen: false, comidaId: null });

  const handleAddFoodToMeal = (alimento, cantidad) => {
  setComidas(prevComidas => {
    return prevComidas.map(comida => {
      if (comida.id_temporal === slideOverState.comidaId) {
        // Creamos una nueva instancia de la comida y del array de alimentos
        return {
          ...comida,
          alimentos: [...comida.alimentos, { ...alimento, cantidad_g: cantidad }]
        };
      }
      return comida;
    });
  });
  setSlideOverState({ isOpen: false, comidaId: null });
};

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 animate-in fade-in duration-700 relative">
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden">
        <NutritionHeader />
        
        {/* FASE 1: OBJETIVOS */}
        <div className="grid grid-cols-1 lg:grid-cols-5 border-b border-slate-100">
          <NutritionForm 
            socios={socios} form={form} setForm={setForm}
            kcalCalculadas={kcalCalculadas} diferenciaKcal={diferenciaKcal}
          />
          <NutritionGuide />
        </div>

        {/* FASE 2: CONSTRUCTOR DE COMIDAS */}
        <DietBuilder 
          comidas={comidas} 
          setComidas={setComidas}
          onOpenFoodSearch={(comidaId) => setSlideOverState({ isOpen: true, comidaId })}
        />

        {/* BOTÓN MAESTRO DE GUARDADO */}
        <div className="p-8 bg-slate-50 border-t border-slate-100">
           <button 
             onClick={handleSubmit}
             disabled={loading}
             className={`w-full py-6 bg-slate-900 text-emerald-400 hover:bg-slate-800 font-black rounded-3xl shadow-xl transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 ${loading ? 'opacity-50' : ''}`}
           >
             {loading ? 'Sincronizando Plan Completo...' : 'Guardar Plan Nutricional Definitivo'}
             {!loading && <span className="text-lg">🚀</span>}
           </button>
        </div>

        <RecentPlansFeed recientes={recientes} />
      </div>

      {/* PANEL LATERAL DE ALIMENTOS */}
      <FoodSlideOver 
        isOpen={slideOverState.isOpen}
        onClose={() => setSlideOverState({ isOpen: false, comidaId: null })}
        catalogoAlimentos={catalogoAlimentos}
        onAddFood={handleAddFoodToMeal}
      />

      {/* TOASTS DE MENSAJE (Corregido) */}
      {mensaje.texto && (
        <div className={`fixed bottom-10 right-10 p-5 rounded-2xl shadow-2xl border font-black text-[10px] uppercase tracking-widest z-50 animate-in slide-in-from-bottom-5 ${
          mensaje.tipo === 'success' ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-red-500 border-red-400 text-white'
        }`}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}