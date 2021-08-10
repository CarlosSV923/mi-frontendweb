import React from 'react'
import { Button, Card, Table, Popconfirm, Breadcrumb, message } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faDiagnoses } from '@fortawesome/free-solid-svg-icons';
import {DeleteOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'
import AxiosRoles from '../Services/AxiosRoles';

const HomeRoles = (props) => {

  const [dataSource, setDataSource] = React.useState([]);
  const key = 'updatable';
  const [loading, setLoading] = React.useState(true);

  const columns = [
    {
      title: 'Identificador',
      dataIndex: 'id_rol',
      key: 'id_rol',
      // sorter: (a, b) => a.codigo.length - b.codigo.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Nombre rol',
      dataIndex: 'nombre',
      key: 'nombre',
      sorter: (a, b) => a.nombre.length - b.nombre.length,
      sortDirections: ['descend', 'ascend'],
      
    },
    {
      title: 'Descripción',
      dataIndex: 'descrip',
      key: 'descrip',
    },
    // {
    //   title: 'Acción',
    //   dataIndex: 'accion',
    //   render: (_, record) => <Button onClick = {() => console.log("Action: ",record.id_rol)} type="primary">
    //     <Link to = {`/admin/edit/roles/${record.id_rol}`}>Delete</Link></Button>,
    // }
    {
      title: 'Acción',
      dataIndex: 'accion',
      render: (_, record) =>
        <div className = "text-center">
          <Link to = {`/admin/edit/roles/${record.id_rol}`} className = "me-4">
            {/* <FontAwesomeIcon className="text-center mx-5"  icon={faEye} size="1x" color="blue"/> */}
            <EyeOutlined />
          </Link>
          <Popconfirm title="¿Quiere eliminar este registro?" onConfirm={() => eliminar_rol(record.id_rol)}>
            <Button type="link">
              {/* <FontAwesomeIcon className="text-center mx-5"  icon={faTrashAlt} size="1x" color="red"/> */}
              <DeleteOutlined className = "text-danger" />
            </Button>
          </Popconfirm>
          {/* <Link to = {`/admin/edit/roles/${record.id_rol}`}>
            <FontAwesomeIcon className="text-center mx-5"  icon={faEdit} size="1x" color="orange"/>
          </Link> */}
        </div>,
    } 
  ];


  const eliminar_rol = (id) => {
    message.loading({ content: 'Eliminando registro...', key, duration: 20});
    AxiosRoles.eliminar_rol(id).then( response => {
      console.log("DESCRIPCIÓN: ", response.data[0].descrip)
      let lista = response.data.map( elemento => ({
        id_rol: elemento.id_rol,
        descrip: elemento.descrip !== null?(elemento.descrip).substring(0,20)+'...':'Sin descripción',
        nombre: elemento.nombre !==null? elemento.nombre:'',
        accion: elemento.id_rol
      }));
      setDataSource(lista);
      message.success({ content: 'Registro eliminado con éxito', key, duration: 3 });

    });
  }


  const mostrar_roles = () => {
    AxiosRoles.mostrar_roles().then( response => {

      let lista = response.data.map( elemento => ({
        id_rol: elemento.id_rol,
        // descrip: elemento.descrip !== null?(elemento.descrip).substring(0,20)+'...':'',
        descrip: elemento.descrip !== null?elemento.descrip:'',
        nombre: elemento.nombre !==null? elemento.nombre:'',
        accion: elemento.id_rol
      }));

      setDataSource(lista);
      setLoading(false);
    });
  }

  React.useEffect(() =>{
    mostrar_roles();
    console.log("ID: ", props);
  }, []);

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
      </Breadcrumb>
              <h1 className = "lead text-center mb-4 mt-4 pt-3">
            GESTIONAR ROLES
          </h1>
          {/* <hr className= ""/> */}
          <Button

            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            <Link to="/admin/formularioroles">
              Añadir rol
            </Link>
          </Button>
          <Table size = "large" dataSource={dataSource} loading = {loading} columns={columns} rowKey={row=>row.nombre}/>

      </Card>
    </>
  );
}

export default HomeRoles;