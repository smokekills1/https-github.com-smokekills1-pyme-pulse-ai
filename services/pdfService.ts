
import { jsPDF } from 'jspdf';

/**
 * Genera un documento PDF con estética corporativa profesional, minimalista y limpia.
 */
export const generateProfessionalPDF = (title: string, subtitle: string, content: string, filename: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString('es-ES');
  const pageHeight = doc.internal.pageSize.height;
  
  // Encabezado Clásico (Minimalista y Limpio)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text("PYME-Pulse AI", 20, 30);
  
  doc.setDrawColor(79, 70, 229); // Indigo-600
  doc.setLineWidth(1);
  doc.line(20, 35, 50, 35); // Línea de acento sutil

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text("SISTEMAS DE INTELIGENCIA DE NEGOCIO", 20, 42);
  
  // Datos alineados a la derecha
  doc.text(`FECHA DE EMISIÓN: ${date}`, 190, 30, { align: 'right' });
  doc.text(`ID-DOCUMENTO: ${Math.random().toString(36).substr(2, 6).toUpperCase()}`, 190, 35, { align: 'right' });

  // Separador principal sutil
  doc.setDrawColor(241, 245, 249); // Slate-100
  doc.setLineWidth(0.2);
  doc.line(20, 50, 190, 50);

  // Títulos de sección del informe
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(title, 20, 65);
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 116, 139);
  doc.text(subtitle, 20, 72);

  // Cuerpo del informe con tipografía optimizada
  doc.setTextColor(51, 65, 85); // Slate-700
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
  const splitText = doc.splitTextToSize(content, 170);
  let cursorY = 85;
  const margin = 20;
  const lineHeight = 7.5; // Interlineado profesional

  splitText.forEach((line: string) => {
    // Detectar si la línea es un encabezado numérico (ej: "1. TÍTULO")
    const isHeader = /^\d+\./.test(line.trim());
    
    // Gestión de salto de página
    if (cursorY > pageHeight - 30) {
      doc.addPage();
      cursorY = 30;
      // Pequeño indicador de página en el nuevo encabezado
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text("PYME-Pulse AI | Continuación del Informe Técnico", 20, 20);
      doc.line(20, 22, 190, 22);
      doc.setFontSize(10);
    }

    if (isHeader) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      cursorY += 4; // Espacio extra antes de secciones
    } else {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
    }

    doc.text(line, margin, cursorY);
    cursorY += lineHeight;
  });

  // Pie de página con numeración y fecha de generación clara
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    // Incluir la fecha de generación de forma clara en el pie de página
    doc.text(`Informe emitido el ${date} | Página ${i} de ${totalPages} | Proyecto Fin de Curso`, 20, pageHeight - 15);
    doc.text("Generado por el Motor de Inteligencia de Negocio PYME-Pulse AI", 190, pageHeight - 15, { align: 'right' });
  }
  
  doc.save(`${filename}.pdf`);
};
