import React from 'react';

const DashboardContent = ({ Component, activeTab, user }) => {
  if (Component) {
    // Pasamos 'user' solo si el componente es MainDashboard, como en el original
    const props = activeTab === 'dashboard' ? { user } : {};
    return <Component {...props} />;
  }

  return (
    <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-100 shadow-xl">
      <span className="text-6xl mb-4 block">🚧</span>
      <h2 className="text-2xl font-black text-slate-800 tracking-tighter">
        Módulo "{activeTab}" en desarrollo
      </h2>
      <p className="text-slate-400 font-medium mt-2">
        Estamos trabajando para habilitar esta sección lo antes posible.
      </p>
    </div>
  );
};

export default DashboardContent;