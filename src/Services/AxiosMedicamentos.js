import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosMedicamentos {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static mostrar_medicamentos = () => {
    return AxiosMedicamentos.instanceAxios.get(`/mostrar_medicamentos`);
  }

  static almacenar_medicamentos_cita_paciente = (informacion_medicamentos) => {
    return AxiosMedicamentos.instanceAxios.post(`/almacenar_medicamentos_cita_paciente`, informacion_medicamentos);
  }

  static almacenar_medicamento = (medicamento) => {
    return AxiosMedicamentos.instanceAxios.post(`/almacenar_medicamento`, medicamento);
  }

  static eliminar_medicamento = (id_medicamento) => {
    return AxiosMedicamentos.instanceAxios.delete(`/eliminar_medicamento/${id_medicamento}`);
  }

  static obtener_medicamento_por_id = (id) => {
    return AxiosMedicamentos.instanceAxios.get(`/obtener_medicamento_por_id/${id}`);
  }

  static actualizar_medicamento = (medicamento) => {
    return AxiosMedicamentos.instanceAxios.post(`/actualizar_medicamento`, medicamento);
  }

}