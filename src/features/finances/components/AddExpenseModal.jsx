import React, { useState } from 'react';
import { supabase } from '../../../config/supabase'; 

export default function AddExpenseModal({ isOpen, onClose, onSuccess }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    fecha: new Date().toISOString().split('T')[0],
    concepto: '',
    categoria: 'Operativo',
    importe: '',
    estado: 'COMPLETADO'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.from('gastos').insert([{
        fecha: form.fecha,
        concepto: form.concepto,
        categoria: form.categoria,
        importe: parseFloat(form.importe),
        estado: form.estado
      }]);
      
      if (error) throw error;
      onSuccess(); // Refresca la tabla
      onClose(); // Cierra el modal
      setForm({ fecha: new Date().toISOString().split('T')[0], concepto: '', categoria: 'Operativo', importe: '', estado: 'COMPLETADO' });
    } catch (error) {
      alert("Error al guardar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-slate-50 p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Añadir Gasto</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Registra salidas de caja</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-black shadow-sm">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Concepto</label>
              <input type="text" required value={form.concepto} onChange={e => setForm({...form, concepto: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-800 focus:border-blue-500" placeholder="Ej. Compra de mancuernas" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Importe (€)</label>
              <input type="number" step="0.01" required value={form.importe} onChange={e => setForm({...form, importe: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-black text-slate-800 focus:border-red-400" placeholder="0.00" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Categoría</label>
              <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-700">
                <option value="Operativo">Operativo (Luz, Agua, Alquiler)</option>
                <option value="Equipamiento">Equipamiento y Material</option>
                <option value="Laboral">Laboral (Nóminas)</option>
                <option value="Marketing">Marketing y Publicidad</option>
                <option value="Otros">Otros Gastos</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Fecha</label>
              <input type="date" required value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-800" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Estado</label>
              <select value={form.estado} onChange={e => setForm({...form, estado: e.target.value})} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-slate-700">
                <option value="COMPLETADO">Completado (Pagado)</option>
                <option value="PENDIENTE">Pendiente de pago</option>
              </select>
            </div>
          </div>
          <div className="pt-6 flex justify-end">
            <button type="submit" disabled={saving} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95">
              {saving ? 'Guardando...' : 'Registrar Gasto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}