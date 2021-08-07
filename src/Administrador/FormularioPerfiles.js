import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Form, Input, message, Cascader, Avatar, Badge, Breadcrumb, Tabs, Select, Row, Col, Checkbox, Button, Radio, AutoComplete, InputNumber, DatePicker, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import AxiosRoles from '../Services/AxiosRoles';
import AxiosUsers from '../Services/AxiosUsers';
import Auth from '../Login/Auth';
import { useParams } from 'react-router-dom';
import {DeleteOutlined, EditOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'
import moment from 'moment';
import 'moment/locale/es';

const { Option } = Select;
const { TabPane } = Tabs;

const opciones_estado = [
    { label: 'No activo', value: false },
    { label: 'Activo', value: true },
];

const opciones_password = [
    { label: 'No', value: false },
    { label: 'Si', value: true },
];


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const getRoutePerfil = () => {
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

const FormularioPerfiles = (props) => {
    
    const [form] = Form.useForm();

    // const [estado, setEstado] = React.useState(false);
    const [listaRoles, setListaRoles] = React.useState([]);
    const [cedula, setCedula] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [fechaNacimiento, setFechaNacimiento] = React.useState("");
    const [sexo, setSexo] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [passwordActual, setPasswordActual] = React.useState("");
    const [passwordNuevo, setPasswordNuevo] = React.useState("");
    const [estado, setEstado] = React.useState("");
    const [idRol, setidRol] = React.useState("");
    const [usuario, setUsuario] = React.useState({});
    const [cambiarPassword, setCambiarPassword] = React.useState(false);

    const key = 'updatable';
    const { ced } = useParams();

    console.log(useParams());

    const onFinish = (values) => {
        actualizar_perfil(values);
    };

    const actualizar_perfil = (values) => {
        message.loading({ content: 'Actualizando...', key, duration: 20});
        let u = {
            cedula: ced,
            password_nuevo: passwordNuevo,
            password_actual: passwordActual,
            nombre: nombre,
            apellido: apellido,
            fecha_nacimiento: values['date-picker'].format('YYYY-MM-DD'),
            sexo: sexo,
            cambiar:cambiarPassword
        }
        console.log("Usuario999999999999999: ",u)
        AxiosUsers.actualizar_perfil(u).then ( response => {
            let data_almacenada = Auth.getDataUser();
            Auth.login({apellido: apellido, cedula: cedula, estado: data_almacenada.estado, nombre:nombre, rol: data_almacenada.rol});
            console.log("actualizar_perfil: ",response);
            props.history.push(`${getRoutePerfil()}`);
            message.success({ content: 'Perfil actualizado con éxito', key, duration: 3 });
        });
    }

    const getRoutePerfil = () => {
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

    const obtener_perfil_por_cedula = () => {
        let data = {"ced": ced}
        AxiosUsers.obtener_perfil_por_cedula(data).then( response => {
            console.log("response: ",response);
            setUsuario(response.data);
            setUsername(response.data.usuario);
            setCedula(response.data.cedula);
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
            setFechaNacimiento(response.data.fecha_nacimiento);
            setCorreo(response.data.correo);
            setSexo(response.data.sexo);
          });        
    }

    const obtener_usuario_por_cedula = () =>  {
        let data = {"ced": ced}
        AxiosUsers.obtener_usuario_por_cedula(data).then( response => {
            console.log("PASS: ", response.data.password);
            console.log("data990: ", data);
            console.log("response9999: ", response.data);
            setUsuario(response.data);
            setUsername(response.data.usuario);
            setCedula(response.data.cedula);
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
            setidRol(response.data.id_rol);
            setEstado(response.data.estado);
            setFechaNacimiento(response.data.fecha_nacimiento);
            setCorreo(response.data.correo);
            setSexo(response.data.sexo);
            setEstado(response.data.estado);

          });
    }

    React.useEffect(()=>{
        console.log("DDDDDDDDDDDDDDD: ", usuario);
        obtener_perfil_por_cedula();
        form.setFieldsValue({
            cedula: usuario.cedula,
            nombre: usuario.nombre,
            email: usuario.correo,
            apellido: usuario.apellido,
            // fecha_nacimiento: usuario.fecha_nacimiento,
            genero: usuario.sexo,
            username: usuario.usuario,
            'date-picker': moment(usuario.fecha_nacimiento, 'YYYY-MM-DD'),
            // password: usuario.data.password,
        });
        mostrar_roles();
    }, [cedula, form, usuario.cedula, usuario.nombre, usuario.correo, usuario.apellido, usuario.fecha_nacimiento, usuario.sexo, usuario.usuario]);

    const mostrar_roles = () => {

        AxiosRoles.mostrar_roles().then((res)=>{
          console.log(res.data);
          setListaRoles(res.data);
          
          

        })
    }

    const cambiar_contraseña = (e) => {
        setCambiarPassword(e.target.value);
    }

    const onChange4 = e => {
        console.log('radio4 checked', e.target.value);
        setEstado(e.target.value);
    };
    
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  
    const onWebsiteChange = (value) => {
      if (!value) {
        setAutoCompleteResult([]);
      } else {
        setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
      }
    };
  
    return (
        <>
            <Card>
                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">
                    <HomeOutlined />
                    </Breadcrumb.Item>
                    {/* getRoutePerfil */}
                    {/* <Breadcrumb.Item href="/admin/homeusuarios"> */}
                    <Breadcrumb.Item href= {getRoutePerfil()} >
                    {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                    <FileSearchOutlined />
                    <span>Mi perfil</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className = "ms-5">

                    <Row>
                        <Col span={24} className="text-center" justify="center">
                            {/* <h5 className="lead m-4">Mi perfil</h5> */}
                            <h5 className="lead m-4">Perfil de mi cuenta</h5>
                        </Col>
                    </Row>
                    <Row className = "mb-4">
                        <Col className="" span={2}>
                            <Avatar
                            style={{
                                backgroundColor: '#00AAE4',
                            }}
                            icon={<UserOutlined />}
                            size={60}
                            />
                        </Col>
                        <Col className="" span={22}>
                            <Row className="">
                                <Col>
                                    <span className="mx-2 lead">{nombre} {apellido}</span>           
                                </Col>
                                {/* <Col>                                        
                                    <Badge status="processing" text="Cita en curso" 
                                        className="me-2 mt-2 text-success"/> 
                                </Col>
                                <Col>
                                    <span className="badge bg-info mt-2">11/07/2021</span>
                                </Col> */}
                            </Row>
                            
                            <Row className="">
                                <span className="ms-2 text-secondary">{fechaNacimiento}</span>
                                {/* <span className="ms-2 text-secondary">72 años</span> */}
                                {/* <span className="ms-2 text-secondary">{Date.now()}</span> */}
                                {/* <span className="ms-2 text-secondary">{moment(Date.now()).format('YYYY-MM-DD')}</span> */}
                                {/* <span className="ms-2 text-secondary">{moment(moment(fechaNacimiento).format('YYYY-MM-DD'),'YYYYMMDD').fromNow()}</span> */}
                                <span className="ms-2 text-secondary">{(moment(moment(fechaNacimiento).format('YYYY-MM-DD'),'YYYYMMDD').fromNow()).substring(4,12)}</span>
                                <span className="ms-2 text-secondary">{sexo === 'M'? 'Masculino': sexo === 'F'? 'Femenino': 'Prefiero no decirlo' }</span>
                                <span className="ms-2 text-secondary">{correo}</span>
                                {/* <span className="mx-2 text-secondary">Miguel Hidalgo</span>  */}
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Row className="">
                    <Col span = {20} className="ms-5">

                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            scrollToFirstError
                            size="large"
                        >
                
                            <Tabs className="mb-2" tabPosition="left">
                                <TabPane tab="Información general" key="1">
                                    {/* Información general */}
                                    <Form.Item
                                    name="nombre"
                                    label="Nombre"
                                    >
                                        <Input placeholder="Ingrese nombre" value = {nombre} onChange = {(e)=> setNombre(e.target.value)}/>
                                    </Form.Item>
                                    <Form.Item
                                    name="apellido"
                                    label="Apellido"
                                    >
                                        <Input placeholder="Ingrese apellido" value = {apellido} onChange = {(e)=> setApellido(e.target.value)}/>
                                    </Form.Item>
                                    <Form.Item
                                    name="date-picker"
                                    label="Fecha de nacimiento"
                                    >
                                        <DatePicker/>
                                    </Form.Item>
                                    <Form.Item
                                    name="genero"
                                    label="Género"
                                    >
                                        <Select placeholder="Seleccione género" value = {sexo} onChange = {e => setSexo(e)}>
                                            <Option value="M">Hombre</Option>
                                            <Option value="F">Mujer</Option>
                                            <Option value="P">Prefiero no decirlo</Option>
                                        </Select>
                                    </Form.Item>
                                </TabPane>
                                <TabPane tab="Configuración cuenta" key="2">
                                        <Form.Item
                                    name="email"
                                    label="Correo electrónico"
                                    rules={[
                                        {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                        },
                                        {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                        },
                                    ]}
                                    >
                                        <Input disabled = {true} placeholder="Ingrese correo electrónico" value = {correo} onChange = {(e)=> setCorreo(e.target.value)}/>
                                    </Form.Item>
                                    <Form.Item label="¿Desea cambiar su contraseña?">
                                        <Radio.Group
                                        options={opciones_password}
                                        onChange={e => cambiar_contraseña(e)}
                                        value={cambiarPassword}
                                        optionType="button"
                                        buttonStyle="solid"
                                        />                        
                                    </Form.Item>
                                    {cambiarPassword?
                                        <>
                                            <Form.Item
                                            name="password_actual"
                                            label="Password actual"
                                            rules={[
                                                {
                                                required: true,
                                                message: 'Ingrese contraseña anterior',
                                                },
                                            ]}
                                            hasFeedback
                                            >
                                                <Input.Password placeholder="Ingrese su contraseña anterior" value = {passwordActual} onChange = { (e) => setPasswordActual(e.target.value) }/>
                                            </Form.Item>

                                            <Form.Item
                                            name="password_nuevo"
                                            label="Password nuevo"
                                            rules={[
                                                {
                                                required: true,
                                                message: 'Ingrese su nueva contraseña',
                                                },
                                            ]}
                                            hasFeedback
                                            >
                                                <Input.Password placeholder="Ingrese su nueva contraseña" value = {passwordNuevo} onChange = { (e) => setPasswordNuevo(e.target.value) }/>
                                            </Form.Item>
                                        </>:null               
                                    }
                                    <Form.Item
                                        name="username"
                                        label="Nombre de usuario"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your nickname!',
                                            whitespace: true,
                                        },
                                        ]}
                                    >
                                        <Input disabled = {true} placeholder="Ingrese nombre de usuario" value = {username} onChange = { (e) => setUsername(e.target.value) } />
                                    </Form.Item>
                                    <Form.Item
                                    name="cedula"
                                    label="Cédula"
                                    >
                                        <Input disabled = {true} placeholder="Ingrese su número de identificación" value = {cedula} onChange = {(e)=> setCedula(e.target.value)}/>
                                    </Form.Item>
                                </TabPane>
                            </Tabs>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" className ="me-4" htmlType="submit">
                                    Guardar cambios
                                </Button>
                                <Button type="primary" danger>
                                    <Link to={`${getRoutePerfil()}`}>
                                      Cancelar
                                    </Link>                                    
                                </Button>
                            </Form.Item>
                
                        </Form>

                    </Col>
                </Row>



            </Card>
        </>
      );
    
}

export default FormularioPerfiles;