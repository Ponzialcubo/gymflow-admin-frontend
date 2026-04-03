import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const useNutrition = () => {
  const [socios, setSocios] = useState([]);
  const [recientes, setRecientes] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({ 
    id_usuario: '', 
    nombre_dieta: 'Mantenimiento Base', 
    calorias_objetivo: 2500, 
    proteinas: 150, 
    carbohidratos: 250, 
    grasas: 70 
  });

  useEffect(() => {
    const fetchSocios = async () => {
      try {
        const res = await axios.get(`${API_URL}/usuarios`);
        setSocios(res.data);
        if(res.data.length > 0) setForm(f => ({...f, id_usuario: res.data[0].id}));
      } catch (err) {
        setMensaje({ texto: '❌ Error al conectar con el servidor', tipo: 'error' });
      }
    };
    fetchSocios();
  }, []);

  // Lógica de Negocio: Cálculo de Coherencia
  const kcalCalculadas = useMemo(() => {
    return (form.proteinas * 4) + (form.carbohidratos * 4) + (form.grasas * 9);
  }, [form.proteinas, form.carbohidratos, form.grasas]);

  const diferenciaKcal = Math.abs(kcalCalculadas - form.calorias_objetivo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/dietas`, form);
      
      const nombreSocio = socios.find(s => s.id == form.id_usuario)?.nombre;
      setRecientes(prev => [{
        id: Date.now(),
        socio: nombreSocio,
        plan: form.nombre_dieta,
        kcal: form.calorias_objetivo
      }, ...prev].slice(0, 3));

      setMensaje({ texto: '✅ Plan nutricional sincronizado', tipo: 'success' });
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 4000);
    } catch (err) {
      setMensaje({ texto: '❌ Error al guardar el plan', tipo: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return {
    socios, form, setForm, recientes, mensaje, loading,
    kcalCalculadas, diferenciaKcal, handleSubmit
  };
};