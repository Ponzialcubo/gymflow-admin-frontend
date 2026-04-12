import React from 'react';
import { usePayments } from './hooks/usePayments';
import PaymentsHeader from './components/PaymentsHeader';
import PaymentsTable from './components/PaymentsTable';
import AddSubscriptionModal from './components/AddSubscriptionModal';

// 1. IMPORTAMOS TU NUEVA HERRAMIENTA CREADA EN EL PASO 1
import { generatePaymentsPDF } from './utils/pdfExport'; 

export default function PaymentsSection() {
  const { subscriptions, loading, ...props } = usePayments();
  const [activeTab, setActiveTab] = useState('membresias'); // 'membresias' o 'recibos'

  // --- FILTRADO INTELIGENTE ---
  const dataFiltrada = useMemo(() => {
    if (activeTab === 'membresias') {
      // Solo lo que da o quita acceso
      return subscriptions.filter(s => s.estado === 'activo' || s.estado === 'cancelado');
    } else {
      // Solo el rastro del dinero
      return subscriptions.filter(s => s.estado === 'recibo_generado' || s.estado === 'recibo');
    }
  }, [subscriptions, activeTab]);

  if (loading) return <div className="p-20 text-center animate-pulse">Consultando...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-100">
        
        <PaymentsHeader {...props} />

        {/* --- SELECTOR DE PESTAÑAS --- */}
        <div className="flex gap-4 mb-8 bg-slate-50 p-2 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('membresias')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'membresias' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            📋 Membresías
          </button>
          <button 
            onClick={() => setActiveTab('recibos')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'recibos' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            💰 Historial Recibos
          </button>
        </div>

        {/* Pasamos solo la data filtrada a la tabla */}
        <PaymentsTable subscriptions={dataFiltrada} isReciboView={activeTab === 'recibos'} />

      </div>
      {/* ... modal ... */}
    </div>
  );
}