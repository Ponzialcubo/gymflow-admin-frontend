import React, { useState } from 'react';
import ProfileSettings from './components/ProfileSettings';
import GymSettings from './components/GymSettings';
import SecuritySettings from './components/SecuritySettings';

export default function SettingsSection({ user }) {
  // Estado para controlar qué pestaña está activa
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    // Hemos eliminado el contenedor max-w-7xl para que ocupe todo el ancho disponible
    <div className="animate-in fade-in zoom-in duration-700 pb-20 w-full h-full">
      
      {/* ¡ADIÓS AL TÍTULO REDUNDANTE! 
        El DashboardHeader ya dice "Configuración"
      */}

      {/* Hemos cambiado las proporciones: 1 columna para el menú, 3 o 4 para el contenido dependiendo de la pantalla */}
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-10 mt-6">
        
        {/* MENÚ LATERAL DE AJUSTES (Ahora más ancho y espaciado) */}
        <div className="lg:col-span-2 xl:col-span-1 space-y-4">
          <button 
            onClick={() => setActiveTab('perfil')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'perfil' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="text-3xl">🧑‍💼</span> Mi Perfil
          </button>

          <button 
            onClick={() => setActiveTab('centro')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'centro' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="text-3xl">🏢</span> Centro Deportivo
          </button>

          <button 
            onClick={() => setActiveTab('seguridad')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'seguridad' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="text-3xl">🔒</span> Seguridad
          </button>
        </div>

        {/* ÁREA DE CONTENIDO (Ahora ocupa el resto del espacio y las tarjetas se expandirán) */}
        <div className="lg:col-span-3 xl:col-span-3">
          {activeTab === 'perfil' && <ProfileSettings user={user} />}
          {activeTab === 'centro' && <GymSettings />}
          {activeTab === 'seguridad' && <SecuritySettings />}
        </div>

      </div>
    </div>
  );
}