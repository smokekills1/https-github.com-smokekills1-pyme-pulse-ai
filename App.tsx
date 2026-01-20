
import React, { useState } from 'react';
import { View, AppView } from './types';
import Sidebar from './components/Sidebar';
import { MarketingTool, ReviewTool, AnalysisTool } from './components/Tools';
import Report from './components/Report';

const DashboardHome = ({ setView }: { setView: (v: AppView) => void }) => {
  const cards = [
    { 
      id: AppView.MARKETING, 
      title: "Marketing Digital", 
      desc: "Anuncios optimizados y prompts visuales para redes sociales.", 
      icon: "⚡", 
      color: "bg-indigo-600" 
    },
    { 
      id: AppView.REVIEWS, 
      title: "Reputación Online", 
      desc: "Gestión de crisis y respuestas corporativas automáticas.", 
      icon: "💬", 
      color: "bg-emerald-500" 
    },
    { 
      id: AppView.STRATEGY, 
      title: "Estrategia Senior", 
      desc: "Análisis de mercado y DAFO con razonamiento profundo.", 
      icon: "📊", 
      color: "bg-amber-500" 
    },
    { 
      id: AppView.REPORT, 
      title: "Memoria Técnica", 
      desc: "Documentación completa y académica lista para descarga.", 
      icon: "📄", 
      color: "bg-slate-800" 
    }
  ];

  return (
    <div className="animate-fadeIn">
      <header className="mb-12">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Panel de Control</h2>
        <p className="text-slate-500 text-lg">Bienvenido al ecosistema de inteligencia para PYMES.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(card => (
          <button 
            key={card.id}
            onClick={() => setView(card.id)}
            className="glass-card p-8 rounded-[2rem] text-left hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full"
          >
            <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-6 text-white text-xl group-hover:rotate-12 transition-transform`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed flex-1">{card.desc}</p>
            <div className="mt-6 flex items-center text-[10px] font-bold uppercase tracking-widest text-indigo-600">
              Explorar Herramienta 
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-200">
           <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Estado del Sistema</h4>
           <div className="flex items-center gap-6">
              <div className="flex-1 space-y-2">
                 <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Motor Gemini 3 Pro</span>
                    <span className="text-emerald-500">Activo</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[95%]"></div>
                 </div>
              </div>
              <div className="flex-1 space-y-2">
                 <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Latencia Media</span>
                    <span>1.2s</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[20%]"></div>
                 </div>
              </div>
           </div>
        </div>
        <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
           <div className="relative z-10">
              <h4 className="text-xs font-bold opacity-80 uppercase tracking-widest mb-4">Alumno Colaborador</h4>
              <p className="text-lg font-black leading-tight">José Ramón García Utrero</p>
              <p className="text-xs opacity-70 mt-2 italic">Grupo 40 - IA para Pymes</p>
           </div>
           <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <DashboardHome setView={setCurrentView} />;
      case AppView.MARKETING: return <MarketingTool />;
      case AppView.REVIEWS: return <ReviewTool />;
      case AppView.STRATEGY: return <AnalysisTool />;
      case AppView.REPORT: return <Report />;
      default: return <DashboardHome setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 p-6 md:p-12 lg:p-16 max-w-[1600px]">
        <div className="mb-12 flex items-center justify-between">
           <div className="md:hidden">
              <h1 className="text-xl font-black text-indigo-600">PYME-Pulse AI</h1>
           </div>
           <div className="flex items-center gap-4 ml-auto">
              <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                 Servicio Operativo
              </div>
           </div>
        </div>
        
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
