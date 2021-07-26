
const Auth = {
    login(data) {
        localStorage.setItem('userdata', JSON.stringify(data))
    },
    logout() {
        localStorage.removeItem('userdata');
    },
    isLogin() {
        // console.log(localStorage.getItem('userdata'),'hhh')
        return localStorage.getItem('userdata');
    },
    getDataUser() {
        return JSON.parse(localStorage.getItem('userdata'));
    },
    isMedico() {
        let json_user = JSON.parse(localStorage.getItem('userdata'));
        return json_user.rol.toLowerCase().indexOf('medico') !== -1;
    },
    isPaciente() {
        return JSON.parse(localStorage.getItem('userdata')).rol.toLowerCase().indexOf('paciente') !== -1;
    },
    isCuidador() {
        return JSON.parse(localStorage.getItem('userdata')).rol.toLowerCase().indexOf('cuidador') !== -1;
    },
    isAdmin() {
        return JSON.parse(localStorage.getItem('userdata')).rol.toLowerCase().indexOf('admin') !== -1;
    }
};
export default Auth;