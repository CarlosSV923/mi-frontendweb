import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosMedicamentos {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static mostrar_medicamentos = () => {
    return AxiosMedicamentos.instanceAxios.get(`/mostrar_medicamentos`);
  }

}