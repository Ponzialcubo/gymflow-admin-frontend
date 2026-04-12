import React, { useState, useMemo } from 'react'; // <--- EL ERROR ESTABA AQUÍ (Faltaba useState y useMemo)
import { usePayments } from './hooks/usePayments';
import PaymentsHeader from './components/PaymentsHeader';
import PaymentsTable from './components/PaymentsTable';
import AddSubscriptionModal from './components/AddSubscriptionModal';
import { generatePaymentsPDF } from './utils/pdfExport'; 

export default function PaymentsSection() {
  const { 
    subscriptions, users, loading, isModalOpen, setIsModalOpen, 
    newSub, setNewSub, handleAddSubscription 
  } = usePayments();

  // Estado para controlar qué pestaña vemos
  const [activeTab, setActiveTab] = useState('membresias'); 

  // --- FILTRADO INTELIGENTE DE DATOS ---
  const dataFiltrada = useMemo(() => {
    if (!subscriptions) return [];
    
    if (activeTab === 'membresias') {
      // Solo mostramos los contratos (Activos o Cancelados)
      return subscriptions.filter(s => s.estado === 'activo' || s.estado === 'cancelado');
    } else {
      // Solo mostramos el rastro del dinero (Recibos)
      return subscriptions.filter(s => s.estado === 'recibo_generado' || s.estado === 'recibo');
    }
  }, [subscriptions, activeTab]);

  if (loading) return (
    <div className="p-20 text-center font-black text-slate-400 animate-pulse uppercase tracking-widest">
      Consultando pasarela de pagos...
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
        
        {/* Header con funciones de exportar y abrir modal */}
        <PaymentsHeader 
          onOpenModal={() => setIsModalOpen(true)} 
          onExportPDF={() => generatePaymentsPDF(subscriptions)} 
        />

        {/* --- SELECTOR DE PESTAÑAS (UI) --- */}
        <div className="flex gap-4 mb-8 bg-slate-50 p-2 rounded-2xl w-fit ml-2">
          <button 
            onClick={() => setActiveTab('membresias')}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'membresias' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            📋 Membresías
          </button>
          <button 
            onClick={() => setActiveTab('recibos')}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'recibos' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            💰 Historial Recibos
          </button>
        </div>
        
        {/* Tabla con la información filtrada */}
        <PaymentsTable subscriptions={dataFiltrada} />

      </div>

      <AddSubscriptionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={users}
        newSub={newSub}
        setNewSub={setNewSub}
        onSubmit={handleAddSubscription}
      />
    </div>
  );
}