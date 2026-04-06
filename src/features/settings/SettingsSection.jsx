import React, { useState } from 'react';
import ProfileSettings from './components/ProfileSettings';
import GymSettings from './components/GymSettings';
import SecuritySettings from './components/SecuritySettings';

export default function SettingsSection({ user }) {
  // Estado para controlar qué pestaña está activa
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    <div className="animate-in fade-in zoom-in duration-700 pb-20 max-w-7xl mx-auto">
      
      {/* Título de la sección (opcional si ya lo tienes en tu Header global) */}
      <div className="mb-10">
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter">Configuración</h2>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
          Gestiona las preferencias de tu cuenta y el centro deportivo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* MENÚ LATERAL DE AJUSTES (1 Columna) */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('perfil')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'perfil' 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200/50' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="text-xl">👤</span> Mi Perfil
          </button>

          <button 
            onClick={() => setActiveTab('centro')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'centro' 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200/50' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="text-xl">🏢</span> Centro Deportivo
          </button>

          <button 
            onClick={() => setActiveTab('seguridad')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === 'seguridad' 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200/50' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="text-xl">🔒</span> Seguridad
          </button>
        </div>

        {/* ÁREA DE CONTENIDO (3 Columnas) */}
        <div className="lg:col-span-3">
          {activeTab === 'perfil' && <ProfileSettings user={user} />}
          {activeTab === 'centro' && <GymSettings />}
          {activeTab === 'seguridad' && <SecuritySettings />}
        </div>

      </div>
    </div>
  );
}