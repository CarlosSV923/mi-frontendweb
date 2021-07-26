import React from 'react';
import { Menu, Layout, Badge, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Auth from './../../Login/Auth';
const { Header } = Layout;
const { SubMenu } = Menu;

export default class HeaderComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            route: '',
        }

    }

    getDataUser() {
        let data = Auth.getDataUser();
        if (data) {
            return data.nombre + " " + data.apellido
        }
        return '';
    }

    getRoutePerfil = () => {
        if (Auth.isMedico()) {
            return '/medico';
        }
        if (Auth.isPaciente()) {
            return '/paciente';
        }
        if (Auth.isCuidador()) {
            return '/cuidador';
        }
        return '/admin'
    }

    componentDidMount() {
        this.setState({ userName: this.getDataUser(), route: this.getRoutePerfil() + "/perfil" })
    }


    render() {
        return (
            <Header className="site-layout-background" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {/* <img className="App-logo" src={"./espol.png"} alt="logo" /> */}
                <Menu theme="dark" mode="horizontal"  >
                    {/* {this.state.isNotSistemas ? null : <SubMenu
                        key="notificacion"
                        title={
                            <div>
                                <Link to="/sistemas/solicitudes">
                                    <Badge count={this.state.pendientes} overflowCount={99}>
                                        <Icon type="bell" />
                                    </Badge>
                                </Link>
                            </div>}
                    >
                    </SubMenu>} */}

                    <SubMenu
                        key="user"
                        icon={<UserOutlined />}
                        title={
                            <span>

                                <span>{this.state.userName}</span>
                            </span>
                        }
                    >
                        <Menu.Item key="40">Mi Perfil<Link to={this.state.route} /></Menu.Item>
                        <Menu.Item key="30" onClick={(e) => { Auth.logout() }} >Cerrar Sesion<Link to="/login" /></Menu.Item>
                    </SubMenu>

                </Menu>
            </Header>
        );

    }
}