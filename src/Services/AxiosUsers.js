import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosUsers {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static login = (credenciales) => {
        return AxiosUsers.instanceAxios.post(`/login`, credenciales);
    }
}