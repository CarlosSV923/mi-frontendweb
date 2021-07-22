
import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class CitasServices {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static getPersonasFilter = (filtro) => {
        return CitasServices.instanceAxios.post(`/getPersonasFilter`, filtro);
    }
}