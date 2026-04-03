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

  if (selectedSocioId) {
    return (
      <div className="animate-in fade-in duration-500">
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

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <ClientsHeader 
        busqueda={busqueda} 
        setBusqueda={setBusqueda} 
        onOpenModal={() => setIsModalOpen(true)} 
      />
      <ClientsTable 
        loading={loading} 
        socios={sociosFiltrados} 
        onSelectSocio={setSelectedSocioId} 
      />
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