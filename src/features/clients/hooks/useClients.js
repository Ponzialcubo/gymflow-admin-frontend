import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useClients = () => {
  const [socios, setSocios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSocioId, setSelectedSocioId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newSocio, setNewSocio] = useState({ nombre: '', email: '', password: '123' });

  useEffect(() => {
    fetchSocios();
  }, []);

  const fetchSocios = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/usuarios`);
      setSocios(res.data);
    } catch (err) {
      console.error("Error al cargar socios:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSocio = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/usuarios`, newSocio);
      setIsModalOpen(false);
      setNewSocio({ nombre: '', email: '', password: '123' });
      fetchSocios();
    } catch (err) {
      alert("Error: El email ya está registrado o el servidor no responde.");
    }
  };

  const sociosFiltrados = useMemo(() => {
    return socios.filter(s => 
      s.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
      s.email.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [socios, busqueda]);

  return {
    sociosFiltrados,
    busqueda,
    setBusqueda,
    isModalOpen,
    setIsModalOpen,
    selectedSocioId,
    setSelectedSocioId,
    loading,
    newSocio,
    setNewSocio,
    handleAddSocio,
    fetchSocios
  };
};