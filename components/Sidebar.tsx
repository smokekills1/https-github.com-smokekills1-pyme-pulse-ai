
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Panel de Control' },
    { id: AppView.MARKETING, label: 'Marketing Digital' },
    { id: AppView.REVIEWS, label: 'Gestión de Reseñas' },
    { id: AppView.ANALYSIS, label: 'Análisis Estratégico' },
    { id: AppView.REPORT, label: 'Memoria Técnica' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-8 hidden md:flex flex-col">
      <div className="mb-12">
        <h1 className="text-xl font-bold text-indigo-600 tracking-tight">
          PYME-Pulse AI
        </h1>
        <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest mt-2 leading-tight">
          Aplicaciones prácticas de la IA en Pymes Grupo 40
        </p>
      </div>
      
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
              currentView === item.id 
                ? 'bg-indigo-50 text-indigo-700 font-bold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4 text-center">
          <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
            Proyecto fin de curso del Alumno:<br />
            <span className="text-slate-900 font-bold">José Ramón García Utrero</span>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
