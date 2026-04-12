export default function PaymentsHeader({ onOpenModal, onExportPDF }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12 bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100">

      {/* 1. ESTADO DEL SISTEMA (Monitor Dinámico) */}
      <div className="flex items-center gap-6 bg-white px-8 py-4 rounded-[2rem] shadow-sm border border-slate-100 w-full lg:w-auto">
        <div className="relative">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
            💳
          </div>
          {/* Punto de pulso "Live" */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-tighter">Pasarela de Pagos</h4>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* 2. ACCIONES (Botones Pro) */}
      <div className="flex items-center gap-4 w-full lg:w-auto">
        
        {/* Exportar: Estilo "Glass" o Sutil */}
        <button 

          onClick={onExportPDF}
          className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-[1.5rem] font-black text-[13px] uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all active:scale-95"
        >
          <span className="text-xl">📄</span>
          Exportar Reporte
        </button>

        {/* Nueva Suscripción: El protagonista (Diseño XL con Sombra Pro) */}
        <button 
          onClick={onOpenModal}
          className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-[13px] uppercase tracking-[0.15em] shadow-2xl shadow-blue-400/40 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95"
        >
          <span className="text-2xl leading-none">+</span>
          Nueva Suscripción
        </button>

      </div>
    </div>
  );
}