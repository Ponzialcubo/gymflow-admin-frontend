import React, { useState } from 'react';
import { supabase } from '../../../config/supabase';

export default function AddEmployeeModal({ isOpen, onClose, onEmployeeAdded }) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'Entrenador'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 1. CREAR EL USUARIO EN SUPABASE AUTH (Para que pueda hacer Login)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        // Guardamos su nombre en los metadatos de Auth por si acaso
        options: { data: { nombre: formData.nombre, rol: formData.rol } }
      });

      if (authError) {
        // Si el correo ya existe, Supabase lanzará error aquí
        throw new Error(authError.message);
      }

      // 2. GUARDAR EN LA TABLA 'empleados' (Para mostrarlo en tu panel)
      // Usamos el ID generado por Auth para mantener la integridad relacional
      const { error: dbError } = await supabase
        .from('empleados')
        .insert([{
          id: authData.user.id, // Enlazamos la tabla con su cuenta Auth
          nombre: formData.nombre,
          email: formData.email,
          rol: formData.rol,
          estado: 'activo'
          // Nota: NUNCA guardes el 'password' en texto plano en la tabla pública. 
          // Supabase Auth ya lo gestiona de forma encriptada y segura.
        }]);

      if (dbError) throw dbError;
      
      alert("✅ Empleado registrado y cuenta de acceso creada correctamente.");
      
      // Limpiamos el formulario para el siguiente uso
      setFormData({ nombre: '', email: '', password: '', rol: 'Entrenador' });
      onEmployeeAdded(); 
      onClose(); 
      
    } catch (error) {
      alert("❌ Error al registrar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="bg-slate-50 p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Nuevo Empleado</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Credenciales para la App Móvil</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-black shadow-sm">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Nombre Completo</label>
              <input 
                type="text" required value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800"
                placeholder="Ej. Laura López"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Rol / Puesto</label>
              <select 
                value={formData.rol}
                onChange={(e) => setFormData({...formData, rol: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-700 cursor-pointer"
              >
                <option value="Entrenador">Entrenador Personal</option>
                <option value="Instructor">Instructor de Clases</option>
                <option value="Nutricionista">Nutricionista</option>
                <option value="Recepcion">Recepción</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Email (Acceso App)</label>
              <input 
                type="email" required value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800"
                placeholder="entrenador@gymflow.com"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 block">Contraseña Temporal</label>
              <input 
                type="text" required minLength="6" value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold transition-all text-slate-800"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <div className="pt-6 flex gap-4 justify-end border-t border-slate-50">
            <button type="button" onClick={onClose} className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95 disabled:opacity-50">
              {saving ? 'Creando cuenta...' : 'Crear Acceso'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}