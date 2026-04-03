import { usePayments } from './hooks/usePayments';
import PaymentsHeader from './components/PaymentsHeader';
import PaymentsTable from './components/PaymentsTable';
import AddSubscriptionModal from './components/AddSubscriptionModal';

export default function PaymentsSection() {
  const { 
    subscriptions, users, loading, isModalOpen, setIsModalOpen, 
    newSub, setNewSub, handleAddSubscription 
  } = usePayments();

  if (loading) return (
    <div className="p-20 text-center font-black text-slate-400 animate-pulse uppercase tracking-widest">
      Consultando pasarela de pagos...
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
        
        <PaymentsHeader onOpenModal={() => setIsModalOpen(true)} />
        
        <PaymentsTable subscriptions={subscriptions} />

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