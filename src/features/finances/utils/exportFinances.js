import jsPDF from 'jspdf';
import 'jspdf-autotable';

// 📊 FUNCIÓN 1: Exportar a Excel (CSV)
export const exportToCSV = (movimientos) => {
  // 1. Cabeceras de las columnas
  const headers = ["ID,Fecha,Concepto,Categoria,Tipo,Importe,Estado\n"];
  
  // 2. Filas de datos
  const rows = movimientos.map(m => 
    `${m.id},${m.fecha},"${m.concepto}",${m.categoria},${m.tipo},${m.importe},${m.estado}`
  );
  
  // 3. Crear y descargar el archivo
  const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `GymFlow_Finanzas_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 📄 FUNCIÓN 2: Exportar a PDF Profesional
export const exportToPDF = (movimientos, stats) => {
  const doc = new jsPDF();

  // --- Cabecera del Documento ---
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // Color texto oscuro (Tailwind slate-800)
  doc.text("Reporte Financiero", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // Gris (Tailwind slate-500)
  doc.text("Sede Central - Gestión Pro", 14, 28);
  doc.text(`Fecha de emisión: ${new Date().toLocaleDateString('es-ES')}`, 14, 34);

  // --- KPIs / Resumen ---
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text("Resumen de Caja:", 14, 45);

  doc.setFontSize(10);
  doc.setTextColor(16, 185, 129); // Verde Esmeralda
  doc.text(`+ Ingresos Totales: ${stats.ingresos.toFixed(2)} EUR`, 14, 52);
  
  doc.setTextColor(239, 68, 68); // Rojo
  doc.text(`- Gastos Operativos: ${stats.gastos.toFixed(2)} EUR`, 14, 58);
  
  doc.setTextColor(37, 99, 235); // Azul
  doc.setFont(undefined, 'bold');
  doc.text(`= Balance Neto: ${stats.neto.toFixed(2)} EUR`, 14, 66);
  doc.setFont(undefined, 'normal');

  // --- Preparar datos para la Tabla ---
  const tableColumn = ["ID", "Fecha", "Concepto", "Categoría", "Importe"];
  const tableRows = [];

  movimientos.forEach(mov => {
    const rowData = [
      mov.id,
      mov.fecha,
      mov.concepto,
      mov.categoria,
      `${mov.tipo === 'ingreso' ? '+' : '-'}${mov.importe.toFixed(2)} EUR`
    ];
    tableRows.push(rowData);
  });

  // --- Generar la Tabla Automática ---
  doc.autoTable({
    startY: 75,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] }, // Azul GymFlow
    alternateRowStyles: { fillColor: [248, 250, 252] }, // Gris súper clarito
    styles: { fontSize: 9 },
  });

  // --- Descargar el archivo ---
  doc.save(`GymFlow_Reporte_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.pdf`);
};