import React, { useState } from 'react';
import ProfileSettings from './components/ProfileSettings';
import GymSettings from './components/GymSettings';
import SecuritySettings from './components/SecuritySettings';
import StaffSettings from './components/StaffSettings';

export default function SettingsSection() {
  // Recuperamos la pestaña activa del localStorage
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('gymflow_settings_tab') || 'perfil';
  });

  // Guardamos la pestaña cada vez que cambie
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('gymflow_settings_tab', tab);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20 animate-in fade-in duration-700">
      
      {/* CUADRÍCULA PRINCIPAL
          Hemos eliminado el header duplicado para que respete el Header Global de la app.
          El mt-4 le da un pequeño respiro respecto al título de arriba.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-10 mt-4">
        
        {/* MENÚ LATERAL */}
        <div className="lg:col-span-2 xl:col-span-1 space-y-4">
          <button 
            onClick={() => handleTabChange('perfil')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'perfil' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-105' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:scale-105'
            }`}
          >
            <span className="text-3xl">🧑‍💼</span> Mi Perfil
          </button>

          <button 
            onClick={() => handleTabChange('centro')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'centro' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-105' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:scale-105'
            }`}
          >
            <span className="text-3xl">🏢</span> Centro
          </button>

          <button 
            onClick={() => handleTabChange('equipo')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'equipo' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-105' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:scale-105'
            }`}
          >
            <span className="text-3xl">🏅</span> Equipo
          </button>

          <button 
            onClick={() => handleTabChange('seguridad')}
            className={`w-full flex items-center gap-6 px-8 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'seguridad' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-105' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:scale-105'
            }`}
          >
            <span className="text-3xl">🔒</span> Seguridad
          </button>
        </div>

        {/* ÁREA DE CONTENIDO */}
        <div className="lg:col-span-3 xl:col-span-3 relative">
          {activeTab === 'perfil' && <ProfileSettings />}
          {activeTab === 'centro' && <GymSettings />}
          {activeTab === 'equipo' && <StaffSettings />} 
          {activeTab === 'seguridad' && <SecuritySettings />}
        </div>

      </div>
    </div>
  );
}