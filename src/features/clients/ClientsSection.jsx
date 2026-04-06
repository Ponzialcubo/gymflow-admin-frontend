import React from "react";

import ClientDetail from './components/ClientDetail';
import ClientsHeader from "./components/ClientsHeader";
import ClientsTable from "./components/ClientsTable";
import AddClientModal from "./components/AddClientModal";
import { useClients } from "./hooks/useClients";

export default function ClientsSection() {
  const {
    sociosFiltrados,
    busqueda,
    setBusqueda,
    isModalOpen,
    setIsModalOpen,
    selectedSocioId,
    setSelectedSocioId,
    loading,
    newSocio,
    setNewSocio,
    handleAddSocio,
    fetchSocios
  } = useClients();

  // VISTA DE DETALLE DEL SOCIO (Al hacer clic en uno)
  if (selectedSocioId) {
    return (
      // Actualizado a duration-700 para consistencia total
      <div className="animate-in fade-in duration-700 pb-20">
        <ClientDetail 
          socioId={selectedSocioId} 
          onBack={() => {
            setSelectedSocioId(null); 
            fetchSocios(); 
          }} 
        />
      </div>
    );
  }

  // VISTA DE LISTADO GENERAL
  return (
    // Actualizado a duration-700 y mantenemos el espaciado
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      
      <ClientsHeader 
        busqueda={busqueda} 
        setBusqueda={setBusqueda} 
        onOpenModal={() => setIsModalOpen(true)} 
      />

      <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
        <ClientsTable 
          loading={loading} 
          socios={sociosFiltrados} 
          onSelectSocio={setSelectedSocioId} 
        />
      </div>

      <AddClientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddSocio} 
        newSocio={newSocio} 
        setNewSocio={setNewSocio} 
        onClientAdded={() => fetchSocios()}
      />
    </div>
  );
}