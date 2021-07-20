import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, Radio, AutoComplete, InputNumber, DatePicker, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
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

const FormularioUsuarios = () => {
    
    const [form] = Form.useForm();

    const [estado, setEstado] = React.useState(false);

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

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
                                <Input placeholder="Ingrese nombre"/>
                            </Form.Item>
                
                            <Form.Item
                            name="apellido"
                            label="Apellido"
                            >
                                <Input placeholder="Ingrese apellido"/>
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
                                <Input placeholder="Ingrese correo electrónico"/>
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
                                <Input.Password placeholder="Confirme su contraseña" />
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
                                <Input placeholder="Ingrese nombre de usuario" />
                            </Form.Item>

                            <Form.Item
                            name="cedula"
                            label="Cédula"
                            >
                                <Input placeholder="Ingrese su número de identificación"/>
                            </Form.Item>
                
                            <Form.Item
                            name="fechna"
                            label="Fecha de nacimiento"
                            >
                                <DatePicker/>
                            </Form.Item>
                
                            <Form.Item
                            name="genero"
                            label="Género"
                            >
                                <Select placeholder="Seleccione género">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                
                            <Form.Item
                            name="rol"
                            label="Rol"
                            >
                                <Select placeholder="Seleccione el rol">
                                    <Option value="Paciente">Paciente</Option>
                                    <Option value="Administrador">Administrador</Option>
                                    <Option value="medico">Médico</Option>
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