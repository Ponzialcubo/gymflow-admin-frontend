import React, { useState } from 'react';
import ProfileSettings from './components/ProfileSettings';
import GymSettings from './components/GymSettings';
import SecuritySettings from './components/SecuritySettings';
import StaffSettings from './components/StaffSettings';

export default function SettingsSection() {
  // 1. Recuperamos la pestaña activa del localStorage
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('gymflow_settings_tab') || 'perfil';
  });

  // 2. Guardamos la pestaña cada vez que cambie
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('gymflow_settings_tab', tab);
  };

  // Valores simulados para el widget de ocupación (puedes conectarlos a tu base de datos luego)
  const currentOccupancy = 16;
  const maxCapacity = 100;
  const percentage = (currentOccupancy / maxCapacity) * 100;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-20 animate-in fade-in duration-700">
      
      {/* HEADER PRINCIPAL (Igual al de las capturas) */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tighter">Configuración</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
            Sede Central • Gestión Pro
          </p>
        </div>

        {/* WIDGET OCUPACIÓN LIVE (Diseño Dark Pro) */}
        <div className="hidden md:flex items-center gap-6 bg-slate-900 px-8 py-4 rounded-[2rem] shadow-2xl shadow-slate-900/20 border border-slate-800">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl relative">
            👥
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-slate-900"></span>
            </span>
          </div>
          <div className="flex flex-col min-w-[100px]">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.2em]">Ocupación</span>
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Live {Math.round(percentage)}%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-3xl font-black tracking-tighter">{currentOccupancy}</span>
              <span className="text-slate-500 text-sm font-bold">/ {maxCapacity}</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-10">
        
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
          {/* Al quitar el prop 'user', dejamos que ProfileSettings use el hook internamente */}
          {activeTab === 'perfil' && <ProfileSettings />}
          {activeTab === 'centro' && <GymSettings />}
          {activeTab === 'equipo' && <StaffSettings />} 
          {activeTab === 'seguridad' && <SecuritySettings />}
        </div>

      </div>
    </div>
  );
}