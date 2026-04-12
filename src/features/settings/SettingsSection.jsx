import React, { useState } from 'react';
import ProfileSettings from './components/ProfileSettings';
import GymSettings from './components/GymSettings';
import SecuritySettings from './components/SecuritySettings';
import StaffSettings from './components/StaffSettings';

export default function SettingsSection() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('gymflow_settings_tab') || 'perfil';
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('gymflow_settings_tab', tab);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 py-10 animate-in fade-in duration-700">
      
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-20 items-start">
        
        {/* MENÚ LATERAL: Se mantiene flotando elegantemente a la izquierda */}
        <div className="flex flex-col gap-4 sticky top-10">
          <button 
            onClick={() => handleTabChange('perfil')}
            className={`w-full flex items-center gap-6 px-10 py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 ${
              activeTab === 'perfil' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/40 translate-x-4 scale-105' 
                : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100 hover:translate-x-2'
            }`}
          >
            <span className="text-3xl">🧑‍💼</span> Mi Perfil
          </button>

          <button 
            onClick={() => handleTabChange('centro')}
            className={`w-full flex items-center gap-6 px-10 py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 ${
              activeTab === 'centro' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/40 translate-x-4 scale-105' 
                : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100 hover:translate-x-2'
            }`}
          >
            <span className="text-3xl">🏢</span> Centro
          </button>

          <button 
            onClick={() => handleTabChange('equipo')}
            className={`w-full flex items-center gap-6 px-10 py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 ${
              activeTab === 'equipo' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/40 translate-x-4 scale-105' 
                : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100 hover:translate-x-2'
            }`}
          >
            <span className="text-3xl">🏅</span> Equipo
          </button>

          <button 
            onClick={() => handleTabChange('seguridad')}
            className={`w-full flex items-center gap-6 px-10 py-7 rounded-[2.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 ${
              activeTab === 'seguridad' 
                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/40 translate-x-4 scale-105' 
                : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100 hover:translate-x-2'
            }`}
          >
            <span className="text-3xl">🔒</span> Seguridad
          </button>
        </div>

        {/* ÁREA DE CONTENIDO: ¡Adiós caja blanca! Ahora es un espacio abierto y fluido */}
        <div className="min-h-[600px] py-4">
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
            {activeTab === 'perfil' && <ProfileSettings />}
            {activeTab === 'centro' && <GymSettings />}
            {activeTab === 'equipo' && <StaffSettings />} 
            {activeTab === 'seguridad' && <SecuritySettings />}
          </div>
        </div>

      </div>
    </div>
  );
}