import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePaymentsPDF = (subscriptions, activeTab) => {
  const doc = new jsPDF();
  const isRecibos = activeTab === 'recibos';

  // Configuración de Títulos dinámica
  const mainTitle = isRecibos ? "Historial de Cobros y Recibos" : "Reporte de Membresias Activas";
  const fileName = isRecibos ? "Cobros_GymFlow" : "Membresias_GymFlow";

  // Títulos
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); 
  doc.text(mainTitle, 14, 20);

  // Subtítulos y metadatos
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); 
  doc.text(`Generado el: ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`, 14, 28);
  doc.text(`Total de registros: ${subscriptions.length}`, 14, 33);

  // Mapeo de columnas dinámico
  const tableColumn = isRecibos 
    ? ["Socio", "Email", "Concepto de Pago", "Importe", "Estado"]
    : ["Socio", "Email", "Plan", "Precio", "Estado", "Fin Contrato"];

  // Mapeo de filas dinámico
  const tableRows = subscriptions.map(sub => {
    const row = [
      sub.usuarios?.nombre || 'Desconocido',
      sub.usuarios?.email || 'Sin email',
      sub.tipo_plan,
      `${Number(sub.precio || 0).toFixed(2)}€`,
      sub.estado.toUpperCase(),
    ];
    // Solo añadimos la fecha si NO es la pestaña de recibos
    if (!isRecibos) {
      row.push(sub.fecha_fin ? new Date(sub.fecha_fin).toLocaleDateString() : 'Indefinido');
    }
    return row;
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: 'grid',
    headStyles: { 
      fillColor: isRecibos ? [37, 99, 235] : [16, 185, 129], // Azul para recibos, verde para membresías
      textColor: 255, 
      fontSize: 9, 
      fontStyle: 'bold' 
    },
    styles: { fontSize: 8, cellPadding: 4 },
    alternateRowStyles: { fillColor: [248, 250, 252] }
  });

  doc.save(`${fileName}_${new Date().getTime()}.pdf`);
};