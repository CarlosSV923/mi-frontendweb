import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosDiscapacidades {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static mostrar_discapacidades = () => {
    return AxiosDiscapacidades.instanceAxios.get(`/mostrar_discapacidades`);
  }

}