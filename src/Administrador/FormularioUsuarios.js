import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, message, Cascader, Select, Row, Col, Checkbox, Button, Radio, AutoComplete, InputNumber, DatePicker, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import AxiosRoles from '../Services/AxiosRoles';
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

    const [estado, setEstado] = React.useState(false);
    const [listaRoles, setListaRoles] = React.useState([]);
    const [cedula, setCedula] = React.useState("");
    const [nombre, setNombre] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [fechaNacimiento, setFechaNacimiento] = React.useState("");
    const [sexo, setSexo] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [idRol, setidRol] = React.useState("");
    const key = 'updatable';


    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      console.log('Received values of form: ', values.genero);

      setFechaNacimiento(values['date-picker'].format('YYYY-MM-DD'))

      let usuario = {
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

      console.log("USUARIO: ", usuario);

      AxiosRoles.almacenar_usuario(usuario).then((res)=>{
        console.log("almacenar_usuario: ",res.data);
       props.history.push('/admin')
      })

      console.log("values['date-picker'].format('YYYY-MM-DD'): ", values['date-picker'].format('YYYY-MM-DD'));
    };

    React.useEffect(()=>{
        
        mostrar_roles();
  
    }, []);

    const mostrar_roles = () => {
        message.loading({ content: 'Guardando...', key, duration: 20});

        AxiosRoles.mostrar_roles().then((res)=>{
          console.log(res.data);
          setListaRoles(res.data);
          
          message.success({ content: 'Guardado con éxito', key, duration: 3 });

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

                <Row>
                    <Col span={24} className="text-center" justify="center">
                        <h5 className="lead m-4">Registrar nuevo usuario</h5>
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
                                <Input placeholder="Ingrese correo electrónico" value = {correo} onChange = {(e)=> setCorreo(e.target.value)}/>
                            </Form.Item>
                
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
                                <Input placeholder="Ingrese nombre de usuario" value = {username} onChange = { (e) => setUsername(e.target.value) } />
                            </Form.Item>

                            <Form.Item
                            name="cedula"
                            label="Cédula"
                            >
                                <Input placeholder="Ingrese su número de identificación" value = {cedula} onChange = {(e)=> setCedula(e.target.value)}/>
                            </Form.Item>
                
                            <Form.Item
                            name="fechna"
                            label="Fecha de nacimiento"
                            name="date-picker" label="DatePicker"
                            >
                                <DatePicker/>
                            </Form.Item>
                
                            <Form.Item
                            name="genero"
                            label="Género"
                            >
                                <Select placeholder="Seleccione género" value = {sexo} onChange = {e => setSexo(e)}>
                                    <Option value="Hombre">Hombre</Option>
                                    <Option value="Mujer">Mujer</Option>
                                    <Option value="Prefiero no decirlo">Prefiero no decirlo</Option>
                                </Select>
                            </Form.Item>
                
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
                                <Button type="primary" htmlType="submit">
                                    Registrar
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