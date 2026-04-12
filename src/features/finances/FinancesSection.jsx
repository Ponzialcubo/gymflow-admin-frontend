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

  if (loading) {
    return (
      <div className="w-full pt-32 text-center animate-pulse">
        <span className="text-5xl block mb-4 grayscale opacity-20">💰</span>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sincronizando Libro Mayor...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 pb-20 animate-in fade-in duration-700">
      
      {/* SUB-HEADER: Arregla el espacio visual y encuadra el botón */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 mt-4 border-b border-slate-200/60 pb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Resumen Global</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Balance operativo y métricas en tiempo real
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center gap-2 active:scale-95"
        >
          <span className="text-lg">+</span> Añadir Movimiento
        </button>
      </div>

      <div className="space-y-8">
        <FinanceKPIs stats={stats} />

        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Flujo de Caja (6 Meses)</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Comparativa Ingresos vs Gastos</p>
          </div>
          <FinanceChart data={datosGrafico} />
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-50/50 gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Registro General</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Últimas transacciones</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => exportToCSV(movimientos)}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors active:scale-95 shadow-sm flex items-center gap-2"
              >
                <span>📊</span> Excel (CSV)
              </button>
              
              <button 
                // 2. AÑADE EL ONCLICK AQUÍ, pasándole los datos
                onClick={() => exportToPDF(movimientos, stats)} 
                className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-colors active:scale-95 shadow-sm flex items-center gap-2"
              >
                <span>📄</span> Reporte PDF
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