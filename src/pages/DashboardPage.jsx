import Sidebar from '../components/layout/Sidebar';
import { useDashboardNavigation } from '../hooks/useDashboardNavigation';
import DashboardHeader from '../components/layout/DashboardHeader';
import DashboardContent from '../components/layout/DashboardContent';

function DashboardPage({ user, logout }) {
  const { 
    activeTab, 
    setActiveTab, 
    CurrentComponent, 
    currentTitle 
  } = useDashboardNavigation('dashboard');

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