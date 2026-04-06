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
    <div className="w-full pb-20 animate-in fade-in duration-700">
      {/* LA GRAN TARJETA ÚNICA */}
      <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        
        <TrainingHeader />

        <div className="p-8 md:p-14">
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

        <RecentActionsFeed recientes={recientes} />
      </div>

      {/* TOAST DE MENSAJE */}
      {mensaje.texto && (
        <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 px-10 py-5 rounded-[2rem] shadow-2xl font-black text-sm uppercase tracking-widest z-[200] animate-in slide-in-from-bottom-6 duration-500 flex items-center gap-3 ${
          mensaje.tipo === 'success' ? 'bg-slate-900 text-green-400 border-2 border-green-400/20' : 'bg-red-600 text-white'
        }`}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}