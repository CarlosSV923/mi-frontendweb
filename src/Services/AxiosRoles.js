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


}