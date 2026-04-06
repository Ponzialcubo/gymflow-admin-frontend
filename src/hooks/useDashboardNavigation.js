import { useState, useMemo, useEffect } from 'react';

// Importación de Secciones
import MainDashboard from '../features/dashboard/MainDashboard';
import ClientsSection from '../features/clients/ClientsSection';
import TrainingSection from '../features/training/TrainingSection';
import NutritionSection from '../features/nutrition/NutritionSection';
import ExercisesSection from '../features/exercises/ExercisesSection';
import PaymentsSection from '../features/payments/PaymentsSection';
import FinancesSection from '../features/finances/FinancesSection';
import SettingsSection from '../features/settings/SettingsSection';
import CalendarSection from '../features/calendar/CalendarSection';

const sectionComponents = {
  dashboard: MainDashboard,
  clients: ClientsSection,
  calendar: CalendarSection, 
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
  calendar: 'Calendario de Clases', 
  training: 'Entrenamientos',      
  nutrition: 'Nutrición',          
  exercises: 'Catálogo de Ejercicios',         
  payments: 'Suscripciones',          
  finances: 'Caja y Finanzas',
  settings: 'Configuración'
};

export const useDashboardNavigation = (initialTab = 'dashboard') => {
  // 1. Al arrancar, comprobamos si hay una pestaña guardada en localStorage
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('gymflow_active_tab');
    // Si hay una guardada y es válida, la usamos. Si no, usamos initialTab ('dashboard')
    return (savedTab && sectionComponents[savedTab]) ? savedTab : initialTab;
  });

  // 2. Cada vez que activeTab cambie, la guardamos en el localStorage
  useEffect(() => {
    localStorage.setItem('gymflow_active_tab', activeTab);
  }, [activeTab]);

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