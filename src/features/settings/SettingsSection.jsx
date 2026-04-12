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
    // Aumentamos el padding lateral y el ancho máximo para dar aire
    <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 py-10 animate-in fade-in duration-700">
      
      {/* TÍTULO DE LA SECCIÓN (Para llenar la parte superior) */}
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Configuración del Sistema</h2>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">
          Gestiona tu identidad, los parámetros del centro y la seguridad
        </p>
      </div>

      {/* CAMBIO CLAVE: 
        En lugar de usar col-spans variables, fijamos el sidebar a 320px 
        y dejamos que el contenido ocupe todo el espacio restante (1fr)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16 items-start">
        
        {/* MENÚ LATERAL (Sidebar) */}
        <div className="flex flex-col gap-4">
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

        {/* ÁREA DE CONTENIDO (Ahora mucho más amplia) */}
        <div className="bg-white rounded-[4rem] p-12 lg:p-20 shadow-xl shadow-slate-200/30 border border-slate-100 min-h-[600px] relative">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
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