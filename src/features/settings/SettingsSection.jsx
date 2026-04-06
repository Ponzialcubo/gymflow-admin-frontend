import React, { useState } from 'react';
import ProfileSettings from './components/ProfileSettings';
import GymSettings from './components/GymSettings';
import SecuritySettings from './components/SecuritySettings';
import StaffSettings from './components/StaffSettings';

export default function SettingsSection({ user }) {
  // Recuperamos la pestaña activa del localStorage (gracias a la lógica que pusimos antes)
  // o usamos 'perfil' por defecto.
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('gymflow_settings_tab') || 'perfil';
  });

  // Guardamos la pestaña cada vez que cambie para que al refrescar no se mueva
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('gymflow_settings_tab', tab);
  };

  return (
    // UNIFICADO: Solo fade-in y duration-700 para consistencia total
    <div className="animate-in fade-in duration-700 pb-20 w-full h-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-10 mt-6">
        
        {/* MENÚ LATERAL */}
        <div className="lg:col-span-2 xl:col-span-1 space-y-4">
          <button 
            onClick={() => handleTabChange('perfil')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'perfil' ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            <span className="text-3xl">🧑‍💼</span> Mi Perfil
          </button>

          <button 
            onClick={() => handleTabChange('centro')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'centro' ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            <span className="text-3xl">🏢</span> Centro
          </button>

          <button 
            onClick={() => handleTabChange('equipo')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'equipo' ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            <span className="text-3xl">🏅</span> Equipo
          </button>

          <button 
            onClick={() => handleTabChange('seguridad')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'seguridad' ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            <span className="text-3xl">🔒</span> Seguridad
          </button>
        </div>

        {/* ÁREA DE CONTENIDO */}
        <div className="lg:col-span-3 xl:col-span-3">
          {/* IMPORTANTE: Ahora ProfileSettings recibe el usuario correctamente */}
          {activeTab === 'perfil' && <ProfileSettings user={user} />}
          
          {activeTab === 'centro' && <GymSettings />}
          {activeTab === 'equipo' && <StaffSettings />} 
          {activeTab === 'seguridad' && <SecuritySettings />}
        </div>

      </div>
    </div>
  );
}