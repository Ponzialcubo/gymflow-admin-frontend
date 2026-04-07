import { useState } from 'react';
import { supabase } from '../config/supabase'; // Conectamos nuestro motor

// Recibimos 'onLogin' que viene desde App.jsx
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. EL CAMBIO CLAVE: Autenticación real de Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) throw authError;

      // 2. Una vez logueados, traemos los datos de nuestra tabla 'public.usuarios'
      // Usamos el ID que nos ha dado el sistema de Auth
      const { data: profile, error: profileError } = await supabase
        .from('usuarios')
        .select('id, nombre, email, rol')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('Perfil no encontrado en la base de datos');
      }

      // 3. Verificamos si es administrador (para el panel de React)
      if (profile.rol !== 'admin') {
        // Si no es admin, cerramos sesión inmediatamente por seguridad
        await supabase.auth.signOut();
        throw new Error('Acceso restringido: Se requiere rol de administrador');
      }

      // Si todo es correcto, enviamos los datos a App.jsx
      onLogin(profile); 
      
    } catch (err) {
      // Traducimos errores comunes para el usuario
      const message = err.message === 'Invalid login credentials' 
        ? 'Email o contraseña incorrectos' 
        : err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20">
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent tracking-tighter mb-2">
                GymFlow Pro
              </h1>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Acceso Instructor</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                  placeholder="admin@gymflow.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Contraseña</label>
                <input 
                  type="password" 
                  required
                  className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-slate-700 shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 animate-shake">
                    ⚠️ {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-widest text-xs"
              >
                {loading ? 'Validando...' : 'Entrar al Panel'}
              </button>
            </form>
          </div>

          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
              "Gestión de alto rendimiento"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}