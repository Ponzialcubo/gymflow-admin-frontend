import React from 'react';

export default function ClientProfileCard({ usuario, suscripcion }) {
  const avatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(usuario.nombre)}&fontWeight=700`;

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 text-center relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-50/50 to-white"></div>
      <img src={avatarUrl} alt={usuario.nombre} className="w-28 h-28 rounded-[2rem] mx-auto relative z-10 border-4 border-white shadow-xl mb-6 bg-white" />
      <h1 className="text-3xl font-black text-slate-900 relative z-10 tracking-tighter">{usuario.nombre}</h1>
      <p className="text-xs font-bold text-slate-400 mb-8 relative z-10 uppercase tracking-widest italic">{usuario.email}</p>
      
      <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-50 text-left relative z-10">
          <div className="p-4 bg-slate-50 rounded-2xl">
              <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Membresía</span>
              <p className={`text-xs font-black mt-1 uppercase ${suscripcion ? 'text-blue-600' : 'text-slate-400'}`}>
                {suscripcion ? suscripcion.tipo_plan : 'Sin Contrato'}
              </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl">
              <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Antigüedad</span>
              <p className="text-xs font-black text-slate-800 mt-1 uppercase">
                {new Date(usuario.fecha_registro).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
              </p>
          </div>
      </div>
    </div>
  );
}