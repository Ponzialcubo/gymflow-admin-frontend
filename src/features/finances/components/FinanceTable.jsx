import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Exportar CSV (Excel)
export const exportToCSV = (movimientos) => {
  const headers = ["ID,Fecha,Concepto,Categoria,Tipo,Importe,Estado\n"];
  const rows = movimientos.map(m => `${m.id},${m.fecha},"${m.concepto}",${m.categoria},${m.tipo},${m.importe},${m.estado}`);
  const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Reporte_Finanzas_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.csv`;
  link.click();
};

// Exportar PDF Profesional
export const exportToPDF = (movimientos, stats) => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text("Reporte Financiero GymFlow", 14, 20);

  // Subtítulo
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Generado el: ${new Date().toLocaleDateString('es-ES')}`, 14, 28);

  // Resumen / KPIs
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text("Resumen de Caja:", 14, 42);

  doc.setFontSize(10);
  doc.setTextColor(16, 185, 129); // Verde
  doc.text(`(+) Ingresos: ${stats.ingresos.toFixed(2)} EUR`, 14, 49);
  
  doc.setTextColor(239, 68, 68); // Rojo
  doc.text(`(-) Gastos: ${stats.gastos.toFixed(2)} EUR`, 14, 55);
  
  doc.setTextColor(37, 99, 235); // Azul
  doc.setFont("helvetica", "bold");
  doc.text(`(=) Balance Neto: ${stats.neto.toFixed(2)} EUR`, 14, 63);
  doc.setFont("helvetica", "normal");

  // Tabla
  const tableColumn = ["Fecha", "Concepto", "Categoría", "Importe", "Estado"];
  const tableRows = movimientos.map(mov => [
    mov.fecha,
    mov.concepto,
    mov.categoria,
    `${mov.tipo === 'ingreso' ? '+' : '-'}${mov.importe.toFixed(2)} EUR`,
    mov.estado
  ]);

  doc.autoTable({
    startY: 75,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42] }, // slate-900 oscuro para la cabecera
    styles: { fontSize: 9, cellPadding: 3 },
    alternateRowStyles: { fillColor: [248, 250, 252] }, // slate-50
  });

  doc.save(`GymFlow_Reporte_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.pdf`);
};