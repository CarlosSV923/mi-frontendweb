import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Form, Input, message, Cascader, Breadcrumb, Select, Row, Col, Checkbox, Button, AutoComplete, InputNumber, DatePicker, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {DeleteOutlined, EditOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'
  import { faUsers } from '@fortawesome/free-solid-svg-icons';
import AxiosRoles from '../Services/AxiosRoles';
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

const FormularioRoles = (props) => {
    
    const [form] = Form.useForm();
    const [nombre, setNombre] = React.useState("");
    const [descrip, setDescrip] = React.useState("");
    const [editionMode, setEditionMode] = React.useState(useParams().id!==undefined);
    const [rol, setRol] = React.useState({});
    const key = 'updatable';
    const {id} = useParams();

    const onFinish = (values) => {

      if (editionMode){
        actualizar_rol();
        console.log("EDI");
      }else{
        almacenar_rol();
      }

    };
    
    const almacenar_rol = () => {
      message.loading({ content: 'Guardando...', key, duration: 20});
      AxiosRoles.almacenar_rol({nombre: nombre, descrip: descrip}).then((res)=>{
        console.log(res.data);
        props.history.push('/admin/homeroles');
        message.success({ content: 'Guardado con éxito', key, duration: 3 });
      })
    }
  
    const actualizar_rol = () => {
      message.loading({ content: 'Actualizando...', key, duration: 20});
      AxiosRoles.actualizar_rol({"id_rol":id, "nombre": nombre, "descrip": descrip}).then ( response => {
          console.log("actualizar_rol: ",response);
          props.history.push('/admin/homeroles');
          message.success({ content: 'Registro actualizado con éxito', key, duration: 3 });
      });
    }

    const obtener_rol_por_id = () => {

      AxiosRoles.obtener_rol_por_id(id).then( response => {
        setRol(response.data[0]);
        console.log("response: ", (response.data[0]).nombre);
        setNombre((response.data[0]).nombre);
        setDescrip((response.data[0]).descrip);
      });

    }

    React.useEffect(()=>{
      if (editionMode){
        console.log("DDDDDDDDDDDDDDD: ", rol)
        obtener_rol_por_id();
        form.setFieldsValue({
          rol: rol.nombre,
          descripcion: rol.descrip 
        });
      }        
      //mostrar_roles();

    }, [id, form, rol.nombre, rol.descrip]);



    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  
    return (
        <>
            <Card>
                <Breadcrumb>
                  <Breadcrumb.Item href="/admin">
                    <HomeOutlined />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="/admin/homeroles">
                    {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                    <FileSearchOutlined />
                    <span>Gestión roles</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="/admin/edit/roles/:id">
                    {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
                    <EditOutlined />
                    <span>{editionMode? 'Edición rol':'Resgistro rol'}</span>
                  </Breadcrumb.Item>
                </Breadcrumb>
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

export default FormularioRoles;