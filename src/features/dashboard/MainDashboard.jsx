import React, { useState } from 'react';
import { useDashboard } from './hooks/useDashboard';
import StatsGrid from './components/StatsGrid';
import ClassesSchedule from './components/ClassesSchedule';
import DashboardSidebar from './components/DashboardSidebar';
import QuickActions from './components/QuickActions';

import AddClientModal from '../clients/components/AddClientModal'; 
import AddSubscriptionModal from '../payments/components/AddSubscriptionModal';
import { usePayments } from '../payments/hooks/usePayments';

// Importamos los modales necesarios
import AddNoticeModal from './components/modals/NoticeModal'; 
import SupportModal from './components/modals/SupportModal';
import DocModal from './components/modals/DocModal';
import AvisosListModal from './components/modals/AvisosListModal'; 

export default function MainDashboard() {
  const { stats, clases, loading, fetchDashboardData} = useDashboard();
  
  // EXTRAEMOS LA LÓGICA DE PAGOS PARA QUE EL MODAL FUNCIONE AQUÍ
  const { users, newSub, setNewSub, handleAddSubscription } = usePayments();
  
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  // Estado para el modal de AÑADIR aviso (desde QuickActions)
  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false); 
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);
  // Estado para el nuevo modal panorámico que lista avisos (desde StatsGrid)
  const [isAvisosListModalOpen, setIsAvisosListModalOpen] = useState(false); 

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
        {/* Pasamos la prop para abrir el modal de lista */}
        <StatsGrid stats={stats} onOpenAvisosList={() => setIsAvisosListModalOpen(true)} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* COLUMNA IZQUIERDA/CENTRO (2/3 del espacio) */}
          <div className="lg:col-span-2 flex flex-col space-y-10">
            <QuickActions 
              onOpenNuevoSocio={() => setIsAddClientOpen(true)}
              onOpenPago={() => setIsPaymentOpen(true)}
              // Esta acción sigue abriendo el modal para AÑADIR un aviso nuevo
              onOpenAviso={() => setIsAddNoticeOpen(true)} 
            />
            <ClassesSchedule clases={clases} />
          </div>

          {/* COLUMNA DERECHA (1/3 del espacio) */}
          <div className="lg:col-span-1 flex flex-col space-y-10">
            <DashboardSidebar 
              stats={stats} 
              onOpenSupport={() => setIsSupportOpen(true)} 
              onOpenDoc={() => setIsDocOpen(true)}
            />
            {/* AQUÍ ESTABA EL WIDGET Y HA SIDO ELIMINADO PARA DESATURAR LA COLUMNA */}
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

      {isPaymentOpen && (
        <AddSubscriptionModal 
          isOpen={isPaymentOpen} 
          onClose={() => setIsPaymentOpen(false)} 
          users={users}
          newSub={newSub}
          setNewSub={setNewSub}
          onSubmit={async (e) => {
            await handleAddSubscription(e);
            setIsPaymentOpen(false);
            fetchDashboardData(); 
          }}
        />
      )}

      {isAddNoticeOpen && ( // Modal para AÑADIR aviso
        <AddNoticeModal 
          isOpen={isAddNoticeOpen} 
          onClose={() => setIsAddNoticeOpen(false)} 
          onNoticeAdded={() => {
            fetchDashboardData(); // Refresca las estadísticas
            // Standalone NoticesWidget logic is removed. New list modal fetches on mount.
          }} 
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

      {/* NUEVO: Modal panorámico que lista todos los avisos */}
      {isAvisosListModalOpen && (
          <AvisosListModal
            isOpen={isAvisosListModalOpen}
            onClose={() => setIsAvisosListModalOpen(false)}
          />
      )}
    </>
  );
}