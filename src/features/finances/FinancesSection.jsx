import React from 'react';
import { useFinances } from './hooks/useFinances'; 
import FinanceKPIs from './components/FinanceKPIs';
import FinanceChart from './components/FinanceChart';
import FinanceTable from './components/FinanceTable';

export default function FinancesSection() {
  const { movimientos, stats, datosGrafico, loading } = useFinances();

  if (loading) {
    return (
      <div className="w-full pt-32 text-center animate-pulse">
        <span className="text-5xl block mb-4 grayscale opacity-20">💰</span>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Sincronizando Libro Mayor...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-20 animate-in fade-in duration-700">
      
      {/* QUITAMOS EL TÍTULO DUPLICADO. 
        Solo dejamos el botón de "Añadir Movimiento" alineado a la derecha,
        con un margen para que no se pegue al Header Global.
      */}
      <div className="flex justify-end mb-8 mt-2">
        <button className="px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95">
          <span className="text-lg">+</span> Añadir Movimiento
        </button>
      </div>

      <div className="space-y-8">
        
        {/* FILA 1: KPIs Rápidos */}
        <FinanceKPIs stats={stats} />

        {/* FILA 2: El Gráfico */}
        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Flujo de Caja (6 Meses)</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Comparativa Ingresos vs Gastos</p>
          </div>
          <FinanceChart data={datosGrafico} />
        </div>

        {/* FILA 3: Tabla de Movimientos */}
        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/20 border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Registro General</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Últimas transacciones</p>
            </div>
            <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors active:scale-95">
              Descargar Excel
            </button>
          </div>
          
          <FinanceTable movimientos={movimientos} />
        </div>
      </div>

    </div>
  );
}