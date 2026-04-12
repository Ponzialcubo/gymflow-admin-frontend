import jsPDF from 'jspdf';
import 'jspdf-autotable';

// 📊 EXPORTAR EXCEL (CSV)
export const exportToCSV = (movimientos) => {
  if (!movimientos || movimientos.length === 0) return alert("No hay datos para exportar");
  
  const headers = ["ID,Fecha,Concepto,Categoria,Tipo,Importe,Estado\n"];
  const rows = movimientos.map(m => {
    const concepto = m.concepto ? m.concepto.replace(/,/g, ' ') : 'Sin concepto';
    return `${m.id},${m.fecha},"${concepto}",${m.categoria},${m.tipo},${m.importe.toFixed(2)},${m.estado}`;
  });

  const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `GymFlow_Finanzas_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// 📄 EXPORTAR PDF (Versión Blindada)
export const exportToPDF = (movimientos, stats) => {
  // 1. Verificación de seguridad
  if (!movimientos || movimientos.length === 0) {
    alert("No hay movimientos registrados para generar el PDF.");
    return;
  }

  try {
    const doc = new jsPDF();
    const fechaReporte = new Date().toLocaleDateString('es-ES');

    // --- DISEÑO DE CABECERA ---
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.setFont("helvetica", "bold");
    doc.text("GYMFLOW PRO - REPORTE", 14, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Control de Caja • Sede Central • ${fechaReporte}`, 14, 28);

    // --- RECUADRO DE RESUMEN ---
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.setFillColor(248, 250, 252); // slate-50
    doc.roundedRect(14, 35, 182, 32, 3, 3, 'FD');

    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text("RESUMEN DE BALANCE", 20, 45);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    // Usamos ?. por seguridad si stats no ha cargado
    doc.setTextColor(16, 185, 129);
    doc.text(`(+) INGRESOS: ${stats?.ingresos?.toFixed(2) || '0.00'} EUR`, 20, 52);
    doc.setTextColor(239, 68, 68);
    doc.text(`(-) GASTOS: ${stats?.gastos?.toFixed(2) || '0.00'} EUR`, 20, 58);
    doc.setTextColor(37, 99, 235);
    doc.text(`(=) BENEFICIO NETO: ${stats?.neto?.toFixed(2) || '0.00'} EUR`, 20, 64);

    // --- TABLA DE MOVIMIENTOS ---
    const tableColumn = ["Fecha", "Concepto", "Categoría", "Tipo", "Importe"];
    const tableRows = movimientos.map(m => [
      m.fecha || '-',
      m.concepto || 'Sin concepto',
      m.categoria || 'General',
      (m.tipo || 'ingreso').toUpperCase(),
      `${m.tipo === 'ingreso' ? '+' : '-'}${m.importe.toFixed(2)}€`
    ]);

    // Importante: jspdf-autotable extiende el prototipo de doc
    doc.autoTable({
      startY: 75,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: { 
        fillColor: [15, 23, 42], 
        fontSize: 10, 
        fontStyle: 'bold',
        halign: 'center'
      },
      styles: { 
        fontSize: 9, 
        cellPadding: 4,
        valign: 'middle'
      },
      columnStyles: {
        4: { halign: 'right', fontStyle: 'bold' } // Importe a la derecha
      },
      alternateRowStyles: { fillColor: [249, 250, 251] }
    });

    // --- PIE DE PÁGINA ---
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Página ${i} de ${pageCount} - Generado por GymFlow CRM`, 14, doc.internal.pageSize.height - 10);
    }

    doc.save(`GymFlow_Finanzas_${fechaReporte.replace(/\//g, '-')}.pdf`);

  } catch (error) {
    console.error("Error crítico en exportToPDF:", error);
    alert("Hubo un fallo al generar el PDF. Revisa la consola del navegador.");
  }
};