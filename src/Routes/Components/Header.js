import React from 'react';
import { Menu, Layout, Badge, notification } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
//import '../../custom-antd.css';
const { Header } = Layout;
const { SubMenu } = Menu;

export default class HeaderComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    // getRoutePerfil = () => {
    //     if (Auth.isFinanzas()) {
    //         return '/finanzas';
    //     }
    //     if (Auth.isEmpleado()) {
    //         return '/empleado';
    //     }
    //     return '/sistemas'
    // }


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
                        icon={<AppstoreOutlined />}
                        title={
                            <span>
                                
                                <span>{"Se debe cambiar"}</span>
                            </span>
                        }
                    >
                        <Menu.Item key="40">Mi Perfil<Link to={ '/perfil'} /></Menu.Item>
                        <Menu.Item key="30" onClick={(e) => { console.log("cerrar sesion!") }} >Cerrar Sesion<Link to="/login" /></Menu.Item>
                    </SubMenu>

                </Menu>
            </Header>
        );

    }
}