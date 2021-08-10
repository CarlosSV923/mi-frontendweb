import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosRoles {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static almacenar_rol = (rol) => {
    return AxiosRoles.instanceAxios.post(`/almacenar_rol`, rol);
  }

  static mostrar_roles = () => {
    return AxiosRoles.instanceAxios.get(`/mostrar_roles`);
  }

  static almacenar_usuario = (usuario) => {
    return AxiosRoles.instanceAxios.post(`/almacenar_usuario`, usuario);
  }

  static eliminar_rol = (id_rol) => {
    return AxiosRoles.instanceAxios.delete(`/eliminar_rol/${id_rol}`);
  }

  static obtener_rol_por_id = (id_rol) => {
    return AxiosRoles.instanceAxios.get(`/obtener_rol_por_id/${id_rol}`);;
  }

  static actualizar_rol = (rol) => {
    return AxiosRoles.instanceAxios.post(`/actualizar_rol`, rol);
  }

}