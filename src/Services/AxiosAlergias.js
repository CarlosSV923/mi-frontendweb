import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosAlergias {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static almacenar_alergias = (alergias) => {
    return AxiosAlergias.instanceAxios.post(`/almacenar_alergias`, alergias);
  }

  static almacenar_alergias_paciente = (alergias) => {
    return AxiosAlergias.instanceAxios.post(`/almacenar_alergias_paciente`, alergias);
  }

}