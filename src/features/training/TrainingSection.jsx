import { useTraining } from './hooks/useTraining';
import TrainingHeader from './components/TrainingHeader';
import TrainingForm from './components/TrainingForm';
import RecentActionsFeed from './components/RecentActionsFeed';

export default function TrainingSection() {
  const {
    socios, ejercicios, recientes, mensaje, loading,
    diasSeleccionados, diasSemana, form, setForm,
    toggleDia, handleSubmit
  } = useTraining();

  return (
    // UNIFICADO: space-y-8, duration-700 y ancho completo (w-full)
    <div className="w-full pb-20 animate-in fade-in duration-700 space-y-8">
      
      {/* A diferencia del anterior, sacamos el Header del recuadro blanco 
          para que respire como en la sección de Calendario y Pagos 
      */}
      <TrainingHeader />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* FORMULARIO PRINCIPAL (Ocupa 2 de 3 columnas en pantallas XL) */}
        <div className="xl:col-span-2 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 transition-all">
          <TrainingForm 
            socios={socios}
            ejercicios={ejercicios}
            form={form}
            setForm={setForm}
            diasSemana={diasSemana}
            diasSeleccionados={diasSeleccionados}
            toggleDia={toggleDia}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>

        {/* FEED DE ACCIONES (Ocupa 1 de 3 columnas) */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 h-full">
          <RecentActionsFeed recientes={recientes} />
        </div>
      </div>

      {/* MENSAJE DE ESTADO (TOAST) REDISEÑADO */}
      {mensaje.texto && (
        <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 px-10 py-5 rounded-[2rem] shadow-2xl font-black text-xs uppercase tracking-widest z-[200] animate-in slide-in-from-bottom-6 duration-500 flex items-center gap-3 ${
          mensaje.tipo === 'success' 
          ? 'bg-slate-900 text-green-400 border-2 border-green-400/20' 
          : 'bg-red-600 text-white shadow-red-200'
        }`}>
          <span>{mensaje.tipo === 'success' ? '✅' : '⚠️'}</span>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}