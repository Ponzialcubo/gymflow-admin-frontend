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
    totalesActuales, diferenciaKcal, handleSubmit,
    comidas, setComidas, catalogoAlimentos
  } = useNutrition();

  const [slideOverState, setSlideOverState] = useState({ isOpen: false, comidaId: null });

  const handleAddFoodToMeal = (alimento, cantidad) => {
    setComidas(prev => prev.map(comida => 
      comida.id_temporal === slideOverState.comidaId 
        ? { ...comida, alimentos: [...comida.alimentos, { ...alimento, cantidad_g: cantidad }] }
        : comida
    ));
    setSlideOverState({ isOpen: false, comidaId: null });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 relative animate-in fade-in duration-700">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
        <NutritionHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 border-b border-slate-100">
          <NutritionForm 
            socios={socios} form={form} setForm={setForm}
            totalesActuales={totalesActuales || { kcal: 0, proteinas: 0, carbohidratos: 0, grasas: 0 }} 
            diferenciaKcal={diferenciaKcal}
          />
          <NutritionGuide />
        </div>

        <DietBuilder 
          comidas={comidas} 
          setComidas={setComidas}
          onOpenFoodSearch={(id) => setSlideOverState({ isOpen: true, comidaId: id })}
        />

        <div className="p-8 bg-slate-50 border-t border-slate-100">
           <button 
             onClick={handleSubmit}
             disabled={loading}
             className="w-full py-6 bg-slate-900 text-emerald-400 hover:bg-slate-800 font-black rounded-3xl transition-all uppercase tracking-[0.2em] text-xs"
           >
             {loading ? 'Guardando...' : 'Guardar Plan Nutricional Definitivo 🚀'}
           </button>
        </div>

        <RecentPlansFeed recientes={recientes} />
      </div>

      <FoodSlideOver 
        isOpen={slideOverState.isOpen}
        onClose={() => setSlideOverState({ isOpen: false })}
        catalogoAlimentos={catalogoAlimentos}
        onAddFood={handleAddFoodToMeal}
      />

      {mensaje.texto && (
        <div className={`fixed bottom-10 right-10 p-5 rounded-2xl shadow-2xl border font-black text-[10px] uppercase tracking-widest z-50 ${
          mensaje.tipo === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}