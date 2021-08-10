import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosSeguimientos {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static getSeguimiento(id){
        return AxiosSeguimientos.instanceAxios.post(`/getSeguimientoData`, {id});
    }

    static finalizarSeguimiento(data){
        return AxiosSeguimientos.instanceAxios.post(`/finalizarSeguimiento`, data);
    }

    static getSeguimientos(filtro){
        return AxiosSeguimientos.instanceAxios.post(`/getAllSeguimientos`, filtro);
    }

}