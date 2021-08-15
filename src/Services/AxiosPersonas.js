import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosPersonas {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static getPacientesFilter = (filtro) => {
        return AxiosPersonas.instanceAxios.post(`/getPacientesFilter`, filtro);
    }

    static getPacientesCuidadorFilter = (filtro) => {
        return AxiosPersonas.instanceAxios.post(`/getPacientesCuidadorFilter`, filtro);
    }

    static getMedicosFilter = (filtro) => {
        return AxiosPersonas.instanceAxios.post(`/getMedicosFilter`, filtro);
    }

    static savePacienteAsociadoCuidador = (reg) => {
        return AxiosPersonas.instanceAxios.post(`/savePacienteAsociadoCuidador`, reg);
    }

    static deletePacienteAsociadoCuidador = (reg) => {
        return AxiosPersonas.instanceAxios.post(`/deletePacienteAsociadoCuidador`, reg);
    }
}