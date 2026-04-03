import React from 'react';

export default function ClientsTable({ loading, socios, onSelectSocio }) {
  return (
    <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
      
      {/* 1. CABECERA DE LA TABLA: Escala aumentada */}
      <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Socios Activos</h2>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-2">
            Base de datos: <span className="text-blue-600">{socios.length} registros</span>
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-24 text-center font-bold text-slate-300 animate-pulse uppercase tracking-[0.2em] text-sm">
            Sincronizando con base de datos...
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              {/* 2. TÍTULOS DE COLUMNAS: Más legibles y espaciados */}
              <tr className="text-slate-400 text-xs font-black uppercase tracking-[0.15em] border-b-2 border-slate-100">
                <th className="py-8 px-10 text-center w-24">ID</th>
                <th className="py-8 px-6">Socio</th>
                <th className="py-8 px-6">Contacto</th>
                <th className="py-8 px-6 text-center">Estado</th>
                <th className="py-8 px-10 text-right">Acción</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {socios.map(socio => (
                <tr key={socio.id} className="hover:bg-blue-50/30 transition-colors group">
                  {/* 3. CONTENIDO DE FILAS: Mayor padding vertical (py-8) para no agobiar */}
                  <td className="py-8 px-10 text-center text-slate-300 font-black text-sm">
                    #{socio.id.toString().slice(0, 4)} {/* Truncamos UUID si es muy largo */}
                  </td>
                  
                  <td className="py-8 px-6">
                    <div className="flex items-center gap-5">
                      {/* Avatar más grande */}
                      <img 
                        src={`https://api.dicebear.com/8.x/initials/svg?seed=${socio.nombre}`} 
                        className="w-12 h-12 rounded-[1rem] border-2 border-white shadow-sm bg-slate-100 object-cover" 
                        alt="avatar"
                      />
                      <span className="font-black text-slate-800 text-base group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                        {socio.nombre}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-8 px-6 text-slate-500 text-sm font-bold italic">
                    {socio.email}
                  </td>
                  
                  <td className="py-8 px-6 text-center">
                    {/* Badge de estado mejorado */}
                    <span className="inline-flex px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-wider border border-emerald-100">
                      Activo
                    </span>
                  </td>
                  
                  <td className="py-8 px-10 text-right">
                    {/* Botón de acción más grande y claro */}
                    <button 
                      onClick={() => onSelectSocio(socio.id)}
                      className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 uppercase tracking-[0.15em] transition-all bg-white hover:bg-blue-50 px-5 py-3 rounded-2xl border border-transparent hover:border-blue-100 active:scale-95"
                    >
                      Ver Ficha <span>→</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {!loading && socios.length === 0 && (
          <div className="p-32 text-center flex flex-col items-center justify-center gap-4">
            <span className="text-4xl">📭</span>
            <p className="text-slate-400 font-black uppercase text-sm tracking-widest italic">
              No se han encontrado resultados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}