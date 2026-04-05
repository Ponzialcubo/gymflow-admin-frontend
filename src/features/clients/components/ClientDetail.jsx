import React from 'react';
import { useClientDetail } from '../hooks/useClientDetail';
import ClientDetailHeader from './client-detail/ClientDetailHeader';
import ClientProfileCard from './client-detail/ClientProfileCard';
import ClientNutritionCard from './client-detail/ClientNutritionCard';
import ClientMeasurementsHistory from './client-detail/ClientMeasurementsHistory';
import ClientWorkoutPlan from './client-detail/ClientWorkoutPlan';
import ClientWorkoutModal from './modals/ClientWorkoutModal';
import ClientMeasurementsModal from './modals/ClientMeasurementsModal';
import ClientDietModal from './modals/ClientDietModal';
import ClientEditModal from './modals/ClientEditModal';

export default function ClientDetail({ socioId, onBack }) {
  const {
    perfil, rutinas, mediciones, ejerciciosCatalogo, loading,
    isMedicionModalOpen, setIsMedicionModalOpen,
    isEditModalOpen, setEditModalOpen,
    isDietaModalOpen, setIsDietaModalOpen,
    isRutinaModalOpen, setIsRutinaModalOpen,
    newMedicion, setNewMedicion,
    editData, setEditData,
    newDieta, setNewDieta,
    newRutina, setNewRutina,
    handleBaja, handleEditSocio, handleAddMedicion, handleAddDieta, handleAddRutina
  } = useClientDetail(socioId, onBack);

  if (loading) return <div className="p-20 text-center text-slate-400 animate-pulse font-black uppercase tracking-widest italic">Sincronizando expediente técnico...</div>;
  if (!perfil) return <div className="p-20 text-center text-red-500 font-bold">Error de enlace con la base de datos.</div>;

  const { usuario, dieta, suscripcion } = perfil;
  const ordenDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      <ClientDetailHeader 
        onBack={onBack} 
        onOpenEditModal={() => setEditModalOpen(true)} 
        onBaja={handleBaja} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMNA DE DATOS BIOMÉTRICOS Y PLANES */}
        <div className="lg:col-span-1 space-y-8">
          <ClientProfileCard usuario={usuario} suscripcion={suscripcion} />
          {/* Protección para la dieta */}
          <ClientNutritionCard dieta={dieta || null} onOpenDietaModal={() => setIsDietaModalOpen(true)} />
          {/* Protección garantizando que mediciones siempre sea un array */}
          <ClientMeasurementsHistory mediciones={mediciones || []} onOpenModal={() => setIsMedicionModalOpen(true)} />
        </div>

        {/* COLUMNA DERECHA: ENTRENAMIENTO */}
        {/* Protección garantizando que rutinas siempre sea un array */}
        <ClientWorkoutPlan rutinas={rutinas || []} onOpenRutinaModal={() => setIsRutinaModalOpen(true)} />
      </div>

      {/* --- MODALES OPTIMIZADOS Y BLINDADOS --- */}
      <ClientWorkoutModal 
        isOpen={isRutinaModalOpen} 
        onClose={() => setIsRutinaModalOpen(false)} 
        onSubmit={handleAddRutina} 
        newRutina={newRutina || {}} /* <-- ESCUDO ANTI-CRASH */
        setNewRutina={setNewRutina} 
        ejerciciosCatalogo={ejerciciosCatalogo || []} 
        ordenDias={ordenDias} 
        usuarioNombre={usuario?.nombre} 
      />
      <ClientMeasurementsModal 
        isOpen={isMedicionModalOpen} 
        onClose={() => setIsMedicionModalOpen(false)} 
        onSubmit={handleAddMedicion} 
        newMedicion={newMedicion || {}} /* <-- ESCUDO ANTI-CRASH (Adiós error peso_kg) */
        setNewMedicion={setNewMedicion} 
        usuarioNombre={usuario?.nombre} 
      />
      <ClientDietModal 
        isOpen={isDietaModalOpen} 
        onClose={() => setIsDietaModalOpen(false)} 
        onSubmit={handleAddDieta} 
        newDieta={newDieta || {}} /* <-- ESCUDO ANTI-CRASH */
        setNewDieta={setNewDieta} 
      />
      <ClientEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        onSubmit={handleEditSocio} 
        editData={editData || {}} /* <-- ESCUDO ANTI-CRASH */
        setEditData={setEditData} 
      />
    </div>
  );
}