import React from 'react'
import { Button, Card, Table, Popconfirm, Breadcrumb, message } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faDiagnoses } from '@fortawesome/free-solid-svg-icons';
import {DeleteOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'
import AxiosUsers from '../Services/AxiosUsers';

const HomeUsuarios = (props) => {

  const [dataSource, setDataSource] = React.useState([]);
  const key = 'updatable';
  const [loading, setLoading] = React.useState(true);

  const columns = [
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      key: 'cedula',
      sorter: (a, b) => a.cedula.length - b.cedula.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
      sorter: (a, b) => a.usuario.length - b.usuario.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      sorter: (a, b) => a.nombre.length - b.nombre.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
      sorter: (a, b) => a.apellido.length - b.apellido.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
      sorter: (a, b) => a.rol.length - b.rol.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      sorter: (a, b) => a.estado.length - b.estado.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Acción',
      dataIndex: 'accion',
      render: (_, record) =>
        <div className = "text-center">
          <Link to = {`/admin/edit/usuarios/${record.cedula}`} className = "me-4">
            {/* <FontAwesomeIcon className="text-center mx-5"  icon={faEye} size="1x" color="blue"/> */}
            <EyeOutlined />
          </Link>
          <Popconfirm title="¿Quiere deshabilitar este usuario?" onConfirm={() => deshabilitar_usuario(record.cedula)}>
            <Button type="link">
              {/* <FontAwesomeIcon className="text-center mx-5"  icon={faTrashAlt} size="1x" color="red"/> */}
              <DeleteOutlined className = "text-danger" />
            </Button>
          </Popconfirm>
          {/* <Link to = {`/admin/edit/usuarios/${record.cedula}`}>
            <FontAwesomeIcon className="text-center mx-5"  icon={faEdit} size="1x" color="orange"/>
          </Link> */}
        </div>,
    } 
  ];


  const deshabilitar_usuario = (cedula) => {
    //message.loading({ content: 'Deshabilitando usuario...', key, duration: 20});
    AxiosUsers.deshabilitar_usuario({cedula: cedula}).then( response => {
      console.log("DESHABILI: ", response.data.original)
      let lista = response.data.original.map( elemento => ({
        usuario: elemento.usuario,
        cedula: elemento.cedula,
        nombre: elemento.nombre,
        apellido: elemento.apellido,
        rol: elemento.rol,
        estado: elemento.estado,
        accion: elemento.cedula
      }));

      setDataSource(lista);
      message.success({ content: 'Usuario deshabilitado con éxito', key, duration: 3 });

    });
  }


  const mostrar_usuarios = () => {
    AxiosUsers.mostrar_usuarios().then( response => {
      console.log("usuarios: ",response.data);
      let lista = response.data.map( elemento => ({
        usuario: elemento.usuario,
        cedula: elemento.cedula,
        nombre: elemento.nombre,
        apellido: elemento.apellido,
        rol: elemento.rol,
        estado: elemento.estado,
        accion: elemento.cedula
      }));

      setDataSource(lista);
      setLoading(false);
    });
  }

  React.useEffect(() =>{
    mostrar_usuarios();
    console.log("ID: ", props);
  }, []);

  return (
    <>
      <Card>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/homeusuarios">
          {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
          <FileSearchOutlined />
          <span>Gestión usuarios</span>
        </Breadcrumb.Item>
      </Breadcrumb>
              <h1 className = "lead text-center mb-4 mt-4 pt-3">
            GESTIONAR USUARIOS
          </h1>
          {/* <hr className= ""/> */}
          <Button

            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            <Link to="/admin/formulariousuarios">
              Añadir usuario
            </Link>
          </Button>
          <Table size = "large" dataSource={dataSource} loading = {loading} columns={columns} rowKey={row=>row.cedula}/>

      </Card>
    </>
  );
}

export default HomeUsuarios;