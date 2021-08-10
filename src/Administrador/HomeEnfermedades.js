import React from 'react'
import AxiosEnfermedades from '../Services/AxiosEnfermedades';
import { Button, Card, Table, Popconfirm, Breadcrumb, message } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faDiagnoses } from '@fortawesome/free-solid-svg-icons';
import {DeleteOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'

const HomeEnfermedades = (props) => {

  const [dataSource, setDataSource] = React.useState([]);
  const key = 'updatable';
  const [loading, setLoading] = React.useState(true);

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      // sorter: (a, b) => a.codigo.length - b.codigo.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Nombre Largo',
      dataIndex: 'nombreLargo',
      key: 'nombreLargo',
      sorter: (a, b) => a.nombreLargo.length - b.nombreLargo.length,
      sortDirections: ['descend', 'ascend'],
      
    },
    {
      title: 'Nombre corto',
      dataIndex: 'nombreCorto',
      key: 'nombreCorto',
      sorter: (a, b) => a.nombreCorto.length - b.nombreCorto.length,
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
    //   render: (_, record) => <Button onClick = {() => console.log("Action: ",record.id_enfermedad)} type="primary">
    //     <Link to = {`/admin/edit/enfermedades/${record.id_enfermedad}`}>Delete</Link></Button>,
    // }
    {
      title: 'Acción',
      dataIndex: 'accion',
      render: (_, record) =>
        <div className = "text-center">
          <Link to = {`/admin/edit/enfermedades/${record.id_enfermedad}`} className = "me-4">
            {/* <FontAwesomeIcon className="text-center mx-5"  icon={faEye} size="1x" color="blue"/> */}
            <EyeOutlined />
          </Link>
          <Popconfirm title="¿Quiere eliminar este registro?" onConfirm={() => eliminar_enfermedad(record.id_enfermedad)}>
            <Button type="link">
              {/* <FontAwesomeIcon className="text-center mx-5"  icon={faTrashAlt} size="1x" color="red"/> */}
              <DeleteOutlined className = "text-danger" />
            </Button>
          </Popconfirm>
          {/* <Link to = {`/admin/edit/enfermedades/${record.id_enfermedad}`}>
            <FontAwesomeIcon className="text-center mx-5"  icon={faEdit} size="1x" color="orange"/>
          </Link> */}
        </div>,
    } 
  ];


  const eliminar_enfermedad = (id) => {
    message.loading({ content: 'Eliminando registro...', key, duration: 20});
    AxiosEnfermedades.eliminar_enfermedad(id).then( response => {
      console.log("DESCRIPCIÓN: ", response.data[0].descrip)
      let lista = response.data.map( elemento => ({
        id_enfermedad: elemento.id_enfermedad,
        codigo: elemento.codigo,
        descrip: (elemento.descrip+'').substring(0,20)+'...',
        nombreCorto: elemento.nombreCorto,
        nombreLargo: elemento.nombreLargo,
        accion: elemento.id_enfermedad
      }));
      setDataSource(lista);
      message.success({ content: 'Registro eliminado con éxito', key, duration: 3 });

    });
  }


  const mostrar_enfermedades = () => {
    AxiosEnfermedades.mostrar_enfermedades().then( response => {

      let lista = response.data.map( elemento => ({
        id_enfermedad: elemento.id_enfermedad,
        codigo: elemento.codigo !==null? elemento.codigo:'',
        descrip: elemento.descrip !== null?(elemento.descrip).substring(0,20)+'...':'',
        nombreCorto: elemento.nombreCorto !==null? elemento.nombreCorto:'',
        nombreLargo: elemento.nombreLargo !==null? elemento.nombreLargo:'',
        accion: elemento.id_enfermedad
      }));

      setDataSource(lista);
      setLoading(false);
    });
  }

  React.useEffect(() =>{
    mostrar_enfermedades();
    console.log("ID: ", props);
  }, []);

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
      </Breadcrumb>
              <h1 className = "lead text-center mb-4 mt-4 pt-3">
            GESTIONAR ENFERMEDADES
          </h1>
          {/* <hr className= ""/> */}
          <Button

            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            <Link to="/admin/formularioenfermedades">
              Añadir enfermedad
            </Link>
          </Button>
          <Table size = "large" dataSource={dataSource} loading = {loading} columns={columns} rowKey={row=>row.id_enfermedad}/>

      </Card>
    </>
  );
}

export default HomeEnfermedades