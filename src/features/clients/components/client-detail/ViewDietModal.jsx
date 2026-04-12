import React from 'react';

export default function ViewDietModal({ isOpen, onClose, dieta }) {
  if (!isOpen || !dieta) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        
        {/* Header del Modal */}
        <div className="bg-slate-900 p-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black tracking-tight">{dieta.nombre_dieta}</h3>
              <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-1">
                Plan Nutricional Detallado • {dieta.calorias_objetivo} KCAL
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-2xl"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Cuerpo del Modal: Las 4 Comidas */}
        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dieta.comidas_dieta?.map((comida) => (
              <div key={comida.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <h4 className="text-blue-600 font-black text-xs uppercase tracking-[0.15em]">
                    {comida.momento_dia}
                  </h4>
                </div>
                
                <div className="space-y-3">
                  {comida.comida_alimentos?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-700">
                        {item.alimentos_catalogo?.nombre}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 bg-white px-2 py-1 rounded-lg shadow-sm">
                        {item.cantidad_g}g
                      </span>
                    </div>
                  ))}
                  {(!comida.comida_alimentos || comida.comida_alimentos.length === 0) && (
                    <p className="text-[10px] text-slate-300 italic font-bold uppercase tracking-widest">Sin alimentos</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-slate-100 text-right">
          <button 
            onClick={onClose}
            className="px-10 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 transition-all shadow-xl"
          >
            Cerrar Vista
          </button>
        </div>
      </div>
    </div>
  );
}