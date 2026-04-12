import React from 'react';

export default function DietBuilder({ comidas, setComidas, onOpenFoodSearch }) {
  
  const handleRemoveFood = (comidaId, alimentoIndex) => {
    setComidas(prevComidas => prevComidas.map(comida => {
      if (comida.id_temporal === comidaId) {
        const nuevosAlimentos = [...comida.alimentos];
        nuevosAlimentos.splice(alimentoIndex, 1);
        return { ...comida, alimentos: nuevosAlimentos };
      }
      return comida;
    }));
  };

  return (
    <div className="p-8 md:p-12 bg-white">
      <div className="mb-8">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">Estructura del Menú</h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
          Añade alimentos a cada bloque del día
        </p>
      </div>

      <div className="space-y-6">
        {comidas.map((comida) => (
          <div key={comida.id_temporal} className="p-6 rounded-3xl border-2 border-slate-100 bg-slate-50/50 group">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-black text-slate-700 uppercase tracking-widest text-sm">{comida.nombre}</h4>
              <button 
                onClick={() => onOpenFoodSearch(comida.id_temporal)}
                className="px-4 py-2 bg-white border border-slate-200 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-50 hover:border-blue-200 shadow-sm transition-all"
              >
                + Añadir Alimento
              </button>
            </div>

            {comida.alimentos.length === 0 ? (
              <div className="p-4 rounded-2xl border border-dashed border-slate-200 bg-white/50 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bloque vacío</span>
              </div>
            ) : (
              <div className="space-y-2">
                {comida.alimentos.map((alimento, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div>
                      <p className="text-sm font-black text-slate-800">{alimento.nombre}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        {alimento.cantidad_g}g • {(alimento.calorias_100g * (alimento.cantidad_g / 100)).toFixed(0)} kcal
                      </p>
                    </div>
                    <button 
                      onClick={() => handleRemoveFood(comida.id_temporal, idx)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}