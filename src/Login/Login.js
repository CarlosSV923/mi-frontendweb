import React from 'react';
import { Form, Button, Typography, Row, Col, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import Auth from './Auth';
import AxiosUsers from '../Services/AxiosUsers';
const tailLayout = {
    wrapperCol: { offset: 11, span: 8 }
};

const layout = {
    labelCol: { span: 20 },
    wrapperCol: { offset: 8, span: 8 },
};
const { Title } = Typography;
const key = 'updatable';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.formRef = React.createRef();

    }

    login(e) {
        e.preventDefault();
        this.formRef.current.validateFields().then(values  => {
           
                message.loading({ content: 'Verificando datos...', key });
                AxiosUsers.login(values).then(res => {
                    Auth.login(res.data);
                    console.log("Login: ", res.data);
                    console.log("D: ",Auth.getDataUser());
                    setTimeout(() => {
                        message.success({ content: 'Sesion Iniciada con Exito', key, duration: 3 });
                    }, 1000);
                    this.props.history.push("/");
                }).catch(error => {
                    console.log(error, error.response, 'error login')
                    if (error.response) {
                        if (error.response.status === 400) {
                            message.error('Las credenciales ingresadas son incorrectas...', 4);
                        }
                        else if (error.response.status === 500) {
                            message.error('Ocurrió un error al procesar los datos, inténtelo más tarde', 4);
                        }
                        else if (error.response.status === 401) {
                            message.error('El usuario ingresado está inactivo y no puede acceder al sistema.', 4);
                        }else{
                            message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
                        }
                    } else {
                        message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
                    }
                });
            
        }).catch(err => {
            console.log(err);
        });
    }




    render() {
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Iniciar Sesion</Title></Col>
                </Row>
                <div className="div-miniborder-top" >

                    <div className="div-container" >
                        <div style={{ paddingLeft: '40%', paddingRight: '40%' }} className='center'>
                            <img className="App-logo" src={"./espol2.png"} style={{height:'75px', width:'160px'}}  alt="logo" />
                        </div>
                        <br />
                        <br />
                        <Form {...layout}
                            layout="horizontal"
                            ref={this.formRef}
                            
                        >

                            <Form.Item
                                name={"username"}
                                rules={[{ required: true, message: 'Debe ingresar un usuario valido' }]}
                            >

                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />



                            </Form.Item>
                            <Form.Item
                                rules={[{ required: true, message: 'Debe ingresar una contraseña valida' }]}
                                name="password"
                            >

                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Contraseña"
                                />

                            </Form.Item>


                            <Form.Item {...tailLayout}>
                                <Button 
                                    style={{ marginRight: 7 }} 
                                    type="primary" 
                                    className="login-form-button" 
                                    onClick={(e) => { this.login(e) }}
                                >Iniciar Sesión</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}



