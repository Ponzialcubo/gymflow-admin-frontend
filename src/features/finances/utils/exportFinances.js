import jsPDF from 'jspdf';
import 'jspdf-autotable';

// 📊 Exportar CSV (Excel) - Formato compatible y limpio
export const exportToCSV = (movimientos) => {
  const headers = ["ID,Fecha,Concepto,Categoria,Tipo,Importe,Estado\n"];
  const rows = movimientos.map(m => 
    `${m.id},${m.fecha},"${m.concepto}",${m.categoria},${m.tipo},${m.importe.toFixed(2)},${m.estado}`
  );
  
  const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `GymFlow_Excel_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// 📄 Exportar PDF Profesional - Diseño Mejorado
export const exportToPDF = (movimientos, stats) => {
  const doc = new jsPDF();
  const fechaHoy = new Date().toLocaleDateString('es-ES');

  // --- CABECERA ESTILO PREMIUM ---
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont("helvetica", "bold");
  doc.text("GymFlow Pro - Finanzas", 14, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text("Sede Central • Reporte Operativo de Caja", 14, 28);
  doc.text(`Generado el: ${fechaHoy}`, 14, 34);

  // --- BLOQUE DE RESUMEN (KPIs) ---
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.line(14, 40, 196, 40); // Línea divisoria

  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text("Resumen General del Periodo:", 14, 50);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  
  // Ingresos
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text(`(+) TOTAL INGRESOS: ${stats.ingresos.toLocaleString('es-ES', { minimumFractionDigits: 2 })} EUR`, 14, 58);
  
  // Gastos
  doc.setTextColor(239, 68, 68); // red-500
  doc.text(`(-) TOTAL GASTOS: ${stats.gastos.toLocaleString('es-ES', { minimumFractionDigits: 2 })} EUR`, 14, 65);
  
  // Neto
  doc.setTextColor(37, 99, 235); // blue-600
  doc.setFont("helvetica", "bold");
  doc.text(`(=) BALANCE NETO: ${stats.neto.toLocaleString('es-ES', { minimumFractionDigits: 2 })} EUR`, 14, 75);

  // --- TABLA DE MOVIMIENTOS ---
  const tableColumn = ["ID", "Fecha", "Concepto", "Categoría", "Importe"];
  const tableRows = movimientos.map(mov => [
    mov.id,
    mov.fecha,
    mov.concepto,
    mov.categoria,
    { 
      content: `${mov.tipo === 'ingreso' ? '+' : '-'}${mov.importe.toFixed(2)}€`, 
      styles: { fontStyle: 'bold', textColor: mov.tipo === 'ingreso' ? [16, 185, 129] : [15, 23, 42] } 
    }
  ]);

  doc.autoTable({
    startY: 85,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { 
      fillColor: [15, 23, 42], 
      fontSize: 10, 
      fontStyle: 'bold', 
      halign: 'left' 
    },
    styles: { 
      fontSize: 9, 
      cellPadding: 4,
      valign: 'middle'
    },
    columnStyles: {
      4: { halign: 'right' } // Importe alineado a la derecha
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { top: 20 }
  });

  // --- PIE DE PÁGINA ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Página ${i} de ${pageCount} - GymFlow Software de Gestión`, 14, doc.internal.pageSize.height - 10);
  }

  // Guardar archivo
  doc.save(`GymFlow_Reporte_${fechaHoy.replace(/\//g, '-')}.pdf`);
};