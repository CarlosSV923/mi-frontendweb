import axios from 'axios';
import VariableGlobal from './VariableGlobal'

export default class AxiosUsers {
    static instanceAxios = axios.create({
        baseURL: VariableGlobal.baseURL,
    });

    static login = (credenciales) => {
        return AxiosUsers.instanceAxios.post(`/login`, credenciales);
    }

    static mostrar_usuarios = () => {
        return AxiosUsers.instanceAxios.get(`/mostrar_usuarios`);
    }

    static deshabilitar_usuario = (usuario) => {
        return AxiosUsers.instanceAxios.post(`/deshabilitar_usuario`, usuario);
    }

    static obtener_usuario_por_cedula = (cedula) => {
        return AxiosUsers.instanceAxios.post(`/obtener_usuario_por_cedula`, cedula);
    }

    static actualizar_usuario_administrador = (user) => {
        return AxiosUsers.instanceAxios.post(`/actualizar_usuario_administrador`, user);
    }

    static obtener_perfil_por_cedula = (cedula) => {
        return AxiosUsers.instanceAxios.post(`/obtener_perfil_por_cedula`, cedula);
    }

    static actualizar_perfil = (perfil) => {
        return AxiosUsers.instanceAxios.post(`/actualizar_perfil`, perfil);
    }

    static mostrar_pacientes = () => {
        return AxiosUsers.instanceAxios.get(`/mostrar_pacientes`);
    }

    static mostrar_informacion_expediente = (cedula) => {
        return AxiosUsers.instanceAxios.post(`/mostrar_informacion_expediente`, cedula);
    }

    static mostrar_informacion_cita_paciente = (info) => {
        return AxiosUsers.instanceAxios.post(`/mostrar_informacion_cita_paciente`, info);
    }

    static informacion = (info) => {
        return AxiosUsers.instanceAxios.post(`/informacion`, info);
    }

    static info_paciente = (cedula) => {
        return AxiosUsers.instanceAxios.get(`/info_paciente/${cedula}`);
    }

}