import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, message, Cascader, Breadcrumb, Select, Row, Col, Checkbox, Button, AutoComplete, InputNumber, DatePicker, Card } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWheelchair } from '@fortawesome/free-solid-svg-icons';
import AxiosDiscapacidades from '../Services/AxiosDiscapacidades';
import {DeleteOutlined, EditOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'
import { useParams } from 'react-router-dom';

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

const FormularioDiscapacidades = (props) => {
    
    const [form] = Form.useForm();
    const [nombre, setNombre] = React.useState("");
    const [codigo, setCodigo] = React.useState("");
    const [descrip, setDescrip] = React.useState("");
    const [editionMode, setEditionMode] = React.useState(useParams().id!==undefined);
    const [discapacidad, setDiscapacidad] = React.useState({});

    const key = 'updatable';
    const {id} = useParams();

    const onFinish = () => {

      if (editionMode){
        actualizar_discapacidad();
        console.log("EDI");
      }else{
        almacenar_discapacidad();
      }

    };
    
    const almacenar_discapacidad = () => {
      
      message.loading({ content: 'Guardando...', key, duration: 20});
      AxiosDiscapacidades.almacenar_discapacidad({nombre: nombre, codigo: codigo, descrip: descrip}).then((res)=>{
        console.log(res.data);
        props.history.push('/admin/homediscapacidades');
        message.success({ content: 'Guardado con éxito', key, duration: 3 });
      })
    }

    const obtener_discapacidad_por_id = () => {

      AxiosDiscapacidades.obtener_discapacidad_por_id(id).then( response => {
        setDiscapacidad(response.data[0]);
        console.log("response: ", (response.data[0]).nombre);
        setNombre((response.data[0]).nombre);
        setCodigo((response.data[0]).codigo);
        setDescrip((response.data[0]).descrip);
      });

    }

    const actualizar_discapacidad = () => {
      message.loading({ content: 'Actualizando...', key, duration: 20});
      AxiosDiscapacidades.actualizar_discapacidad({"id_discapacidad":id, "nombre": nombre, "codigo": codigo, "descrip": descrip}).then ( response => {
          console.log("actualizar_discapacidad: ",actualizar_discapacidad);
          props.history.push('/admin/homediscapacidades');
          message.success({ content: 'Registro actualizado con éxito', key, duration: 3 });
      });
    }

    React.useEffect(() =>{
      if (editionMode){
        console.log("DDDDDDDDDDDDDDD: ", discapacidad)
        obtener_discapacidad_por_id();
        form.setFieldsValue({
          discapacidad: discapacidad.nombre,
          codigo: discapacidad.codigo,
          descripcion: discapacidad.descrip 
        });
      }
    }, [id, form, discapacidad.nombre, discapacidad.codigo, discapacidad.descrip]);
  
    return (
        <>
            <Card>
            <Breadcrumb>
              <Breadcrumb.Item href="/admin">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/admin/homediscapacidades">
                {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                <FileSearchOutlined />
                <span>Gestión discapacidades</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/admin/edit/discapacidades/:id">
                {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                <EditOutlined />
                <span>{editionMode? 'Edición discapacidad':'Resgistro discapacidad'}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
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
                                <Input placeholder="Ingrese el nombre de la discapacidad" value = {nombre} onChange = {(e)=> setNombre(e.target.value)}/>
                            </Form.Item>
                            <Form.Item
                            name="codigo"
                            label="Código"
                            >
                                <Input placeholder="Ingrese el código" value = {codigo} onChange = {(e) => setCodigo(e.target.value)}/>
                            </Form.Item>
                            <Form.Item
                            name="descripcion"
                            label="Descripción"
                            >
                                <TextArea placeholder="Ingrese una descripción (opcional)" value = {descrip} onChange ={ e => setDescrip(e.target.value) } showCount rows = {4} />
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" className ="me-4" htmlType="submit">
                                    {editionMode?'Guardar cambios':'Registrar'}
                                </Button>
                                <Button type="primary" danger>
                                    <Link to='/admin/homediscapacidades'>
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

export default FormularioDiscapacidades;