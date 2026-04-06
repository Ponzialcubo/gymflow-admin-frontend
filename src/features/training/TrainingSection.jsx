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
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 animate-in fade-in duration-700">
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden">
        
        <TrainingHeader />

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

        <RecentActionsFeed recientes={recientes} />
      </div>

      {mensaje.texto && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 rounded-2xl shadow-2xl font-black text-[10px] uppercase tracking-widest z-50 animate-in slide-in-from-bottom-4 ${
          mensaje.tipo === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}