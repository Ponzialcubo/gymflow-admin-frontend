import { useNutrition } from './hooks/useNutrition';
import NutritionHeader from './components/NutritionHeader';
import NutritionForm from './components/NutritionForm';
import NutritionGuide from './components/NutritionGuide';
import RecentPlansFeed from './components/RecentPlansFeed';

export default function NutritionSection() {
  const {
    socios, form, setForm, recientes, mensaje, loading,
    kcalCalculadas, diferenciaKcal, handleSubmit
  } = useNutrition();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-20 animate-in fade-in duration-700">
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden">
        <NutritionHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <NutritionForm 
            socios={socios}
            form={form}
            setForm={setForm}
            loading={loading}
            handleSubmit={handleSubmit}
            kcalCalculadas={kcalCalculadas}
            diferenciaKcal={diferenciaKcal}
          />
          <NutritionGuide />
        </div>

        <RecentPlansFeed recientes={recientes} />
      </div>

      {mensaje.texto && (
        <div className={`fixed bottom-10 right-10 p-5 rounded-2xl shadow-2xl border font-black text-[10px] uppercase tracking-widest z-50 ${
          mensaje.tipo === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}