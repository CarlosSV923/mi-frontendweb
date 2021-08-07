import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosEnfermedades {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static mostrar_enfermedades = () => {
    return AxiosEnfermedades.instanceAxios.get(`/mostrar_enfermedades`);
  }

  static mostrar_enfermedades_paginado = (size, pageNumber) => {
    return AxiosEnfermedades.instanceAxios.get(`/mostrar_enfermedades_paginado/${size}?page=${pageNumber}`);
  }

  static eliminar_enfermedad = (id_enfermedad) => {
    return AxiosEnfermedades.instanceAxios.delete(`/eliminar_enfermedad/${id_enfermedad}`);
  }

  static almacenar_enfermedad = (enfermedad) => {
    return AxiosEnfermedades.instanceAxios.post(`/almacenar_enfermedad`, enfermedad);
  }

  static obtener_enfermedad_por_id = (id) => {
    return AxiosEnfermedades.instanceAxios.get(`/obtener_enfermedad_por_id/${id}`);
  }

  static actualizar_enfermedad = (enfermedad) => {
    return AxiosEnfermedades.instanceAxios.post(`/actualizar_enfermedad`, enfermedad);
  }

}