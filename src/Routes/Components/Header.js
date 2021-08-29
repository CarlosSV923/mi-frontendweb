import React from 'react';
import { Menu, Layout, Badge, notification, Button, Popover, Descriptions, Divider, Row, Col, Card, Tooltip } from 'antd';
import { EyeOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Auth from './../../Login/Auth';
import AxiosCitas from '../../Services/AxiosCitas';
import moment from 'moment';
import 'moment/locale/es';
import Modal from 'antd/lib/modal/Modal';
import { Link } from 'react-router-dom';
import NotificacionesMedico from './NotificacionesMedico';
import NotificacionesPaciente from './NotificacionesPaciente';
import NotificacionesCuidador from './NotificacionesCuidador';
const { Header } = Layout;
const { SubMenu } = Menu;

let info = false;

export default class HeaderComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            route: '',
            cedula: '',
            cantidad:0,
            recordatorios: [],
            contenido:'',
            visible: false
        }

    }

    tipo_notificacion = () => {
        console.log("Auth.isAdmin: ",Auth.isAdmin());
        if (Auth.isMedico()) {
            console.log("Med");
            this.cargar_recordatorios_medico();
        }else if (Auth.isPaciente()) {
            this.cargar_recordatorios_paciente();
            console.log("Paci");
        }else if (Auth.isCuidador()) {
            this.cargar_recordatorios_cuidador()
            console.log("Cui");
        }
    }

    openNotification = (mensaje) => {
        notification['info']({
          message: 'Recordatorios',
          description: mensaje,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      };

    // text = <span>Title</span>;
    content = (
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
    );

    open_modal = () => {
        this.setState({
            visible:true
        });
        console.log("MOOOODA");
        console.log("isModalVisible: ",this.state.visible);
    }

    cargar_recordatorios_medico = () => {
        //setCargando(true)
        AxiosCitas.citas_recordatorios_medico({"cedula": Auth.getDataUser().cedula}).then( res => {
          console.log("citas_recordatorios_medico: ",(res.data).length);
          console.log("citas_recordatorios_medico: " ,res.data);
          this.setState({
              cantidad: res.data.length,
              recordatorios: res.data
          });

        if (res.data.length>0){
            this.openNotification(res.data.length>1?"Tiene citas pendientes, revisar por favor":"Tiene una cita pendiente, revisar por favor");
          //setMostrarAlerta(true);
        }

        //   this.setState({
        //       contenido: data
        //   });
        //   this.openNotification(res.data.length>1?"Tiene citas pendientes, revisar por favor":"Tiene una cita pendiente, revisar por favor");
        });
    }

    cargar_recordatorios_paciente = () => {
        // setCargando(true);
        AxiosCitas.citas_recordatorios_paciente({"cedula": Auth.getDataUser().cedula}).then( res => {
          console.log("citas_recordatorios_paciente: ",(res.data).length);
          this.setState({
            cantidad: res.data.length,
            recordatorios: res.data
          });
          if (res.data.length>0){
            this.openNotification(res.data.length>1?"Tiene citas pendientes, revisar por favor":"Tiene una cita pendiente, revisar por favor");
          //setMostrarAlerta(true);
          }
        //   this.openNotification(res.data.length>1?"Tiene citas pendientes, revisar por favor":"Tiene una cita pendiente, revisar por favor");
        });
    }

    cargar_recordatorios_cuidador = () => {
        // setCargando(true);
        AxiosCitas.citas_recordatorios_cuidador({"cedula": Auth.getDataUser().cedula}).then( res => {
          this.setState({
            cantidad: res.data.length,
            recordatorios: res.data
          });
          if (res.data.length>0){
              this.openNotification(res.data.length>1?"Tiene citas pendientes, revisar por favor":"Tiene una cita pendiente, revisar por favor");
            //setMostrarAlerta(true);
          }
          //this.openNotification(res.data.length>1?"Tiene citas pendientes, revisar por favor":"Tiene una cita pendiente, revisar por favor");
        });
      }

    getDataUser() {
        let data = Auth.getDataUser();
        console.log(Auth.getDataUser().cedula)
        this.setState({
            cedula: data.cedula
        });
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
        this.setState({ userName: this.getDataUser(), route: this.getRoutePerfil() + `/perfil/${Auth.getDataUser().cedula}` })
        this.tipo_notificacion();
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
                {/* <Button color="dark">
                    <Badge count={0} showZero>
                        <NotificationOutlined style = {{color : "#FFFFFF"}} />
                    </Badge>
                </Button> */}
                <Popover placement="bottomRight" title={"Notificaciones"} 
                    content={
                            Auth.isMedico()?
                                this.state.recordatorios.map( item =>  (
                                    <NotificacionesMedico key = {item.id}
                                        nombre = {item.nombre}
                                        apellido = {item.apellido}
                                        cedula = {item.cedula}
                                        start = {item.start}
                                        end = {item.end}
                                    />
                                )):
                            Auth.isPaciente()?
                                this.state.recordatorios.map( item =>  (
                                    <NotificacionesPaciente key = {item.id}
                                        estado = {item.estado}
                                        start = {item.start}
                                        end = {item.end}
                                        nombre = {item.nombre}
                                        apellido = {item.apellido}
                                        cedula = {item.cedula}
                                        especialidad = {item.especialidad}
                                    />
                                )):
                            Auth.isCuidador()?
                                this.state.recordatorios.map( item =>  (
                                    <NotificacionesCuidador key = {item.id}
                                        estado = {item.estado}
                                        start = {item.start}
                                        end = {item.end}
                                        nombre_medico = {item.nombreMedico}
                                        apellido_medico = {item.apellidoMedico}
                        
                                        cedula_medico = {item.cedulaMedico}
                                        nombre_paciente = {item.nombrePaciente}
                                        apellido_paciente = {item.apellidoPaciente}
                                        cedula_paciente = {item.cedulaPaciente}
                                        especialidad = {item.especialidad}
                                    />
                                )):
                        null
                    } 
                trigger="click">
                    <Link className = "">
                        <Badge count={this.state.cantidad} showZero>
                            <NotificationOutlined style = {{color : "#FFFFFF"}} />
                        </Badge>
                    </Link>
                </Popover>
            </Header>
        );

    }
}