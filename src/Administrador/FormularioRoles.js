import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, message, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, InputNumber, DatePicker, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import AxiosRoles from '../Services/AxiosRoles';

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

const { TextArea } = Input;

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

const FormularioRoles = (props) => {
    
    const [form] = Form.useForm();
    const [nombre, setNombre] = React.useState("");
    const [descrip, setDescrip] = React.useState("");
    const key = 'updatable';

    const onFinish = (values) => {
      message.loading({ content: 'Guardando...', key, duration: 20});

      AxiosRoles.almacenar_rol({nombre: nombre, descrip: descrip}).then((res)=>{
        console.log(res.data);
        props.history.push('/admin');
        message.success({ content: 'Guardado con éxito', key, duration: 3 });

      })
    };
  
    React.useEffect(()=>{
        
      //mostrar_roles();

    }, []);



    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  
    return (
        <>
            <Card>

                <Row>
                    <Col span={24} className="text-center" justify="center">
                        <h5 className="lead m-4">Registrar nuevo rol</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mb-4" span={24}>
                        <FontAwesomeIcon icon={faUsers} size="6x" color="#00AAE4"/>
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
                            name="rol"
                            label="Rol"
                            >
                                <Input placeholder="Ingrese el nombre del rol" value = {nombre} onChange = {(e)=> setNombre(e.target.value)}/>
                            </Form.Item>
                
                            <Form.Item
                            name="descripcion"
                            label="Descripción"
                            >
                                <TextArea placeholder="Ingrese una descripción (opcional)" value = {descrip} onChange ={ e => setDescrip(e.target.value) } showCount maxLength={100} />
                            </Form.Item>

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

export default FormularioRoles;