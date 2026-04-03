import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../../config/supabase'; // Asegúrate de que los '../' sean correctos según tu carpeta

export const useClients = () => {
  const [socios, setSocios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSocioId, setSelectedSocioId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Nota de tutor: En el futuro, la contraseña por defecto "123" la quitaremos 
  // cuando integremos Supabase Auth de verdad, pero para salir del paso está bien.
  const [newSocio, setNewSocio] = useState({ nombre: '', email: '', password: '123' });

  useEffect(() => {
    fetchSocios();
  }, []);

  const fetchSocios = async () => {
    try {
      setLoading(true);
      // Petición directa a Supabase (equivale a tu app.get de Node)
      const { data, error } = await supabase
        .from('usuarios')
        .select('id, nombre, email, rol, fecha_registro, activo')
        .eq('rol', 'socio')
        .eq('activo', true);

      if (error) throw error;
      setSocios(data || []);
    } catch (err) {
      console.error("Error al cargar socios:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSocio = async (e) => {
    e.preventDefault();
    try {
      // Inserción directa en Supabase (equivale a tu app.post de Node)
      const { error } = await supabase
        .from('usuarios')
        .insert([{ 
            nombre: newSocio.nombre, 
            email: newSocio.email, 
            password: newSocio.password, 
            rol: 'socio', 
            activo: true 
        }]);

      if (error) throw error;

      setIsModalOpen(false);
      setNewSocio({ nombre: '', email: '', password: '123' });
      fetchSocios(); // Recargamos la lista
    } catch (err) {
      console.error(err);
      alert("Error: El email ya está registrado o hay un problema con la base de datos.");
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