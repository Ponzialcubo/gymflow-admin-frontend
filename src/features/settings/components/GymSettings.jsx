import React, { useState, useEffect } from 'react';
import { supabase } from '../../../config/supabase';

export default function GymSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Estado que contendrá todos los valores de la base de datos
  const [settings, setSettings] = useState({
    aforo_maximo: 100,
    precio_basic: 19.99,
    precio_estandar: 29.99,
    precio_pro: 49.99,
    notificaciones_push: true,
    modo_mantenimiento: false
  });

  // 1. Cargar la configuración al entrar
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('gym_settings')
          .select('*')
          .eq('id', 1)
          .single();

        if (error) throw error;
        if (data) setSettings(data);
      } catch (err) {
        console.error("Error cargando ajustes:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 2. Guardar los cambios en Supabase
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('gym_settings')
        .update({
          aforo_maximo: settings.aforo_maximo,
          precio_basic: settings.precio_basic,
          precio_estandar: settings.precio_estandar,
          precio_pro: settings.precio_pro,
          notificaciones_push: settings.notificaciones_push,
          modo_mantenimiento: settings.modo_mantenimiento,
          updated_at: new Date()
        })
        .eq('id', 1);

      if (error) throw error;
      alert("Configuración del centro guardada con éxito.");
    } catch (err) {
      alert("Error al guardar: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings({ ...settings, [e.target.name]: value });
  };

  if (loading) {
    return <div className="p-20 text-center animate-pulse font-black text-slate-300 uppercase tracking-widest">Cargando parámetros...</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* TARJETA 1: PLAN DE NEGOCIO (Actualizado con los 3 planes) */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-10 border-b border-slate-100 pb-8">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Estructura del Negocio</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Aforo y precios de las membresías</p>
        </div>

        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Aforo Máximo</label>
              <div className="relative">
                <input 
                  type="number" name="aforo_maximo"
                  value={settings.aforo_maximo} onChange={handleChange}
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xl outline-none focus:border-slate-800 transition-all text-slate-700" 
                />
                <span className="absolute right-5 top-5 font-bold text-slate-400">pers.</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Plan Basic</label>
              <div className="relative">
                <input 
                  type="number" step="0.01" name="precio_basic"
                  value={settings.precio_basic} onChange={handleChange}
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-black text-xl outline-none focus:border-blue-500 transition-all text-slate-700" 
                />
                <span className="absolute right-5 top-5 font-black text-slate-400">€</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 block">Plan Estándar</label>
              <div className="relative">
                <input 
                  type="number" step="0.01" name="precio_estandar"
                  value={settings.precio_estandar} onChange={handleChange}
                  className="w-full p-5 bg-blue-50/50 border-2 border-blue-100 rounded-2xl font-black text-xl outline-none focus:border-blue-500 transition-all text-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                />
                <span className="absolute right-5 top-5 font-black text-blue-600">€</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-amber-600 uppercase tracking-widest ml-1 block">Plan Pro</label>
              <div className="relative">
                <input 
                  type="number" step="0.01" name="precio_pro"
                  value={settings.precio_pro} onChange={handleChange}
                  className="w-full p-5 bg-amber-50/30 border-2 border-amber-100 rounded-2xl font-black text-xl outline-none focus:border-amber-500 transition-all text-amber-700" 
                />
                <span className="absolute right-5 top-5 font-black text-amber-600">€</span>
              </div>
            </div>

          </div>
        </form>
      </div>

      {/* TARJETA 2: HORARIOS (Se mantienen igual de diseño) */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-10 border-b border-slate-100 pb-8">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Horario Operativo</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Apertura y cierre del centro</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Lunes a Viernes', 'Sábados', 'Domingos'].map((dia) => (
            <div key={dia} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{dia}</p>
              <div className="flex items-center gap-3">
                <input type="time" defaultValue={dia === 'Domingos' ? '09:00' : '07:00'} className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-slate-700 outline-none text-sm" />
                <span className="text-slate-300 font-bold">-</span>
                <input type="time" defaultValue={dia === 'Domingos' ? '14:00' : '23:00'} className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-slate-700 outline-none text-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TARJETA 3: SISTEMA Y APP (Conectados a Supabase) */}
      <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100">
        <div className="mb-10 border-b border-slate-100 pb-8">
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">Sistema y App Móvil</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Automatizaciones y experiencia del socio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between cursor-pointer hover:border-blue-200 transition-all">
            <div>
              <p className="text-lg font-black text-slate-700">Notificaciones Push</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Avisos automáticos a socios</p>
            </div>
            <div className="relative">
              <input type="checkbox" name="notificaciones_push" checked={settings.notificaciones_push} onChange={handleChange} className="sr-only peer" />
              <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </div>
          </label>

          <label className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between cursor-pointer hover:border-red-200 transition-all group">
            <div>
              <p className="text-lg font-black text-slate-700 group-hover:text-red-600 transition-colors">Modo Mantenimiento</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Bloquear acceso a la App cliente</p>
            </div>
            <div className="relative">
              <input type="checkbox" name="modo_mantenimiento" checked={settings.modo_mantenimiento} onChange={handleChange} className="sr-only peer" />
              <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
            </div>
          </label>
        </div>

        {/* BOTÓN GUARDAR GENERAL */}
        <div className="pt-10 flex justify-end">
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Ajustes'}
          </button>
        </div>
      </div>

    </div>
  );
}