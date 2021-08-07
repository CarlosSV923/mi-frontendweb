import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosDiscapacidades {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static mostrar_discapacidades = () => {
    return AxiosDiscapacidades.instanceAxios.get(`/mostrar_discapacidades`);
  }

  static almacenar_discapacidades = (discapacidades) => {
    return AxiosDiscapacidades.instanceAxios.post(`/almacenar_discapacidades`, discapacidades);
  }

  static almacenar_discapacidades_pacientes = (discapacidades) => {
    return AxiosDiscapacidades.instanceAxios.post(`/almacenar_discapacidades_pacientes`, discapacidades);
  }

  static almacenar_discapacidad = (discapacidad) => {
    return AxiosDiscapacidades.instanceAxios.post(`/almacenar_discapacidad`, discapacidad);
  }

  static eliminar_discapacidad = (id_discapacidad) => {
    return AxiosDiscapacidades.instanceAxios.delete(`/eliminar_discapacidad/${id_discapacidad}`);
  }

  static obtener_discapacidad_por_id = (id) => {
    return AxiosDiscapacidades.instanceAxios.get(`/obtener_discapacidad_por_id/${id}`);
  }

  static actualizar_discapacidad = (discapacidad) => {
    return AxiosDiscapacidades.instanceAxios.post(`/actualizar_discapacidad`, discapacidad);
  }

}