export default function AddSubscriptionModal({ isOpen, onClose, users, newSub, setNewSub, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tighter">Nueva Membresía</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Alta de pago recurrente</p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase ml-1">Seleccionar Socio</label>
            <select 
              required
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-blue-500"
              value={newSub.id_usuario}
              onChange={e => setNewSub({...newSub, id_usuario: e.target.value})}
            >
              <option value="">Buscar socio...</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.nombre.toUpperCase()}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase ml-1">Plan</label>
              <select 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold"
                value={newSub.tipo_plan}
                onChange={e => setNewSub({...newSub, tipo_plan: e.target.value})}
              >
                <option value="Mensual">Mensual</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Anual">Anual</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase ml-1">Importe (€)</label>
              <input 
                type="number" 
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold"
                value={newSub.precio}
                onChange={e => setNewSub({...newSub, precio: e.target.value})}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-slate-400 font-black text-[10px] uppercase">Cancelar</button>
            <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-blue-100">Activar</button>
          </div>
        </form>
      </div>
    </div>
  );
}