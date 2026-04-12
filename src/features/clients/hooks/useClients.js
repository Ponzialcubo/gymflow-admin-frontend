import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../../config/supabase';

export const useClients = () => {
  const [socios, setSocios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSocioId, setSelectedSocioId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSocios();
  }, []);

  const fetchSocios = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('usuarios')
        .select('id, nombre, email, rol, fecha_registro, activo')
        .eq('rol', 'socio')
        .eq('activo', true); // ¡Perfecto! Así los dados de baja no salen en la lista

      if (error) throw error;
      setSocios(data || []);
    } catch (err) {
      console.error("Error al cargar socios:", err.message);
    } finally {
      setLoading(false);
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
    fetchSocios
  };
};