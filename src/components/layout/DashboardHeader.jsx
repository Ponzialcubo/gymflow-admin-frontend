const DashboardHeader = ({ title, user }) => {
  return (
    // Reducimos mb-12 a mb-8 para ahorrar espacio vertical
    <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        {/* Bajamos de text-5xl a text-4xl para el título */}
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
          {title}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="h-1 w-1 rounded-full bg-blue-600"></span>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            {user?.rol === 'admin' ? 'Sede Central • Gestión Pro' : 'Panel de Instructor'}
          </p>
        </div>
      </div>

      <CapacityCounter />
    </header>
  );
};