import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinanceChart({ data }) {
  
  // 💰 Formateador profesional: Redondea a 2 decimales y añade el símbolo €
  const currencyFormatter = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="w-full h-[350px] min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {/* Aumentamos el margen izquierdo a 0 para que no se corten los precios en el eje Y */}
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          
          <XAxis 
            dataKey="mes" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 900 }} 
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
            // Redondeamos los números del lateral para que no salgan decimales feos
            tickFormatter={(value) => `${Math.round(value)}€`}
          />
          
          <Tooltip 
            contentStyle={{ 
              borderRadius: '20px', 
              border: 'none', 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              padding: '16px'
            }}
            itemStyle={{ fontWeight: 900, fontSize: '14px' }}
            labelStyle={{ fontWeight: 900, color: '#1e293b', marginBottom: '8px', textTransform: 'uppercase' }}
            // 👇 AQUÍ SE ARREGLA EL PROBLEMA: Formatea el valor del Tooltip
            formatter={(value) => [currencyFormatter(value), ""]}
          />
          
          <Area 
            type="monotone" 
            dataKey="ingresos" 
            name="Ingresos" 
            stroke="#10b981" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorIngresos)" 
          />
          
          <Area 
            type="monotone" 
            dataKey="gastos" 
            name="Gastos" 
            stroke="#ef4444" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorGastos)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}