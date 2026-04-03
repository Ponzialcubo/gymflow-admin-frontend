import React, { useState } from 'react'; // <-- AÑADIMOS useState
import { useDashboard } from './hooks/useDashboard';
import StatsGrid from './components/StatsGrid';
import ClassesSchedule from './components/ClassesSchedule';
import DashboardSidebar from './components/DashboardSidebar';
import QuickActions from './components/QuickActions';

// IMPORTAMOS EL MODAL BASÁNDONOS EN TU ÁRBOL DE CARPETAS
import AddClientModal from '../clients/components/AddClientModal'; 
import PaymentModal from '../payments/components/modals/PaymentModal';
import NoticeModal from './components/modals/NoticeModal'; 
import SupportModal from './components/modals/SupportModal';
import DocModal from './components/modals/DocModal';

export default function MainDashboard() {
  const { stats, clases, loading, fetchDashboardData} = useDashboard();
  
  // ESTADOS PARA CONTROLAR LOS MODALES
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);

  if (loading) return (
    <div className="p-20 flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="font-black text-slate-400 animate-pulse uppercase tracking-widest text-[10px]">
        Sincronizando Central de Datos...
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-10 animate-in fade-in zoom-in duration-700 pb-20">
        <StatsGrid stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 flex flex-col">
            {/* PASAMOS LAS FUNCIONES AL COMPONENTE QUICKACTIONS */}
            <QuickActions 
              onOpenNuevoSocio={() => setIsAddClientOpen(true)}
              onOpenPago={() => setIsPaymentOpen(true)}
              onOpenAviso={() => setIsNoticeOpen(true)}
            />
            <ClassesSchedule clases={clases} />
          </div>

          <div className="lg:col-span-1">
           <DashboardSidebar 
            stats={stats} 
            onOpenSupport={() => setIsSupportOpen(true)} 
            onOpenDoc={() => setIsDocOpen(true)}
          />
          </div>
          
        </div>
      </div>

      {/* RENDERIZADO CONDICIONAL DE MODALES */}
      
      {/* 1. Modal de Nuevo Socio */}
      {isAddClientOpen && (
        <AddClientModal 
          isOpen={isAddClientOpen} 
          onClose={() => setIsAddClientOpen(false)} 
          onClientAdded={fetchDashboardData} 
        />
      )}

      {/* 2. Modal de Pagos */}
      {isPaymentOpen && (
        <PaymentModal 
          isOpen={isPaymentOpen} 
          onClose={() => setIsPaymentOpen(false)} 
          onPaymentAdded={fetchDashboardData} 
        />
      )}

      {/* 3. Modal de Avisos */}
      {isNoticeOpen && (
        <NoticeModal 
          isOpen={isNoticeOpen} 
          onClose={() => setIsNoticeOpen(false)} 
          onNoticeAdded={fetchDashboardData} 
        />
      )}

      {/* 4. Modal de Soporte */}
      {isSupportOpen && (
        <SupportModal 
          isOpen={isSupportOpen} 
          onClose={() => setIsSupportOpen(false)} 
        />
      )}

      {/* 5. Modal de Documentacion */}
      <DocModal 
        isOpen={isDocOpen} 
        onClose={() => setIsDocOpen(false)} 
      />
    </>
  );
}