import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosEnfermedades {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static mostrar_enfermedades = () => {
    return AxiosEnfermedades.instanceAxios.get(`/mostrar_enfermedades`);
  }

}