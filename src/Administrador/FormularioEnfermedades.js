import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Form, Input, message, Cascader, Select, Breadcrumb, Row, Col, Checkbox, Button, AutoComplete, InputNumber, DatePicker, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiagnoses, faUsers } from '@fortawesome/free-solid-svg-icons';
import AxiosEnfermedades from '../Services/AxiosEnfermedades';
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

const FormularioEnfermedades = (props) => {
    
    const [form] = Form.useForm();
    const [nombreCorto, setNombreCorto] = React.useState("");
    const [nombreLargo, setNombreLargo] = React.useState("");
    const [codigo, setCodigo] = React.useState("");
    const [descrip, setDescrip] = React.useState("");
    const [editionMode, setEditionMode] = React.useState(useParams().id!==undefined);
    const [enfermedad , setEnfermedad] = React.useState({});
    const key = 'updatable';
    const { id } = useParams();

    const onFinish = (values) => {
      if (editionMode){
        actualizar_enfermedad();
        console.log("EDI");
      }else{
        almacenar_enfermedad();
      }
    };
  
    const almacenar_enfermedad = () => {
      message.loading({ content: 'Guardando...', key, duration: 20});
      AxiosEnfermedades.almacenar_enfermedad({nombreCorto: nombreCorto, nombreLargo:nombreLargo, codigo: codigo, descrip: descrip}).then((res)=>{
        console.log(res.data);
        props.history.push('/admin/homeenfermedades');
        message.success({ content: 'Guardado con éxito', key, duration: 3 });
      });
    }

    const actualizar_enfermedad = () => {
      message.loading({ content: 'Actualizando...', key, duration: 20});
      AxiosEnfermedades.actualizar_enfermedad({"id_enfermedad":id, "nombreCorto": nombreCorto, "nombreLargo": nombreLargo, "codigo": codigo, "descrip": descrip}).then ( response => {
          console.log("actualizar_enfermedad: ",actualizar_enfermedad);
          props.history.push('/admin/homeenfermedades');
          message.success({ content: 'Registro actualizado con éxito', key, duration: 3 });
      });
    }

    const obtener_enfermedad_por_id = () =>{
      AxiosEnfermedades.obtener_enfermedad_por_id(id).then( response => {
        setEnfermedad(response.data[0]);
        console.log("response: ", (response.data[0]).nombreLargo);
        setNombreCorto((response.data[0]).nombreCorto);
        setNombreLargo((response.data[0]).nombreLargo);
        setCodigo((response.data[0]).codigo);
        setDescrip((response.data[0]).descrip);
      });
    }  
    
    React.useEffect(() =>{
      if (editionMode){
        console.log("DDDDDDDDDDDDDDD: ", enfermedad)
        obtener_enfermedad_por_id();
        form.setFieldsValue({
          nlargo: enfermedad.nombreLargo,
          ncorto: enfermedad.nombreCorto,
          codigo: enfermedad.codigo,
          descripcion: enfermedad.descrip 
        });
      }
    }, [id, form, enfermedad.nombreLargo, enfermedad.nombreCorto, enfermedad.codigo, enfermedad.descrip]);

    return (
        <>
            <Card>

            <Breadcrumb>
              <Breadcrumb.Item href="/admin">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/admin/homeenfermedades">
                {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                <FileSearchOutlined />
                <span>Gestión enfermedades</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/admin/edit/enfermedades/:id">
                {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                <EditOutlined />
                <span>{editionMode? 'Edición enfermedad':'Resgistro enfermedad'}</span>
              </Breadcrumb.Item>
            </Breadcrumb>

                <Row>
                    <Col span={24} className="text-center" justify="center">
                        <h5 className="lead m-4">{ editionMode? 'Editar enfermedad': 'Registrar nueva enfermedad'}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mb-4" span={24}>
                        <FontAwesomeIcon icon={faDiagnoses} size="6x" color="#00AAE4"/>
                    </Col>
                </Row>
                <Row className="">
                    <Col span = {20} className="">

                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            // initialValues = {{
                            //   nlargo: nombreLargo,
                            //   ncorto: nombreCorto,
                            //   codigo: codigo,
                            //   descripcion: descrip
                            // }}
                            onFinish={onFinish}
                            scrollToFirstError
                            size="large"
                        >
                
                            <Form.Item
                            name="ncorto"
                            label="Nombre corto"
                            >
                                <Input placeholder="Ingrese el nombre corto de la enfermedad" value = {nombreCorto} onChange = {(e) => setNombreCorto(e.target.value)}/>
                            </Form.Item>
                
                            <Form.Item
                            name="nlargo"
                            label="Nombre largo"
                            >
                                <Input placeholder="Ingrese el nombre largo de la enfermedad" value = {nombreLargo} onChange = {(e) => setNombreLargo(e.target.value)}/>
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
                                <TextArea placeholder="Ingrese una descripción (opcional)" showCount rows = {5} value = {descrip} onChange ={ e => setDescrip(e.target.value) }/>
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" className ="me-4" htmlType="submit">
                                    {editionMode?'Guardar cambios':'Registrar'}
                                </Button>
                                <Button type="primary" danger>
                                    <Link to='/admin/homeenfermedades'>
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

export default FormularioEnfermedades;