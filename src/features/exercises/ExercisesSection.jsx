import { useState } from 'react'; // <-- Asegúrate de importar useState
import { useExercises } from './hooks/useExercises';
import ExerciseCard from './components/ExerciseCard';
import ExercisesControls from './components/ExercisesControls'; 
import AddExerciseModal from './components/AddExerciseModal';
import ExerciseDetailModal from './components/ExerciseDetailModal'; // <-- Importamos el nuevo modal

export default function ExercisesSection() {
  const {
    exercises, loading, filterName, setFilterName,
    selectedMuscle, setSelectedMuscle,
    isModalOpen, setIsModalOpen,
    newExercise, setNewExercise,
    handleAddExercise, handleDelete
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
    <div className="p-20 text-center font-black text-slate-300 animate-pulse uppercase tracking-[0.2em]">
      Abriendo Bóveda de Entrenamiento...
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      
      <ExercisesControls 
        onSearchChange={setFilterName}
        selectedMuscle={selectedMuscle}
        onMuscleSelect={setSelectedMuscle}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {exercises.map(e => (
          <ExerciseCard 
            key={e.id} 
            exercise={e} 
            onDelete={handleDelete}
            onView={handleViewDetails} // <-- Pasamos la función a la tarjeta
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

      {/* NUEVO: Modal de Detalles */}
      <ExerciseDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        exercise={selectedExercise}
      />
      
    </div>
  );
}