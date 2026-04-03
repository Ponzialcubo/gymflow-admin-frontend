import { useState, useMemo } from 'react';

// Importación de Secciones
import MainDashboard from '../features/dashboard/MainDashboard';
import ClientsSection from '../features/clients/ClientsSection';
import TrainingSection from '../features/training/TrainingSection';
import NutritionSection from '../features/nutrition/NutritionSection';
import ExercisesSection from '../features/exercises/ExercisesSection';
import PaymentsSection from '../features/payments/PaymentsSection';
import FinancesSection from '../features/finances/FinancesSection';
import SettingsSection from '../features/settings/SettingsSection';

const sectionComponents = {
  dashboard: MainDashboard,
  clients: ClientsSection,
  training: TrainingSection,
  nutrition: NutritionSection,
  exercises: ExercisesSection,
  payments: PaymentsSection,
  finances: FinancesSection,
  settings: SettingsSection,
};

const sectionTitles = {
  dashboard: 'Dashboard',
  clients: 'Gestión de Socios',
  finances: 'Caja y Finanzas',
  settings: 'Configuración'
};

export const useDashboardNavigation = (initialTab = 'dashboard') => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const CurrentComponent = useMemo(() => sectionComponents[activeTab] || null, [activeTab]);

  const currentTitle = useMemo(() => {
    return sectionTitles[activeTab] || (activeTab.charAt(0).toUpperCase() + activeTab.slice(1));
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    CurrentComponent,
    currentTitle,
  };
};