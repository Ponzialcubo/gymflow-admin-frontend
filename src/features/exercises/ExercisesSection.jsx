import { useExercises } from './hooks/useExercises';
import ExerciseCard from './components/ExerciseCard';
import ExercisesControls from './components/ExercisesControls'; 
import AddExerciseModal from './components/AddExerciseModal';  

export default function ExercisesSection() {
  const {
    exercises, loading, filterName, setFilterName,
    selectedMuscle, setSelectedMuscle,
    isModalOpen, setIsModalOpen,
    newExercise, setNewExercise,
    handleAddExercise, handleDelete
  } = useExercises();

  if (loading) return (
    <div className="p-20 text-center font-black text-slate-300 animate-pulse uppercase tracking-[0.2em]">
      Abriendo Bóveda de Entrenamiento...
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      
      {/* Controles: Buscador y Filtros */}
      <ExercisesControls 
        onSearchChange={setFilterName}
        selectedMuscle={selectedMuscle}
        onMuscleSelect={setSelectedMuscle}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {/* Grid de resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {exercises.map(e => (
          <ExerciseCard key={e.id} exercise={e} onDelete={handleDelete} />
        ))}
      </div>

      {/* Modal de creación */}
      <AddExerciseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExercise}
        formData={newExercise}
        setFormData={setNewExercise}
      />
    </div>
  );
}