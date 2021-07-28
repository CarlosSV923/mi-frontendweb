import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosEnfermedadesPersistentes {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static almacenar_enfermedades_persistentes_paciente = (enfermedades) => {
    return AxiosEnfermedadesPersistentes.instanceAxios.post(`/almacenar_enfermedades_persistentes_paciente`, enfermedades);
  }

}