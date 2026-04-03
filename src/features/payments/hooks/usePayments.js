import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const usePayments = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]); // Necesario para asignar nuevas suscripciones
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
      const [resSubs, resUsers] = await Promise.all([
        axios.get(`${API_URL}/suscripciones`),
        axios.get(`${API_URL}/usuarios`)
      ]);
      setSubscriptions(resSubs.data);
      setUsers(resUsers.data);
    } catch (err) {
      console.error("Error en pasarela de pagos:", err);
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
      await axios.post(`${API_URL}/suscripciones`, newSub);
      setIsModalOpen(false);
      setNewSub({ id_usuario: '', tipo_plan: 'Mensual', precio: 50, estado: 'activo' });
      fetchData();
    } catch (err) {
      alert("Error al procesar la suscripción");
    }
  };

  return {
    subscriptions, users, loading, isModalOpen, setIsModalOpen,
    newSub, setNewSub, handleAddSubscription, refresh: fetchData
  };
};