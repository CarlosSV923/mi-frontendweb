import axios from 'axios';
import VariableGlobal from './VariableGlobal';
export default class AxiosMedicamentos {
  static instanceAxios = axios.create({
    baseURL: VariableGlobal.baseURL,
  });

  static mostrar_medicamentos = () => {
    return AxiosMedicamentos.instanceAxios.get(`/mostrar_medicamentos`);
  }

  static almacenar_medicamentos_cita_paciente = (informacion_medicamentos) => {
    return AxiosMedicamentos.instanceAxios.post(`/almacenar_medicamentos_cita_paciente`, informacion_medicamentos);
  }

}