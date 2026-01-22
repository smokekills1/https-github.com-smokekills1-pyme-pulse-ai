
import React, { useState, useEffect } from 'react';
import { generateMarketingCopy, respondToReview, analyzeBusinessIdea } from '../services/aiService';
import { generateProfessionalPDF } from '../services/pdfService';
import { MarketingOptions, MarketingVariant } from '../types';

const LOADING_MESSAGES = [
  "Iniciando motor de IA...",
  "Analizando público objetivo...",
  "Escaneando tendencias de mercado...",
  "Redactando propuestas creativas...",
  "Casi listo..."
];

export const MarketingTool = () => {
  const [options, setOptions] = useState<MarketingOptions>({
    product: '',
    target: '',
    platform: 'LinkedIn',
    tone: 'Analítico',
    length: 'medium'
  });
  const [variants, setVariants] = useState<MarketingVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async () => {
    if (!options.product || !options.target) return;
    setLoading(true);
    setError(null);
    setCopiedIndex(null);
    try {
      const results = await generateMarketingCopy(options);
      setVariants(results);
    } catch (e: any) {
      setError(e.message || "Error al conectar con el servicio de IA.");
    } finally {
      setLoading(false);
    }
  };

  const exportMarketingPDF = () => {
    const fullContent = variants.map((v, i) => 
      `--- PROPUESTA 0${i+1} ---\n\nTEXTO DEL ANUNCIO:\n${v.text}\n\nCONCEPTO VISUAL SUGERIDO:\n${v.imagePrompt}\n\n\n`
    ).join('\n');
    
    generateProfessionalPDF(
      "Estrategia de Contenidos AI",
      `Campaña para ${options.platform} | Tono: ${options.tone}`,
      fullContent,
      `marketing-${options.platform.toLowerCase()}`
    );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-10 animate-fadeIn">
      <div className="xl:w-1/3 bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-fit sticky top-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Marketing AI</h2>
        </div>
        
        <div className="space-y-6">
          {error && <div className="p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded-xl border border-red-100">{error}</div>}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Producto o Servicio</label>
            <textarea 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition text-sm" 
              rows={3}
              placeholder="¿Qué ofrece su empresa?"
              value={options.product}
              onChange={(e) => setOptions({...options, product: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Público Objetivo</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition text-sm" 
              placeholder="Ej: Directivos de RRHH..."
              value={options.target}
              onChange={(e) => setOptions({...options, target: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Canal</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm cursor-pointer"
                value={options.platform}
                onChange={(e) => setOptions({...options, platform: e.target.value})}
              >
                <option>LinkedIn</option>
                <option>Instagram</option>
                <option>Facebook Ads</option>
                <option>TikTok</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tono</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm cursor-pointer"
                value={options.tone}
                onChange={(e) => setOptions({...options, tone: e.target.value})}
              >
                <option>Analítico</option>
                <option>Persuasivo</option>
                <option>Inspirador</option>
                <option>Directo</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !options.product || !options.target}
            className={`w-full py-4 rounded-2xl font-bold uppercase text-[11px] tracking-widest transition-all ${
              loading ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
            } disabled:opacity-50`}
          >
            {loading ? 'Procesando...' : 'Generar Campaña'}
          </button>
        </div>
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="space-y-6">
            <div className="h-14 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center px-6">
               <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest animate-pulse">
                  {LOADING_MESSAGES[loadingStep]}
               </span>
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 space-y-4 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                <div className="h-20 bg-slate-50 rounded w-full"></div>
                <div className="h-10 bg-slate-50 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : variants.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Resultados Obtenidos</span>
                <p className="text-sm font-bold text-slate-900">3 Variantes de Copy para {options.platform}</p>
              </div>
              <button 
                onClick={exportMarketingPDF}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition shadow-xl shadow-slate-200"
              >
                Exportar Informe
              </button>
            </div>
            {variants.map((v, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-indigo-300 transition-colors shadow-sm">
                <div className="px-8 py-4 bg-slate-50 border-b flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estrategia 0{i+1}</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(v.text);
                      setCopiedIndex(i);
                      setTimeout(() => setCopiedIndex(null), 2000);
                    }}
                    className="text-[10px] font-bold text-indigo-600 uppercase hover:underline"
                  >
                    {copiedIndex === i ? '¡Copiado!' : 'Copiar Texto'}
                  </button>
                </div>
                <div className="p-8 space-y-6">
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-medium">{v.text}</p>
                  <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                    <span className="block text-[9px] font-black text-indigo-400 uppercase mb-2 tracking-widest">Concepto Visual IA</span>
                    <p className="text-xs text-indigo-900 italic leading-relaxed">{v.imagePrompt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-300 bg-white">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-20"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Esperando Parámetros</p>
            <p className="text-xs text-slate-300 mt-2">Configure su campaña para comenzar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const ReviewTool = () => {
  const [review, setReview] = useState('');
  const [bizName, setBizName] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRespond = async () => {
    if (!review || !bizName) return;
    setLoading(true);
    setError(null);
    try {
      const data = await respondToReview(review, bizName);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Error al procesar la reseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Reputación Corporativa</h2>
        </div>
        <div className="space-y-6">
          {error && <div className="p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded-xl border border-red-100">{error}</div>}
          <input 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition" 
            placeholder="Nombre comercial de la empresa..."
            value={bizName}
            onChange={(e) => setBizName(e.target.value)}
          />
          <textarea 
            rows={4}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition" 
            placeholder="Pegue aquí el comentario o reseña del cliente..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button 
            onClick={handleRespond}
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold uppercase text-[11px] tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
          >
            {loading ? 'Generando Respuesta...' : 'Analizar y Responder'}
          </button>
        </div>
      </div>

      {result && (
        <div className="animate-fadeIn space-y-4">
          <div className="bg-white p-10 rounded-[2.5rem] border border-emerald-100 shadow-xl shadow-emerald-50/50">
            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Propuesta Institucional</h4>
            <p className="text-slate-700 text-lg leading-relaxed font-medium">{result}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const AnalysisTool = () => {
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!idea) return;
    setLoading(true);
    setError(null);
    setResult('');
    try {
      const data = await analyzeBusinessIdea(idea);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Error en el razonamiento estratégico.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Consultoría Estratégica Senior</h2>
        </div>
        <div className="space-y-8">
          {error && <div className="p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded-xl border border-red-100">{error}</div>}
          <textarea 
            rows={5}
            className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl text-sm leading-relaxed outline-none focus:ring-2 focus:ring-amber-100 transition" 
            placeholder="Describa su idea de negocio, problema operativo o cambio estratégico para que el sistema realice una auditoría..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-slate-900 text-white py-5 rounded-3xl font-bold uppercase text-[11px] tracking-widest hover:bg-amber-600 transition shadow-xl shadow-slate-200 disabled:opacity-50"
          >
            {loading ? 'Razonando Análisis (Gemini Flash)...' : 'Ejecutar Auditoría Avanzada'}
          </button>
        </div>

        {result && (
          <div className="mt-12 animate-fadeIn space-y-8 border-t border-slate-100 pt-12">
            <div className="max-w-none">
              {result.split('\n').map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="h-4"></div>;
                
                // Limpieza de caracteres de Markdown (* o #)
                const cleanLine = trimmed.replace(/[*#]/g, '');
                
                // Detectar encabezados (ej: "1. Diagnóstico" o texto en mayúsculas)
                const isHeader = /^\d+\./.test(cleanLine) || (cleanLine.toUpperCase() === cleanLine && cleanLine.length > 5);
                
                return (
                  <div key={i} className={`${isHeader ? 'font-black text-slate-900 uppercase tracking-wider text-xs mt-8 mb-4 border-l-4 border-amber-400 pl-4' : 'text-slate-600 text-sm leading-relaxed mb-2 pl-5'}`}>
                    {cleanLine}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
