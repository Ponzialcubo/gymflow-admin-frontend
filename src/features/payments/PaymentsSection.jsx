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
          onExportPDF={() => generatePaymentsPDF(dataFiltrada, activeTab)} 
        />

        {/* --- SELECTOR DE PESTAÑAS (DISEÑO XL) --- */}
        <div className="flex bg-slate-100/80 p-2 rounded-[2rem] w-fit mb-10 border border-slate-200 shadow-inner">
          <button 
            onClick={() => setActiveTab('membresias')}
            className={`flex items-center gap-3 px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'membresias' 
                ? 'bg-white text-blue-600 shadow-xl scale-105' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            <span className="text-2xl">📋</span>
            Membresías
          </button>
          
          <button 
            onClick={() => setActiveTab('recibos')}
            className={`flex items-center gap-3 px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'recibos' 
                ? 'bg-white text-blue-600 shadow-xl scale-105' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
            }`}
          >
            <span className="text-2xl">💰</span>
            Historial Recibos
          </button>
        </div>
        
        {/* Tabla con la información filtrada */}
        <PaymentsTable 
          subscriptions={dataFiltrada} 
          activeTab={activeTab} // 
        />
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