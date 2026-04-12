import { useState, useEffect, useCallback } from 'react';
import { supabase } from "../../../config/supabase";

export const usePayments = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Guardamos las tarifas en memoria por si cambian de plan
  const [tarifas, setTarifas] = useState({ Basic: 19.99, Estándar: 29.99, Pro: 39.99 });

  const [newSub, setNewSub] = useState({
    id_usuario: '',
    tipo_plan: 'Basic',
    precio: 19.99, // Se sobrescribirá enseguida con el de la BBDD
    estado: 'activo'
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Hacemos 3 consultas a la vez para máxima velocidad
      const [resSubs, resUsers, resSettings] = await Promise.all([
        supabase
          .from('suscripciones')
          .select('id, tipo_plan, estado, fecha_inicio, fecha_fin, precio, usuarios(nombre, email)')
          .order('fecha_inicio', { ascending: false }),
        
        supabase
          .from('usuarios')
          .select('id, nombre, email')
          .eq('rol', 'socio'), // ⚠️ ARREGLADO: Quitamos eq('activo', true) para que salgan todos
          
        supabase
          .from('gym_settings')
          .select('precio_basic, precio_estandar, precio_pro')
          .eq('id', 1)
          .single()
      ]);

      if (resSubs.error) throw resSubs.error;
      if (resUsers.error) throw resUsers.error;

      setSubscriptions(resSubs.data);
      setUsers(resUsers.data);

      // Si la BBDD nos devuelve las tarifas, las aplicamos
      if (resSettings.data) {
        const bdTarifas = {
          Basic: resSettings.data.precio_basic,
          Estándar: resSettings.data.precio_estandar,
          Pro: resSettings.data.precio_pro
        };
        setTarifas(bdTarifas);
        
        // Actualizamos el precio del formulario para que sea el oficial
        setNewSub(prev => ({ ...prev, precio: bdTarifas.Basic }));
      }

    } catch (err) {
      console.error("Error cargando datos de Supabase:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddSubscription = async (e) => {
    e.preventDefault();
    try {
      // 1. REGLA DE NEGOCIO: Desactivar previa
      const { error: updateError } = await supabase
        .from('suscripciones')
        .update({ estado: 'cancelado' })
        .eq('id_usuario', newSub.id_usuario)
        .eq('estado', 'activo'); 

      if (updateError) console.warn("Aviso:", updateError);

      // 2. Calculamos expiración
      let fechaExpiracion = new Date();
      fechaExpiracion.setMonth(fechaExpiracion.getMonth() + 1);
      
      // 3. Insertamos la nueva suscripción
      const { error: insertError } = await supabase
        .from('suscripciones')
        .insert([{ 
            id_usuario: newSub.id_usuario, 
            tipo_plan: newSub.tipo_plan, 
            fecha_fin: fechaExpiracion.toISOString(), 
            precio: parseFloat(newSub.precio), 
            estado: 'activo' 
        }]);

      if (insertError) throw insertError;

      // Al dar de alta una suscripción, generamos automáticamente el recibo
      const { error: pagoError } = await supabase
        .from('pagos')
        .insert([{
            id_usuario: newSub.id_usuario,
            monto: parseFloat(newSub.precio),
            concepto: `Mensualidad Plan ${newSub.tipo_plan}`,
            metodo_pago: 'Tarjeta / Recepción', // O el método que suelas usar
            estado: 'completado'
        }]);

      if (pagoError) console.error("Error al registrar el recibo de pago:", pagoError);

      // 4. Limpiamos.
      setIsModalOpen(false);
      setNewSub({ id_usuario: '', tipo_plan: 'Basic', precio: tarifas.Basic, estado: 'activo' });
      fetchData(); 
      
    } catch (err) {
      console.error(err);
      alert("Error al procesar la suscripción: " + err.message);
    }
  };

  return {
    subscriptions, users, loading, isModalOpen, setIsModalOpen,
    newSub, setNewSub, handleAddSubscription, refresh: fetchData
  };
};