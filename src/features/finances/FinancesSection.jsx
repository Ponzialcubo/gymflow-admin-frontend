import React, { useState } from 'react';
import { useFinances } from './hooks/useFinances'; 
import FinanceKPIs from './components/FinanceKPIs';
import FinanceChart from './components/FinanceChart';
import FinanceTable from './components/FinanceTable';
import AddExpenseModal from './components/AddExpenseModal';
import { exportToCSV, exportToPDF } from './utils/exportFinances';

export default function FinancesSection() {
  const { movimientos, stats, datosGrafico, loading, refresh } = useFinances();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return (
    <div className="w-full pt-40 text-center animate-pulse">
      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Sincronizando Libro Mayor...</p>
    </div>
  );

  return (
    // CAMBIO: max-w-[1600px] para que no se vea estrecho en monitores grandes
    <div className="w-full max-w-[1600px] mx-auto px-8 pb-20 animate-in fade-in duration-700">
      
      {/* SUB-HEADER MÁS AMPLIO */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 mt-6 border-b border-slate-200/60 pb-8 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Resumen Operativo</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Control de ingresos, gastos y rentabilidad</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-3 active:scale-95"
        >
          <span className="text-xl">+</span> Registrar Movimiento
        </button>
      </div>

      <div className="space-y-10">
        {/* KPI CARDS */}
        <FinanceKPIs stats={stats} />

        {/* CHART: Ahora con más espacio horizontal */}
        <div className="bg-white p-10 lg:p-14 rounded-[4rem] border border-slate-100 shadow-xl shadow-slate-200/20">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Flujo de Caja</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Evolución mensual comparativa</p>
          </div>
          <FinanceChart data={datosGrafico} />
        </div>

        {/* TABLE: Textos más grandes y botones de exportación operativos */}
        <div className="bg-white rounded-[4rem] shadow-xl shadow-slate-200/20 border border-slate-100 overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center bg-slate-50/50 gap-6">
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Registro General</h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Historial completo de transacciones</p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => exportToCSV(movimientos)}
                className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
              >
                <span>📊</span> Excel
              </button>
              
              <button 
                onClick={() => exportToPDF(movimientos, stats)}
                className="px-8 py-4 bg-red-50 text-red-600 border-2 border-red-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
              >
                <span>📄</span> Exportar PDF
              </button>
            </div>
          </div>
          <FinanceTable movimientos={movimientos} />
        </div>
      </div>

      <AddExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={refresh} 
      />
    </div>
  );
}