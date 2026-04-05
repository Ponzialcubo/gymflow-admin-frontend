import React from 'react'; // <--- Importante añadir esto siempre
import { useFinances } from './hooks/useFinances'; 
import FinanceHeader from './components/FinanceHeader'; 
import FinanceTable from './components/FinanceTable';
import FinanceFooter from './components/FinanceFooter';

export default function FinancesSection() {
  const { subscriptions, stats, loading, refresh } = useFinances();

  if (loading) return (
    <div className="p-20 text-center font-black text-slate-400 animate-pulse uppercase tracking-[0.2em]">
      Generando reporte financiero...
    </div>
  );

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-0">
      <FinanceHeader stats={stats} />
      <FinanceTable subscriptions={subscriptions} onRefresh={refresh} />
      <FinanceFooter total={stats.total} />
    </div>
  );
}