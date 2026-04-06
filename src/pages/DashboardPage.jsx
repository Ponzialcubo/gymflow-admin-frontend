import Sidebar from '../components/layout/Sidebar';
import { useDashboardNavigation } from '../hooks/useDashboardNavigation';
import DashboardHeader from '../components/layout/DashboardHeader';
import DashboardContent from '../components/layout/DashboardContent';
import { Navigate } from 'react-router-dom';

function DashboardPage({ user, logout }) {
  const { 
    activeTab, 
    setActiveTab, 
    CurrentComponent, 
    currentTitle 
  } = useDashboardNavigation('dashboard');

  // 🛡️ RESTRICCIÓN TOTAL: Si no es admin, no ve ni el Sidebar.
  const isAdmin = user?.rol?.toLowerCase() === 'admin';

  if (!isAdmin) {
    // Si un empleado intenta entrar, lo mandamos fuera o a una página de error
    return <Navigate to="/acceso-denegado" />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        logout={logout} 
        user={user} 
      />

      <main className="flex-1 ml-64 p-10 min-h-screen">
        <DashboardHeader title={currentTitle} user={user} />

        <div className="pb-20">
          {/* Aquí ya no hace falta preocuparse, porque solo llega el Admin */}
          <DashboardContent 
            Component={CurrentComponent} 
            activeTab={activeTab} 
            user={user} 
          />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;