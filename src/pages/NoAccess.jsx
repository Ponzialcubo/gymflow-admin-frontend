export default function NoAccess() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
      <span className="text-8xl mb-8">🔐</span>
      <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">Área Privada</h1>
      <p className="text-slate-400 max-w-md font-bold">
        Este panel es de uso exclusivo para la administración central. 
        Si eres empleado o socio, utiliza la aplicación móvil oficial de GymFlow.
      </p>
      <button 
        onClick={() => window.location.href = '/'}
        className="mt-10 px-8 py-4 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all"
      >
        Volver al Login
      </button>
    </div>
  );
}