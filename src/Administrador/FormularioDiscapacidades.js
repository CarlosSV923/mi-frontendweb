import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, InputNumber, DatePicker, Card } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheelchair } from '@fortawesome/free-solid-svg-icons';

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

const FormularioDiscapacidades = () => {
    
    const [form] = Form.useForm();

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
  
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  
    return (
        <>
            <Card>

                <Row>
                    <Col span={24} className="text-center" justify="center">
                        <h5 className="lead m-4">Registrar nueva discapacidad</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mb-4" span={24}>
                        <FontAwesomeIcon icon={faWheelchair} size="6x" color="#00AAE4"/>
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
                            name="discapacidad"
                            label="Discapacidad"
                            >
                                <Input placeholder="Ingrese el nombre de la discapacidad"/>
                            </Form.Item>
                            <Form.Item
                            name="codigo"
                            label="Código"
                            >
                                <Input placeholder="Ingrese el código"/>
                            </Form.Item>
                            <Form.Item
                            name="descripcion"
                            label="Descripción"
                            >
                                <TextArea placeholder="Ingrese una descripción (opcional)" showCount maxLength={100} />
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

export default FormularioDiscapacidades;