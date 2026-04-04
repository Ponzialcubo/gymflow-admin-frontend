import { useState, useEffect, useCallback } from 'react';
import { supabase } from "../../../config/supabase";

export const usePayments = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Inicializamos con el plan 'Basic' como defecto para que cuadre con el modal
  const [newSub, setNewSub] = useState({
    id_usuario: '',
    tipo_plan: 'Basic',
    precio: 19.99,
    estado: 'activo'
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      const [resSubs, resUsers] = await Promise.all([
        supabase
          .from('suscripciones')
          .select('id, tipo_plan, estado, fecha_inicio, fecha_fin, precio, usuarios(nombre, email)')
          .order('fecha_inicio', { ascending: false }),
        supabase
          .from('usuarios')
          .select('id, nombre, email')
          .eq('rol', 'socio')
          .eq('activo', true)
      ]);

      if (resSubs.error) throw resSubs.error;
      if (resUsers.error) throw resUsers.error;

      setSubscriptions(resSubs.data);
      setUsers(resUsers.data);
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
      // 1. REGLA DE NEGOCIO: Desactivar cualquier suscripción previa del usuario
      const { error: updateError } = await supabase
        .from('suscripciones')
        .update({ estado: 'cancelado' })
        .eq('id_usuario', newSub.id_usuario)
        .eq('estado', 'activo'); // Solo cancelamos las que estuvieran activas

      if (updateError) {
         console.warn("No se pudo actualizar el estado previo o no existía:", updateError);
         // No lanzamos error aquí para permitir que el flujo continúe si es un socio nuevo
      }

      // 2. Calculamos la fecha de expiración (1 mes por defecto)
      let fechaExpiracion = new Date();
      fechaExpiracion.setMonth(fechaExpiracion.getMonth() + 1);
      
      // 3. Insertamos la nueva suscripción
      const { error: insertError } = await supabase
        .from('suscripciones')
        .insert([{ 
            id_usuario: newSub.id_usuario, 
            tipo_plan: newSub.tipo_plan, 
            fecha_fin: fechaExpiracion.toISOString(), 
            precio: parseFloat(newSub.precio), // Forzamos que sea un número
            estado: 'activo' 
        }]);

      if (insertError) throw insertError;

      // 4. Limpieza y recarga
      setIsModalOpen(false);
      setNewSub({ id_usuario: '', tipo_plan: 'Basic', precio: 19.99, estado: 'activo' });
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