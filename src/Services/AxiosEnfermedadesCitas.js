import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosEnfermedadesCitas {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static almacenar_enfermedades_cita_paciente = (enfermedades) => {
    return AxiosEnfermedadesCitas.instanceAxios.post(`/almacenar_enfermedades_cita_paciente`, enfermedades);
  }

}