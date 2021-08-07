import React from 'react'
import { Button, Card, Table, Popconfirm, Breadcrumb, message, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faDiagnoses } from '@fortawesome/free-solid-svg-icons';
import {DeleteOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, UserOutlined} from '@ant-design/icons'
import AxiosUsers from '../Services/AxiosUsers';
import moment from 'moment';

const HomePacientes = (props) => {

  const [dataSource, setDataSource] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const key = 'updatable';

  const columns = [
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      key: 'cedula',
      sorter: (a, b) => a.cedula.length - b.cedula.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
      sorter: (a, b) => a.nombres.length - b.nombres.length,
      sortDirections: ['descend', 'ascend'],
    },
    /* {(moment(moment(fechaNacimiento).format('YYYY-MM-DD'),'YYYYMMDD').fromNow()).substring(4,12)} */
    {
      title: 'Edad',
      dataIndex: 'edad',
      key: 'edad',
      sorter: (a, b) => a.edad.length - b.edad.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
      sorter: (a, b) => a.correo.length - b.correo.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
      sorter: (a, b) => a.correo.length - b.correo.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Acción',
      dataIndex: 'accion',
      render: (_, record) =>
        <div className = "text-center">
          <Tooltip title="Abrir expediente">
            <Link to = {`/medico/homepacientes/expedientepaciente/${record.cedula}`} className = "me-4">
              <EyeOutlined />
            </Link>
          </Tooltip>
          {/* <Popconfirm title="¿Quiere deshabilitar este paciente?" onConfirm={() => deshabilitar_paciente(record.cedula)}>
            <Button type="link">
              <DeleteOutlined className = "text-danger" />
            </Button>
          </Popconfirm> */}
          {/* <Link to = {`/medico/edit/pacientes/${record.cedula}`}>
            <FontAwesomeIcon className="text-center mx-5"  icon={faEdit} size="1x" color="orange"/>
          </Link> */}
        </div>,
    } 
  ];


  const deshabilitar_paciente = (cedula) => {
    //message.loading({ content: 'Deshabilitando paciente...', key, duration: 20});
    AxiosUsers.deshabilitar_paciente({cedula: cedula}).then( response => {
      console.log("DESHABILI: ", response.data.original)
      let lista = response.data.original.map( elemento => ({
        cedula: elemento.cedula,
        nombres: elemento.nombre +' '+elemento.apellido,
        apellido: elemento.apellido,
        rol: elemento.rol,
        estado: elemento.estado,
        accion: elemento.cedula
      }));

      setDataSource(lista);
      message.success({ content: 'Paciente deshabilitado con éxito', key, duration: 3 });

    });
  }


  const mostrar_pacientes = () => {
    AxiosUsers.mostrar_pacientes().then( response => {
      console.log("pacientes: ",response.data);
      let lista = response.data.map( elemento => ({
        cedula: elemento.cedula,
        nombres: elemento.nombre +' '+elemento.apellido,
        edad: (moment(moment(elemento.fecha_nacimiento).format('YYYY-MM-DD'),'YYYYMMDD').fromNow()).substring(4,12) ,
        sexo: elemento.sexo === 'M'? 'Masculino': elemento.sexo === 'F'? 'Femenino': 'Prefiero no decirlo' ,
        correo: elemento.correo,
        accion: elemento.cedula
      }));
      setDataSource(lista);
      setLoading(false)
    });
  }

  React.useEffect(() =>{
    mostrar_pacientes();
    console.log("ID: ", props);
  }, []);

  return (
    <>
      <Card>
      <Breadcrumb>
        <Breadcrumb.Item href="/medico">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/medico/homepacientes">
          {/* <FontAwesomeIcon icon = {faDiagnoses} size = "1x" /> */}
          <FileSearchOutlined />
          <span>Gestión pacientes</span>
        </Breadcrumb.Item>
      </Breadcrumb>
              <h1 className = "lead text-center mb-2 mt-4 pt-3">
            GESTIONAR PACIENTES
          </h1>
          {/* <hr className= ""/> */}
          <Button

            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            {/* <Link to="/medico/formulariopacientes">
              Añadir paciente
            </Link> */}
          </Button>
          <Table size = "large" dataSource={dataSource} columns={columns} loading = {loading} rowKey={row=>row.cedula}/>

      </Card>
    </>
  );
}

export default HomePacientes;