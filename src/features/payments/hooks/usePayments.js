import { useState, useEffect, useCallback } from 'react';
import { supabase } from "../../../config/supabase";
export const usePayments = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newSub, setNewSub] = useState({
    id_usuario: '',
    tipo_plan: 'Mensual',
    precio: 50,
    estado: 'activo'
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Llamadas directas a Supabase
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
      // Calculamos la fecha de expiración (1 mes por defecto, igual que en tu Node)
      let fechaExpiracion = new Date();
      fechaExpiracion.setMonth(fechaExpiracion.getMonth() + 1);
      
      const { error } = await supabase
        .from('suscripciones')
        .insert([{ 
            id_usuario: newSub.id_usuario, 
            tipo_plan: newSub.tipo_plan, 
            fecha_fin: fechaExpiracion.toISOString(), 
            precio: newSub.precio, 
            estado: 'activo' 
        }]);

      if (error) throw error;

      setIsModalOpen(false);
      setNewSub({ id_usuario: '', tipo_plan: 'Mensual', precio: 50, estado: 'activo' });
      fetchData(); // Recargamos la tabla
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