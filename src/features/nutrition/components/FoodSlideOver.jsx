import React, { useState } from 'react';

export default function FoodSlideOver({ isOpen, onClose, catalogoAlimentos, onAddFood }) {
  const [search, setSearch] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [cantidad, setCantidad] = useState(100);

  if (!isOpen) return null;

  const filtrados = catalogoAlimentos.filter(a => 
    a.nombre.toLowerCase().includes(search.toLowerCase()) || 
    (a.categoria && a.categoria.toLowerCase().includes(search.toLowerCase()))
  );

  const handleConfirm = () => {
    if (selectedFood && cantidad > 0) {
      onAddFood(selectedFood, Number(cantidad));
      setSelectedFood(null);
      setSearch('');
      setCantidad(100);
    }
  };

  return (
    <>
      {/* Fondo oscuro desenfocado */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />
      
      {/* Panel lateral */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Catálogo de Alimentos</h3>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Base de Datos GymFlow</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-700 shadow-sm">&times;</button>
        </div>

        {/* Buscador */}
        <div className="p-6 border-b border-slate-100">
          <input 
            type="text" 
            placeholder="Buscar pechuga, avena, arroz..." 
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Lista de Alimentos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {filtrados.length === 0 ? (
            <p className="text-center text-slate-400 text-xs font-bold py-10 uppercase tracking-widest">No hay resultados</p>
          ) : (
            filtrados.map(alimento => (
              <div 
                key={alimento.id}
                onClick={() => setSelectedFood(alimento)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedFood?.id === alimento.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200 bg-white'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-black text-slate-800">{alimento.nombre}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {alimento.calorias_100g} kcal / 100g • {alimento.categoria}
                    </p>
                  </div>
                  {alimento.medida_casera && (
                    <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-bold uppercase">{alimento.medida_casera}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer de Confirmación (Solo si hay seleccionado) */}
        {selectedFood && (
          <div className="p-6 border-t border-slate-100 bg-white animate-in slide-in-from-bottom-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Cantidad (Gramos)</label>
            <div className="flex gap-4">
              <input 
                type="number" 
                className="w-32 bg-slate-50 border border-slate-200 text-slate-800 px-4 py-4 rounded-2xl outline-none font-black text-center text-lg"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
              <button 
                onClick={handleConfirm}
                className="flex-1 bg-emerald-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all"
              >
                Añadir al Menú
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}