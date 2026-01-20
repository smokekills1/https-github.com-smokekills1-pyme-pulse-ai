
import React from 'react';
import { generateProfessionalPDF } from '../services/pdfService';

const Report: React.FC = () => {
  const exportToPDF = () => {
    const reportTitle = "Pyme-Pulse AI - Memoria Técnica Detallada";
    const reportSubtitle = "Aplicaciones prácticas de la IA en Pymes Grupo 40 | Alumno: José Ramón García Utrero";
    
    const content = `
1. RESUMEN EJECUTIVO Y JUSTIFICACIÓN DEL PROYECTO
El proyecto Pyme-Pulse AI representa una solución vanguardista diseñada específicamente para el ecosistema de las pequeñas y medianas empresas (PYMES). En la era de la transformación digital, el acceso a herramientas de inteligencia artificial de alto rendimiento suele estar restringido a grandes corporaciones. Este proyecto rompe esa barrera, ofreciendo un motor de Business Intelligence que automatiza procesos críticos, optimiza la comunicación y proporciona análisis estratégicos de nivel senior de forma inmediata y accesible.

2. OBJETIVOS ESTRATÉGICOS
El desarrollo se ha guiado por tres pilares fundamentales:
- Democratización Tecnológica: Facilitar el uso de modelos LLM (Large Language Models) sin necesidad de conocimientos técnicos avanzados por parte del usuario final.
- Seguridad de Grado Empresarial: Implementar una arquitectura que proteja los activos digitales y las claves de acceso mediante capas de abstracción en el servidor.
- Eficacia Operativa: Reducir los tiempos de respuesta en marketing y atención al cliente en un 80%, permitiendo que el personal humano se centre en tareas de mayor valor añadido.

3. FASES DE DESARROLLO (LO QUE HEMOS HECHO)
El proceso de implementación se ha ejecutado de manera metódica en las siguientes etapas:
- Conceptualización y Diseño de UX: Creación de una interfaz minimalista en React que prioriza la claridad y la profesionalidad, evitando distracciones innecesarias.
- Configuración de Infraestructura Serverless: Despliegue en Vercel utilizando funciones en el lado del servidor para gestionar la lógica de negocio y la seguridad.
- Desarrollo del Middleware de Seguridad (Proxy): Construcción de un puente seguro entre el cliente y Google Cloud para proteger la API_KEY y controlar el flujo de datos.
- Refinamiento de Ingeniería de Prompts: Diseño de instrucciones de sistema complejas para asegurar que los modelos Gemini Flash y Pro respondan con un tono corporativo impecable y en castellano neutro/profesional.
- Integración de Servicios de Documentación: Implementación de un motor de síntesis PDF (jsPDF) que permite transformar los resultados de la IA en informes técnicos listos para su uso institucional.

4. ECOSISTEMA TECNOLÓGICO (APLICACIONES EMPLEADAS)
Se ha seleccionado un stack tecnológico de última generación para garantizar la robustez del sistema:
- Google Gemini 3 (Modelos Flash y Pro): Utilizados como el cerebro del sistema para el procesamiento de lenguaje natural y razonamiento complejo.
- React 18 & TypeScript: Framework para la interfaz de usuario que aporta tipado estricto y una arquitectura de componentes escalable.
- Tailwind CSS: Framework de diseño que ha permitido una estética sobria, moderna y totalmente adaptativa a dispositivos móviles.
- Vercel Edge Runtime: Para la ejecución de las APIs de servidor, garantizando latencias mínimas y alta disponibilidad global.
- jsPDF & AutoTable: Herramientas para la generación dinámica de documentos PDF corporativos.

5. ARQUITECTURA DE SEGURIDAD Y FLUJO DE DATOS
La seguridad es el núcleo de Pyme-Pulse AI. A diferencia de aplicaciones convencionales, aquí los datos del cliente se procesan de forma efímera. La clave de API de Google nunca se expone al navegador; todas las peticiones viajan cifradas hacia nuestro proxy en Vercel, donde se validan antes de contactar con los servicios de IA de Google. Esto garantiza que la propiedad intelectual de la empresa y sus credenciales permancan a salvo de ataques de inspección de código.

6. MÓDULO DE MARKETING ESTRATÉGICO
Este componente utiliza el modelo Gemini Flash para la generación rápida de copys publicitarios. El sistema analiza variables como el producto, el público objetivo y el canal (LinkedIn, Instagram, etc.) para adaptar el registro lingüístico. Además, genera "prompts visuales" detallados, permitiendo una sinergia perfecta entre el texto y la futura imagen de campaña.

7. GESTIÓN DE REPUTACIÓN Y ATENCIÓN AL CLIENTE
La gestión de reseñas automatizada permite a las PYMES mantener una presencia online activa y profesional. La IA analiza el sentimiento del cliente y construye respuestas que no solo agradecen el feedback, sino que gestionan posibles crisis de reputación con una empatía y neutralidad difíciles de mantener bajo presión operativa humana.

8. CONSULTORÍA Y AUDITORÍA DE NEGOCIO (RAZONAMIENTO AVANZADO)
Utilizando la potencia de Gemini 3 Pro con presupuestos de pensamiento (Thinking Budget), el sistema es capaz de realizar análisis DAFO y evaluaciones de mercado. Este módulo actúa como un consultor externo que ayuda a la dirección de la PYME a validar hipótesis de negocio o pivotar estrategias basándose en datos y lógica estructurada.

9. IMPACTO EN LA PRODUCTIVIDAD
La implementación de Pyme-Pulse AI supone una ventaja competitiva directa. Permite a una estructura pequeña operar con la sofisticación comunicativa de una gran empresa, eliminando cuellos de botella en la creación de contenido y proporcionando una base sólida para la toma de decisiones estratégicas informadas por IA.

10. CONCLUSIONES Y ESCALABILIDAD FUTURA
El éxito de este proyecto fin de curso demuestra la viabilidad de integrar soluciones de IA complejas en entornos de pequeñas empresas. Las futuras iteraciones podrían incluir la integración de análisis de voz para atención telefónica y módulos de visión artificial para control de calidad, consolidando a Pyme-Pulse AI como el aliado tecnológico definitivo para la PYME del siglo XXI.
    `.trim();

    generateProfessionalPDF(reportTitle, reportSubtitle, content, "memoria-tecnica-jose-ramon-garcia");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex justify-between items-center px-4">
        <div>
          <h3 className="text-slate-900 font-bold text-lg">Documentación del Proyecto</h3>
          <p className="text-slate-500 text-xs">Memoria Técnica Detallada (Extensión 2 Páginas PDF)</p>
        </div>
        <button 
          onClick={exportToPDF}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 transition flex items-center gap-3 shadow-xl shadow-slate-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Descargar Memoria Completa (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Generación del Informe</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Este documento se sintetiza en tiempo real mediante un motor de renderizado PDF cliente-servidor. Combina la estructura lógica definida en el código fuente con los metadatos dinámicos del sistema, garantizando un formato institucional estándar.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
            <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Propósito Académico</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Sirve como evidencia técnica de la integración de modelos generativos avanzados en una arquitectura profesional. Es ideal para la validación de competencias en IA aplicadas a la transformación digital de PYMES.
          </p>
        </div>
      </div>

      <div className="bg-white p-12 md:p-20 rounded-[40px] shadow-2xl border border-slate-100 font-serif leading-relaxed text-slate-800 animate-fadeIn relative overflow-hidden">
        <div className="text-center space-y-4 mb-16">
          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]">Proyecto fin de curso</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Pyme-Pulse AI</h1>
          <p className="text-indigo-600 font-sans font-bold text-[10px] uppercase tracking-widest mt-4">Aplicaciones prácticas de la IA en Pymes Grupo 40</p>
          <div className="h-0.5 w-12 bg-slate-200 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-[10px] font-sans uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-8">
          <div>
            <p className="font-bold text-slate-900 mb-1">Autoría del Proyecto</p>
            <p>José Ramón García Utrero</p>
          </div>
          <div className="md:text-right">
            <p className="font-bold text-slate-900 mb-1">Estado de Entrega</p>
            <p>Memoria Técnica Final Consolidada</p>
          </div>
        </div>

        <div className="space-y-12 relative text-sm md:text-base">
          <section className="space-y-4">
            <h4 className="font-sans font-bold text-slate-900 uppercase text-xs tracking-widest flex items-center gap-2">
              <span className="w-4 h-px bg-indigo-600"></span> 01. Resumen Ejecutivo
            </h4>
            <p className="text-slate-600 leading-8">
              Este documento recoge la fundamentación teórica y técnica de <strong>Pyme-Pulse AI</strong>. El informe se centra en la implementación de una arquitectura segura para el uso de Inteligencia Artificial en entornos empresariales, detallando el stack tecnológico utilizado (React, Vercel, Google Gemini) y la metodología de ingeniería de prompts aplicada para maximizar la eficacia en tareas de marketing y consultoría estratégica.
            </p>
          </section>

          <section className="space-y-4">
            <h4 className="font-sans font-bold text-slate-900 uppercase text-xs tracking-widest flex items-center gap-2">
              <span className="w-4 h-px bg-indigo-600"></span> 02. Identificación del Trabajo
            </h4>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-slate-600 text-sm leading-relaxed">
                Desarrollado íntegramente por <strong>José Ramón García Utrero</strong> para el <strong>Grupo 40</strong>, este proyecto valida la integración de modelos generativos en procesos operativos reales de una PYME. El PDF descargable incluye 10 secciones de análisis profundo sobre seguridad, arquitectura serverless e impacto en la productividad de negocio.
              </p>
            </div>
          </section>

          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center italic text-slate-400 text-sm text-center">
            "La tecnología no es un fin en sí misma, sino el medio para potenciar el talento humano y la competitividad de nuestras empresas locales."
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
