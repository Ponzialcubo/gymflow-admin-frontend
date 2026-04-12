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
      setLoading(true);

      // 1. BUSCAR SUSCRIPCIÓN ACTIVA ACTUAL
      const { data: subActual, error: errorSub } = await supabase
        .from('suscripciones')
        .select('*')
        .eq('id_usuario', newSub.id_usuario)
        .eq('estado', 'activo')
        .maybeSingle();

      let descuentoProrrateo = 0;

      if (subActual) {
        const hoy = new Date();
        const finContrato = new Date(subActual.fecha_fin);
        
        // Calculamos cuántos días le quedaban de su plan viejo
        const milisegundosRestantes = finContrato - hoy;
        const diasRestantes = Math.max(0, Math.ceil(milisegundosRestantes / (1000 * 60 * 60 * 24)));

        if (diasRestantes > 0) {
          descuentoProrrateo = (subActual.precio / 30) * diasRestantes;
        }

        // Cancelamos la anterior
        await supabase
          .from('suscripciones')
          .update({ estado: 'cancelado', fecha_fin: hoy.toISOString() })
          .eq('id', subActual.id);
      }

      // 2. CALCULAR PRECIO FINAL
      const precioNuevoPlan = parseFloat(newSub.precio);
      const importeAPagar = Math.max(0, precioNuevoPlan - descuentoProrrateo);

      // 3. INSERTAR LA NUEVA SUSCRIPCIÓN (Acceso actual)
      let fechaExpiracion = new Date();
      fechaExpiracion.setMonth(fechaExpiracion.getMonth() + 1);

      const { error: insertError } = await supabase
        .from('suscripciones')
        .insert([{ 
            id_usuario: newSub.id_usuario, 
            tipo_plan: newSub.tipo_plan, 
            fecha_fin: fechaExpiracion.toISOString(), 
            precio: precioNuevoPlan, 
            estado: 'activo' 
        }]);

      if (insertError) throw insertError;

      // 4. REGISTRAR EL RECIBO DE PAGO (Historial)
      await supabase
        .from('suscripciones')
        .insert([{
            id_usuario: newSub.id_usuario,
            tipo_plan: subActual 
              ? `AJUSTE: ${subActual.tipo_plan} -> ${newSub.tipo_plan}` 
              : `ALTA: Plan ${newSub.tipo_plan}`,
            precio: importeAPagar, 
            estado: 'recibo_generado', 
            fecha_inicio: new Date().toISOString()
        }]);

      // --- 📢 AQUÍ ESTÁ LA LÓGICA DEL MENSAJE INTELIGENTE ---
      const mensajeExito = subActual 
        ? `Cambio realizado. Se ha aplicado un descuento de ${descuentoProrrateo.toFixed(2)}€ por los días no disfrutados.`
        : `¡Nueva suscripción activada! El socio ya tiene acceso al plan ${newSub.tipo_plan}.`;

      setIsModalOpen(false);
      fetchData();
      alert(mensajeExito); // Lanzamos el mensaje correspondiente
      // -------------------------------------------------------

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    subscriptions, users, loading, isModalOpen, setIsModalOpen,
    newSub, setNewSub, handleAddSubscription, refresh: fetchData
  };
};