import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * 📊 EXPORTAR EXCEL (CSV)
 * Formato universal compatible con Excel y Google Sheets.
 */
export const exportToCSV = (movimientos) => {
  if (!movimientos || movimientos.length === 0) return alert("No hay datos para exportar");
  
  const headers = ["ID,Fecha,Concepto,Categoria,Tipo,Importe,Estado\n"];
  const rows = movimientos.map(m => {
    // Limpiamos comas para no romper las celdas del CSV
    const conceptoLimpio = m.concepto ? m.concepto.replace(/,/g, ' ') : 'Sin concepto';
    return `${m.id},${m.fecha},"${conceptoLimpio}",${m.categoria},${m.tipo},${m.importe.toFixed(2)},${m.estado}`;
  });

  const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `GymFlow_Finanzas_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * 📄 EXPORTAR PDF PROFESIONAL (Versión Corregida y Estilizada)
 */
export const exportToPDF = (movimientos, stats) => {
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
    doc.text("GYMFLOW PRO", 14, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text("REPORTE FINANCIERO OPERATIVO", 14, 27);
    doc.text(`Sede Central • Generado el ${fechaReporte}`, 14, 33);

    // --- RECUADRO DE RESUMEN (KPIs) ---
    // Fondo gris claro para el balance
    doc.setDrawColor(241, 245, 249);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, 40, 182, 35, 4, 4, 'FD');

    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text("RESUMEN DE BALANCE", 20, 50);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    // Ingresos
    doc.setTextColor(16, 185, 129); // emerald-500
    doc.text(`(+) INGRESOS TOTALES:`, 20, 58);
    doc.text(`${stats?.ingresos?.toLocaleString('es-ES', { minimumFractionDigits: 2 })} EUR`, 70, 58);
    
    // Gastos
    doc.setTextColor(225, 29, 72); // rose-600
    doc.text(`(-) GASTOS TOTALES:`, 20, 64);
    doc.text(`${stats?.gastos?.toLocaleString('es-ES', { minimumFractionDigits: 2 })} EUR`, 70, 64);
    
    // Neto
    doc.setTextColor(37, 99, 235); // blue-600
    doc.setFont("helvetica", "bold");
    doc.text(`(=) BALANCE NETO:`, 20, 71);
    doc.text(`${stats?.neto?.toLocaleString('es-ES', { minimumFractionDigits: 2 })} EUR`, 70, 71);

    // --- TABLA DE MOVIMIENTOS ---
    const tableColumn = ["ID", "Fecha", "Concepto", "Categoría", "Importe"];
    const tableRows = movimientos.map(m => [
      m.id,
      m.fecha,
      m.concepto,
      m.categoria,
      { 
        content: `${m.tipo === 'ingreso' ? '+' : '-'}${m.importe.toFixed(2)}€`, 
        styles: { 
            fontStyle: 'bold', 
            textColor: m.tipo === 'ingreso' ? [16, 185, 129] : [15, 23, 42],
            halign: 'right' 
        } 
      }
    ]);

    autoTable(doc, {
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
        valign: 'middle',
        font: 'helvetica'
      },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      margin: { top: 20 },
      columnStyles: {
        4: { cellWidth: 35 } // Columna de importe un poco más ancha
      }
    });

    // --- PIE DE PÁGINA ---
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(
        `Documento oficial de GymFlow CRM - Página ${i} de ${pageCount}`, 
        doc.internal.pageSize.width / 2, 
        doc.internal.pageSize.height - 10, 
        { align: 'center' }
      );
    }

    doc.save(`Reporte_Finanzas_GymFlow_${fechaReporte.replace(/\//g, '-')}.pdf`);

  } catch (error) {
    console.error("Error crítico en exportToPDF:", error);
    alert("Hubo un fallo al generar el PDF. Revisa la consola para más detalles.");
  }
};