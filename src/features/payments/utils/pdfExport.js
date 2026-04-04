import jsPDF from 'jspdf';
// 1. CAMBIAMOS LA FORMA DE IMPORTAR LA TABLA
import autoTable from 'jspdf-autotable';

export const generatePaymentsPDF = (subscriptions) => {
  const doc = new jsPDF();

  // Títulos
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); 
  doc.text("Reporte de Membresias", 14, 20);

  // Subtítulos y metadatos
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); 
  doc.text(`Generado el: ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`, 14, 28);
  doc.text(`Total de registros: ${subscriptions.length}`, 14, 33);

  // Mapeo de datos para la tabla
  const tableColumn = ["Socio", "Email", "Plan", "Precio", "Estado", "Fin Contrato"];
  const tableRows = subscriptions.map(sub => [
    sub.usuarios?.nombre || 'Desconocido',
    sub.usuarios?.email || 'Sin email',
    sub.tipo_plan,
    `${Number(sub.precio || 0).toFixed(2)}€`,
    sub.estado.toUpperCase(),
    sub.fecha_fin ? new Date(sub.fecha_fin).toLocaleDateString() : 'Indefinido'
  ]);

  // 2. CAMBIAMOS LA FORMA DE LLAMAR A LA TABLA (autoTable en lugar de doc.autoTable)
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 9, fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 4 },
    alternateRowStyles: { fillColor: [248, 250, 252] }
  });

  // Descargar
  doc.save(`GymFlow_Membresias_${new Date().getTime()}.pdf`);
};