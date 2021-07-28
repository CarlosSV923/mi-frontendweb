import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosSignosVitales {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static almacenar_signos_vitales_paciente = (signos_vitales) => {
    return AxiosSignosVitales.instanceAxios.post(`/almacenar_signos_vitales_paciente`, signos_vitales);
  }

}