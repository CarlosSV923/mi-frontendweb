import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Form, Input, message, Breadcrumb, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, InputNumber, DatePicker, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTablets, faUsers } from '@fortawesome/free-solid-svg-icons';
import AxiosMedicamentos from '../Services/AxiosMedicamentos';
import { useParams } from 'react-router-dom';
import {DeleteOutlined, EditOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'

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

const FormularioMedicamentos = (props) => {
    
    const [form] = Form.useForm();
    const [nombre, setNombre] = React.useState("");
    const [codigo, setCodigo] = React.useState("");
    const [descrip, setDescrip] = React.useState("");
    const [medicamento , setMedicamento] = React.useState({});
    const [editionMode, setEditionMode] = React.useState(useParams().id!==undefined);
    const key = 'updatable';
    const { id } = useParams();

    const onFinish = (values) => {
      if (editionMode){
        actualizar_medicamento();
        console.log("EDI");
      }else{
        almacenar_medicamento();
      }
    };
    
    const almacenar_medicamento = () => {
      message.loading({ content: 'Guardando...', key, duration: 20});
      AxiosMedicamentos.almacenar_medicamento({nombre: nombre, codigo: codigo, descrip: descrip}).then((res)=>{
        console.log(res.data);
        props.history.push('/admin/homemedicamentos');
        message.success({ content: 'Guardado con éxito', key, duration: 3 });
  
      })
    }

    const actualizar_medicamento = () => {
      message.loading({ content: 'Actualizando...', key, duration: 20});
      AxiosMedicamentos.actualizar_medicamento({"id_medicamento":id, "nombre": nombre, "codigo": codigo, "descrip": descrip}).then ( response => {
          console.log("actualizar_medicamento: ",actualizar_medicamento);
          props.history.push('/admin/homemedicamentos');
          message.success({ content: 'Registro actualizado con éxito', key, duration: 3 });
      });
    }

    const obtener_medicamento_por_id = () => {
      AxiosMedicamentos.obtener_medicamento_por_id(id).then( response => {
        setMedicamento(response.data[0]);
        console.log("response: ", (response.data[0]).nombreLargo);
        setNombre((response.data[0]).nombre);
        setCodigo((response.data[0]).codigo);
        setDescrip((response.data[0]).descrip);
      });
    }

    React.useEffect(() =>{
      if (editionMode){
        console.log("DDDDDDDDDDDDDDD: ", medicamento)
        obtener_medicamento_por_id();
        form.setFieldsValue({
          medicamento: medicamento.nombre,
          codigo: medicamento.codigo,
          descripcion: medicamento.descrip 
        });
      }
    }, [id, form, medicamento.nombre, medicamento.codigo, medicamento.descrip]);
    
  
    return (
        <>
            <Card>

              <Breadcrumb>
                <Breadcrumb.Item href="/admin">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/homemedicamentos">
                  {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                  <FileSearchOutlined />
                  <span>Gestión medicamentos</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/admin/edit/medicamentos/:id">
                  {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                  <EditOutlined />
                  <span>{editionMode? 'Edición medicamento':'Resgistro medicamento'}</span>
                </Breadcrumb.Item>
              </Breadcrumb>

                <Row>
                    <Col span={24} className="text-center" justify="center">
                        <h5 className="lead m-4">Registrar nuevo medicamento</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mb-4" span={24}>
                        <FontAwesomeIcon icon={faTablets} size="6x" color="#00AAE4"/>
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
                            name="medicamento"
                            label="Medicamento"
                            >
                                <Input placeholder="Ingrese el nombre del medicamento" value = {nombre} onChange = {(e)=> setNombre(e.target.value)}/>
                            </Form.Item>

                            <Form.Item
                            name="codigo"
                            label="Código"
                            >
                                <Input placeholder="Ingrese el código del medicamento" value = {codigo} onChange = {(e) => setCodigo(e.target.value)}/>
                            </Form.Item>
                
                            <Form.Item
                            name="descripcion"
                            label="Descripción"
                            >
                                <TextArea placeholder="Ingrese una descripción (opcional)" value = {descrip} onChange ={ e => setDescrip(e.target.value) } showCount maxLength={100} />
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" className ="me-4" htmlType="submit">
                                    {editionMode?'Guardar cambios':'Registrar'}
                                </Button>
                                <Button type="primary" danger>
                                    <Link to='/admin/homemedicamentos'>
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

export default FormularioMedicamentos;