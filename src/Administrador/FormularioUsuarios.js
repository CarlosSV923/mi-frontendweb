import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Form, Input, message, Cascader, Breadcrumb, Select, Row, Col, Checkbox, Button, Radio, AutoComplete, InputNumber, DatePicker, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import AxiosRoles from '../Services/AxiosRoles';
import AxiosUsers from '../Services/AxiosUsers';
import { useParams } from 'react-router-dom';
import {DeleteOutlined, EditOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'
import moment from 'moment';

const { Option } = Select;

const opciones_estado = [
    { label: 'No activo', value: false },
    { label: 'Activo', value: true },
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

const FormularioUsuarios = (props) => {
    
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
    const [password, setPassword] = React.useState("");
    const [estado, setEstado] = React.useState("");
    const [idRol, setidRol] = React.useState("");
    const [usuario, setUsuario] = React.useState({});
    const [editionMode, setEditionMode] = React.useState(useParams().ced !== undefined);

    const key = 'updatable';
    const { ced } = useParams();

    console.log(useParams());

    const onFinish = (values) => {

      if (editionMode){
        actualizar_usuario_administrador(values);
      }else{
        almacenar_usuario(values);
      }

    };

    const actualizar_usuario_administrador = (values) => {
        message.loading({ content: 'Actualizando...', key, duration: 20});
        let u = {
            cedula: ced,
            nombre: nombre,
            apellido: apellido,
            fecha_nacimiento: values['date-picker'].format('YYYY-MM-DD'),
            sexo: sexo,
            id_rol: idRol,
            estado: estado
        }
        console.log("Usuario: ",u)
        AxiosUsers.actualizar_usuario_administrador(u).then ( response => {
            console.log("actualizar_discapacidad: ",response);
            props.history.push('/admin/homeusuarios');
            message.success({ content: 'Registro actualizado con éxito', key, duration: 3 });
        });
    }

    const almacenar_usuario = (values) => {
        console.log('Received values of form: ', values);
        console.log('Received values of form: ', values.genero);
        setFechaNacimiento(values['date-picker'].format('YYYY-MM-DD'))
        let u = {
          cedula: cedula,
          nombre: nombre,
          correo: correo,
          apellido: apellido,
          fecha_nacimiento: values['date-picker'].format('YYYY-MM-DD'),
          sexo: sexo,
          username: username,
          password: password,
          id_rol: idRol,
        }
        console.log("USUARIO: ", u);
        message.loading({ content: 'Guardando...', key, duration: 20});
        AxiosRoles.almacenar_usuario(u).then((res)=>{
          console.log("almacenar_usuario: ",res.data);
          props.history.push('/admin/homeusuarios')
          message.success({ content: 'Guardado con éxito', key, duration: 3 });
        })
        console.log("values['date-picker'].format('YYYY-MM-DD'): ", values['date-picker'].format('YYYY-MM-DD'));
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
        if (editionMode){
            console.log("DDDDDDDDDDDDDDD: ", usuario);
            obtener_usuario_por_cedula();
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
                rol: usuario.id_rol,
                estado: usuario.estado
            });
          }
        mostrar_roles();
    }, [cedula, form, usuario.cedula, usuario.nombre, usuario.correo, usuario.apellido, usuario.fecha_nacimiento, usuario.sexo, usuario.usuario, usuario.id_rol, usuario.estado]);

    const mostrar_roles = () => {
        AxiosRoles.mostrar_roles().then((res)=>{
          console.log(res.data);
          setListaRoles(res.data);
        })
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
                    <Breadcrumb.Item href="/admin/homeusuarios">
                    {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                    <FileSearchOutlined />
                    <span>Gestión usuarios</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin/edit/usuarios/:cedula">
                    {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                    <EditOutlined />
                    <span>{editionMode? 'Edición usuario':'Resgistro usuario'}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col span={24} className="text-center" justify="center">
                        <h5 className="lead m-4">{editionMode?'Actualizar usuario': 'Registrar nuevo usuario'}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mb-4" span={24}>
                        <FontAwesomeIcon icon={faUserAlt} size="6x" color="#00AAE4"/>
                    </Col>
                </Row>
                <Row className="">
                    <Col span = {20} className="">

                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            scrollToFirstError
                            size="large"
                        >
                
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
                                <Input disabled = {editionMode?true:false} placeholder="Ingrese correo electrónico" value = {correo} onChange = {(e)=> setCorreo(e.target.value)}/>
                            </Form.Item>
                
                            {!editionMode?
                                <>

                                    <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                    >
                                        <Input.Password placeholder="Ingrese su contraseña" />
                                    </Form.Item>
                            
                                    <Form.Item
                                        name="confirm"
                                        label="Confirm Password"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                        
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                        ]}
                                    >
                                        <Input.Password placeholder="Confirme su contraseña" value = {password} onChange = { (e) => setPassword(e.target.value) } />
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
                                <Input disabled = {editionMode?true:false} placeholder="Ingrese nombre de usuario" value = {username} onChange = { (e) => setUsername(e.target.value) } />
                            </Form.Item>

                            <Form.Item
                            name="cedula"
                            label="Cédula"
                            >
                                <Input disabled = {editionMode?true:false} placeholder="Ingrese su número de identificación" value = {cedula} onChange = {(e)=> setCedula(e.target.value)}/>
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
                
                            {
                                editionMode?
                                    <Form.Item
                                    name="estado"
                                    label="Estado"
                                    >
                                        <Select placeholder="Seleccione el estado del usuario" value = {estado} onChange = {e => setEstado(e)}>
                                            <Option value="A">Activo</Option>
                                            <Option value="I">Inactivo</Option>
                                        </Select>
                                    </Form.Item>:null
                            }

                            <Form.Item
                            name="rol"
                            label="Rol"
                            >
                                <Select placeholder="Seleccione el rol" value = {idRol} onChange = { (e) => setidRol(e) }>

                                    {
                                        listaRoles.map ( item => 
                                            (
                                                <Option key={item.nombre} value = {item.id_rol} >{item.nombre}</Option>
                                            )
                                        )
                                    }
                                </Select>
                            </Form.Item>
                
                            {/* <Form.Item
                            name="estado"
                            label="Estado"
                            >
                                <Radio.Group
                                    options={opciones_estado}
                                    onChange={e => onChange4(e)}
                                    value={estado}
                                    optionType="button"
                                    buttonStyle="solid"
                                />
                            </Form.Item> */}

                            <Form.Item {...tailFormItemLayout}>
                                
                                <Button type="primary" className ="me-4" htmlType="submit">
                                    {editionMode?'Guardar cambios':'Registrar'}
                                </Button>
                                <Button type="primary" danger>
                                    <Link to='/admin/homeusuarios'>
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

export default FormularioUsuarios;