import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosSeguimientos2 {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static crear_seguimiento = (info) => {
    return AxiosSeguimientos2.instanceAxios.post(`/crear_seguimiento`, info);
  }

}