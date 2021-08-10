import React from 'react'
import { Button, Card, Table, Popconfirm, Breadcrumb, message } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faDiagnoses } from '@fortawesome/free-solid-svg-icons';
import {DeleteOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'
import AxiosDiscapacidades from '../Services/AxiosDiscapacidades';

const HomeDiscapacidades = (props) => {

  const [dataSource, setDataSource] = React.useState([]);
  const key = 'updatable';
  const [loading, setLoading] = React.useState(true);

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      sorter: (a, b) => a.codigo.length - b.codigo.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Nombre discapacidad',
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
    //   render: (_, record) => <Button onClick = {() => console.log("Action: ",record.id_discapacidad)} type="primary">
    //     <Link to = {`/admin/edit/discapacidades/${record.id_discapacidad}`}>Delete</Link></Button>,
    // }
    {
      title: 'Acción',
      dataIndex: 'accion',
      render: (_, record) =>
        <div className = "text-center">
          <Link to = {`/admin/edit/discapacidades/${record.id_discapacidad}`} className = "me-4">
            {/* <FontAwesomeIcon className="text-center mx-5"  icon={faEye} size="1x" color="blue"/> */}
            <EyeOutlined />
          </Link>
          <Popconfirm title="¿Quiere eliminar este registro?" onConfirm={() => eliminar_discapacidad(record.id_discapacidad)}>
            <Button type="link">
              {/* <FontAwesomeIcon className="text-center mx-5"  icon={faTrashAlt} size="1x" color="red"/> */}
              <DeleteOutlined className = "text-danger" />
            </Button>
          </Popconfirm>
          {/* <Link to = {`/admin/edit/discapacidades/${record.id_discapacidad}`}>
            <FontAwesomeIcon className="text-center mx-5"  icon={faEdit} size="1x" color="orange"/>
          </Link> */}
        </div>,
    } 
  ];


  const eliminar_discapacidad = (id) => {
    message.loading({ content: 'Eliminando registro...', key, duration: 20});
    AxiosDiscapacidades.eliminar_discapacidad(id).then( response => {
      console.log("DESCRIPCIÓN: ", response.data[0].descrip)
      let lista = response.data.map( elemento => ({
        id_discapacidad: elemento.id_discapacidad,
        codigo: elemento.codigo !==null? elemento.codigo:'',
        descrip: elemento.descrip !== null?(elemento.descrip).substring(0,20)+'...':'Sin descripción',
        nombre: elemento.nombre !==null? elemento.nombre:'',
        accion: elemento.id_discapacidad
      }));
      setDataSource(lista);
      message.success({ content: 'Registro eliminado con éxito', key, duration: 3 });

    });
  }


  const mostrar_discapacidades = () => {
    AxiosDiscapacidades.mostrar_discapacidades().then( response => {

      let lista = response.data.map( elemento => ({
        id_discapacidad: elemento.id_discapacidad,
        codigo: elemento.codigo !==null? elemento.codigo:'',
        descrip: elemento.descrip !== null?(elemento.descrip).substring(0,20)+'...':'',
        nombre: elemento.nombre !==null? elemento.nombre:'',
        accion: elemento.id_discapacidad
      }));

      setDataSource(lista);
      setLoading(false);
    });
  }

  React.useEffect(() =>{
    mostrar_discapacidades();
    console.log("ID: ", props);
  }, []);

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
      </Breadcrumb>
              <h1 className = "lead text-center mb-4 mt-4 pt-3">
            GESTIONAR DISCAPACIDADES
          </h1>
          {/* <hr className= ""/> */}
          <Button

            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            <Link to="/admin/formulariodiscapacidades">
              Añadir discapacidad
            </Link>
          </Button>
          <Table size = "large" dataSource={dataSource} columns={columns} loading = {loading} rowKey={row=>row.id_discapacidad}/>

      </Card>
    </>
  );
}

export default HomeDiscapacidades