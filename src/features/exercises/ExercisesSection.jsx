import { useState } from 'react'; 
import { useExercises } from './hooks/useExercises';
import ExerciseCard from './components/ExerciseCard';
import ExercisesControls from './components/ExercisesControls'; 
import AddExerciseModal from './components/AddExerciseModal';
import ExerciseDetailModal from './components/ExerciseDetailModal';

export default function ExercisesSection() {
  const {
    exercises, loading, filterName, setFilterName,
    selectedMuscle, setSelectedMuscle,
    isModalOpen, setIsModalOpen,
    newExercise, setNewExercise,
    handleAddExercise, handleDelete,
    errorMsg, deleteConfirmId, setDeleteConfirmId
  } = useExercises();

  // Estado para controlar el Modal de Detalles
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Función para abrir el detalle
  const handleViewDetails = (exercise) => {
    setSelectedExercise(exercise);
    setIsDetailModalOpen(true);
  };

  if (loading) return (
    // Unificamos el color a slate-400 para que el "blink" sea igual en toda la app
    <div className="p-20 text-center font-black text-slate-400 animate-pulse uppercase tracking-[0.2em]">
      Abriendo Bóveda de Entrenamiento...
    </div>
  );

  return (
    // UNIFICADO: space-y-8 y duration-700 para consistencia total
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* Controles de búsqueda y filtros */}
      <ExercisesControls 
        onSearchChange={setFilterName}
        selectedMuscle={selectedMuscle}
        onMuscleSelect={setSelectedMuscle}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {errorMsg && (
        <p className="text-sm font-bold text-red-500 bg-red-50 rounded-2xl px-5 py-3 mt-3">{errorMsg}</p>
      )}

      {/* Grid de ejercicios con espaciado pro */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {exercises.map(e => (
          <ExerciseCard
            key={e.id}
            exercise={e}
            onDelete={handleDelete}
            onView={handleViewDetails}
            deleteConfirmId={deleteConfirmId}
            onCancelDelete={() => setDeleteConfirmId(null)}
          />
        ))}
      </div>

      {/* Modal de Creación */}
      <AddExerciseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExercise}
        formData={newExercise}
        setFormData={setNewExercise}
      />

      {/* Modal de Detalles (Z-index superior gestionado internamente) */}
      <ExerciseDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        exercise={selectedExercise}
      />
      
    </div>
  );
}