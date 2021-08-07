import React from 'react'
import { Button, Card, Table, Popconfirm, Breadcrumb, message } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faDiagnoses } from '@fortawesome/free-solid-svg-icons';
import {DeleteOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'
import AxiosMedicamentos from '../Services/AxiosMedicamentos';

const HomeCitasAtendidas = (props) => {

  const [dataSource, setDataSource] = React.useState([]);
  const key = 'updatable';

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
      sorter: (a, b) => a.codigo.length - b.codigo.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Nombre medicamento',
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
    //   render: (_, record) => <Button onClick = {() => console.log("Action: ",record.id_medicamento)} type="primary">
    //     <Link to = {`/admin/edit/medicamentos/${record.id_medicamento}`}>Delete</Link></Button>,
    // }
    {
      title: 'Acción',
      dataIndex: 'accion',
      render: (_, record) =>
        <div className = "text-center">
          <Link to = {`/admin/edit/medicamentos/${record.id_medicamento}`} className = "me-4">
            {/* <FontAwesomeIcon className="text-center mx-5"  icon={faEye} size="1x" color="blue"/> */}
            <EyeOutlined />
          </Link>
          <Popconfirm title="¿Quiere eliminar este registro?" onConfirm={() => eliminar_medicamento(record.id_medicamento)}>
            <Button type="link">
              {/* <FontAwesomeIcon className="text-center mx-5"  icon={faTrashAlt} size="1x" color="red"/> */}
              <DeleteOutlined className = "text-danger" />
            </Button>
          </Popconfirm>
          {/* <Link to = {`/admin/edit/medicamentos/${record.id_medicamento}`}>
            <FontAwesomeIcon className="text-center mx-5"  icon={faEdit} size="1x" color="orange"/>
          </Link> */}
        </div>,
    } 
  ];


  const eliminar_medicamento = (id) => {
    message.loading({ content: 'Eliminando registro...', key, duration: 20});
    AxiosMedicamentos.eliminar_medicamento(id).then( response => {
      console.log("DESCRIPCIÓN: ", response.data[0].descrip)
      let lista = response.data.map( elemento => ({
        id_medicamento: elemento.id_medicamento,
        codigo: elemento.codigo !==null? elemento.codigo:'',
        descrip: elemento.descrip !== null?(elemento.descrip).substring(0,20)+'...':'Sin descripción',
        nombre: elemento.nombre !==null? elemento.nombre:'',
        accion: elemento.id_medicamento
      }));
      setDataSource(lista);
      message.success({ content: 'Registro eliminado con éxito', key, duration: 3 });

    });
  }


  const mostrar_medicamentos = () => {
    AxiosMedicamentos.mostrar_medicamentos().then( response => {

      let lista = response.data.map( elemento => ({
        id_medicamento: elemento.id_medicamento,
        codigo: elemento.codigo !==null? elemento.codigo:'',
        descrip: elemento.descrip !== null?(elemento.descrip).substring(0,20)+'...':'',
        nombre: elemento.nombre !==null? elemento.nombre:'',
        accion: elemento.id_medicamento
      }));

      setDataSource(lista);

    });
  }

  React.useEffect(() =>{
    mostrar_medicamentos();
    console.log("ID: ", props);
  }, []);

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
      </Breadcrumb>
              <h1 className = "lead text-center mb-4 mt-4 pt-3">
            GESTIONAR MEDICAMENTOS
          </h1>
          {/* <hr className= ""/> */}
          <Button

            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            <Link to="/admin/formulariomedicamentos">
              Añadir medicamento
            </Link>
          </Button>
          <Table size = "large" dataSource={dataSource} columns={columns} rowKey={row=>row.id_medicamento}/>

      </Card>
    </>
  );
}

export default HomeCitasAtendidas;