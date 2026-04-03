import { useState } from 'react';
import { useSettings } from './hooks/useSettings';
import ProfileSettings from './components/ProfileSettings';
import GymSettings from './components/GymSettings';
import SecuritySettings from './components/SecuritySettings';

export default function SettingsSection() {
  const [activeTab, setActiveTab] = useState('profile');
  const { settings, setSettings, mensaje, handleUpdateProfile } = useSettings();

  const tabs = [
    { id: 'profile', label: 'Mi Perfil', icon: '👤' },
    { id: 'gym', label: 'Centro Deportivo', icon: '🏠' },
    { id: 'security', label: 'Seguridad', icon: '🔐' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR DE AJUSTES */}
        <div className="w-full lg:w-72 space-y-2">
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter mb-8 ml-4">Ajustes</h2>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                : 'bg-white text-slate-400 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-1">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 p-10 md:p-14 relative overflow-hidden">
            {activeTab === 'profile' && <ProfileSettings onUpdate={handleUpdateProfile} />}
            {activeTab === 'gym' && <GymSettings settings={settings} setSettings={setSettings} />}
            {activeTab === 'security' && <SecuritySettings />}
            
            {mensaje.texto && (
              <div className={`mt-8 p-4 rounded-2xl text-center font-black text-[10px] uppercase tracking-widest border ${
                mensaje.tipo === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
              }`}>
                {mensaje.texto}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}