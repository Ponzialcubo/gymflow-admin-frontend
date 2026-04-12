import React from 'react';
import { useClientDetail } from '../hooks/useClientDetail';
import ClientDetailHeader from './client-detail/ClientDetailHeader';
import ClientProfileCard from './client-detail/ClientProfileCard';
import ClientNutritionCard from './client-detail/ClientNutritionCard';
import ClientMeasurementsHistory from './client-detail/ClientMeasurementsHistory';
import ClientWorkoutPlan from './client-detail/ClientWorkoutPlan';

// MODALES
import ClientWorkoutModal from './modals/ClientWorkoutModal';
import ClientMeasurementsModal from './modals/ClientMeasurementsModal';
import ClientDietModal from './modals/ClientDietModal';
import ClientEditModal from './modals/ClientEditModal';
import ViewDietModal from './client-detail/ViewDietModal'; // <--- IMPORTANTE: Nueva importación

export default function ClientDetail({ socioId, onBack }) {
  const {
    perfil, rutinas, mediciones, ejerciciosCatalogo, loading,
    isMedicionModalOpen, setIsMedicionModalOpen,
    isEditModalOpen, setEditModalOpen,
    isDietaModalOpen, setIsDietaModalOpen,
    isRutinaModalOpen, setIsRutinaModalOpen,
    isViewDietModalOpen, setIsViewDietModalOpen, // <--- 1. CONECTADO DESDE EL HOOK
    newMedicion, setNewMedicion,
    editData, setEditData,
    newDieta, setNewDieta,
    newRutina, setNewRutina,
    handleBaja, handleEditSocio, handleAddMedicion, handleAddDieta, handleAddRutina
  } = useClientDetail(socioId, onBack);

  if (loading) return (
    <div className="p-20 text-center text-slate-400 animate-pulse font-black uppercase tracking-widest italic">
      Sincronizando expediente técnico...
    </div>
  );

  if (!perfil) return (
    <div className="p-20 text-center text-red-500 font-bold">
      Error de enlace con la base de datos.
    </div>
  );

  const { usuario, dieta, suscripcion } = perfil;
  const ordenDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* CABECERA DE PERFIL */}
      <ClientDetailHeader 
        onBack={onBack} 
        onOpenEditModal={() => setEditModalOpen(true)} 
        onBaja={handleBaja} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: BIOMETRÍA Y NUTRICIÓN */}
        <div className="lg:col-span-1 space-y-8">
          <ClientProfileCard usuario={usuario} suscripcion={suscripcion} />
          
          {/* 2. TARJETA DE NUTRICIÓN: Ahora controla el modal de visualización */}
          <ClientNutritionCard 
            dieta={dieta || null} 
            onOpenDietaModal={() => setIsDietaModalOpen(true)}
            isViewModalOpen={isViewDietModalOpen}
            setIsViewModalOpen={setIsViewDietModalOpen}
          />

          <ClientMeasurementsHistory 
            mediciones={mediciones || []} 
            onOpenModal={() => setIsMedicionModalOpen(true)} 
          />
        </div>

        {/* COLUMNA DERECHA: ENTRENAMIENTO */}
        <div className="lg:col-span-2">
          <ClientWorkoutPlan 
            rutinas={rutinas || []} 
            onOpenRutinaModal={() => setIsRutinaModalOpen(true)} 
          />
        </div>
      </div>

      {/* --- LISTA DE MODALES (CAPA SUPERIOR) --- */}

      {/* 3. MODAL DE VISTA DE ALIMENTOS (NUEVO) */}
      <ViewDietModal 
        isOpen={isViewDietModalOpen} 
        onClose={() => setIsViewDietModalOpen(false)} 
        dieta={dieta} 
      />

      <ClientWorkoutModal 
        isOpen={isRutinaModalOpen} 
        onClose={() => setIsRutinaModalOpen(false)} 
        onSubmit={handleAddRutina} 
        newRutina={newRutina || {}} 
        setNewRutina={setNewRutina} 
        ejerciciosCatalogo={ejerciciosCatalogo || []} 
        ordenDias={ordenDias} 
        usuarioNombre={usuario?.nombre} 
      />

      <ClientMeasurementsModal 
        isOpen={isMedicionModalOpen} 
        onClose={() => setIsMedicionModalOpen(false)} 
        onSubmit={handleAddMedicion} 
        newMedicion={newMedicion || {}} 
        setNewMedicion={setNewMedicion} 
        usuarioNombre={usuario?.nombre} 
      />

      <ClientDietModal 
        isOpen={isDietaModalOpen} 
        onClose={() => setIsDietaModalOpen(false)} 
        onSubmit={handleAddDieta} 
        newDieta={newDieta || {}} 
        setNewDieta={setNewDieta} 
      />

      <ClientEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        onSubmit={handleEditSocio} 
        editData={editData || {}} 
        setEditData={setEditData} 
      />

    </div>
  );
}