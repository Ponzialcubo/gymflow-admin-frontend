import React from 'react';

export default function ClientEditModal({ isOpen, onClose, onSubmit, editData, setEditData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-2xl font-black text-slate-800 mb-2 tracking-tighter">Editar Datos</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">Información de contacto</p>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Nombre Completo</label>
            <input required type="text" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500" value={editData.nombre} onChange={(e) => setEditData({...editData, nombre: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Email</label>
            <input required type="email" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} />
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest">Cerrar</button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}