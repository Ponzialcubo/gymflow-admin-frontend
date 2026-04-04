import React, { useState } from 'react';
import { useDashboard } from './hooks/useDashboard';
import StatsGrid from './components/StatsGrid';
import ClassesSchedule from './components/ClassesSchedule';
import DashboardSidebar from './components/DashboardSidebar';
import QuickActions from './components/QuickActions';

import AddClientModal from '../clients/components/AddClientModal'; 
// 1. IMPORTAMOS EL MODAL CORRECTO Y SU HOOK
import AddSubscriptionModal from '../payments/components/AddSubscriptionModal';
import { usePayments } from '../payments/hooks/usePayments';

import NoticeModal from './components/modals/NoticeModal'; 
import SupportModal from './components/modals/SupportModal';
import DocModal from './components/modals/DocModal';

export default function MainDashboard() {
  const { stats, clases, loading, fetchDashboardData} = useDashboard();
  
  // 2. EXTRAEMOS LA LÓGICA DE PAGOS PARA QUE EL MODAL FUNCIONE AQUÍ
  const { users, newSub, setNewSub, handleAddSubscription } = usePayments();
  
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
      
      {isAddClientOpen && (
        <AddClientModal 
          isOpen={isAddClientOpen} 
          onClose={() => setIsAddClientOpen(false)} 
          onClientAdded={fetchDashboardData} 
        />
      )}

      {/* 3. SUSTITUIMOS EL MODAL ANTIGUO POR EL NUEVO */}
      {isPaymentOpen && (
        <AddSubscriptionModal 
          isOpen={isPaymentOpen} 
          onClose={() => setIsPaymentOpen(false)} 
          users={users}
          newSub={newSub}
          setNewSub={setNewSub}
          onSubmit={async (e) => {
            // Ejecutamos la función de Supabase y luego recargamos el Dashboard
            await handleAddSubscription(e);
            setIsPaymentOpen(false);
            fetchDashboardData(); 
          }}
        />
      )}

      {isNoticeOpen && (
        <NoticeModal 
          isOpen={isNoticeOpen} 
          onClose={() => setIsNoticeOpen(false)} 
          onNoticeAdded={fetchDashboardData} 
        />
      )}

      {isSupportOpen && (
        <SupportModal 
          isOpen={isSupportOpen} 
          onClose={() => setIsSupportOpen(false)} 
        />
      )}

      <DocModal 
        isOpen={isDocOpen} 
        onClose={() => setIsDocOpen(false)} 
      />
    </>
  );
}