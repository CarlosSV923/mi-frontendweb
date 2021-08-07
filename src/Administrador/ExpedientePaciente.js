import React from 'react'
import { Row, Col, Card, Avatar, Button, InputNumber, Alert, Divider, Breadcrumb, message, List, Typography, Tag, Descriptions, Tooltip, Empty } from 'antd';
import {UserOutlined, EyeOutlined, FileSearchOutlined, HomeOutlined, FileOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThermometerQuarter,faWeight, faRulerVertical, faMale, 
        faLungs, faHeartbeat, faFileMedicalAlt, faDiagnoses, 
        faPercent, faHandHoldingHeart, faFileMedical} from '@fortawesome/free-solid-svg-icons';
import AxiosUsers from '../Services/AxiosUsers';
import { useParams } from 'react-router-dom';

const ExpedientePaciente = () => {

    const [estatura, setEstatura] = React.useState(0);
    const [peso, setPeso] = React.useState(0);
    const [masaCorporal, setMasaCorporal] = React.useState(0);
    const [porcentaje, setPorcentaje] = React.useState(0);
    const [masaMuscular, setMasaMuscular] = React.useState(0);
    const [tensionArterial, setTensionArterial] = React.useState(0);
    const [frecuenciaCardiaca, setFrecuenciaCardiaca] = React.useState(0);
    const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = React.useState(0);
    const [saturacion, setSaturacion] = React.useState(0);
    const [temperatura, setTemperatura] = React.useState(0);
    const [paciente, setPaciente] = React.useState({});
    const [infoExpediente, setInfoExpediente] = React.useState([]);
    const [signosVitales, setSignosVitales] = React.useState([]);
    const [alergias, setAlergias] = React.useState([]);
    const [discapacidades, setDiscapacidades] = React.useState([]);
    const [enfermedadadesPersistentes, setEnfermedadesPersistentes] = React.useState([]);
    const [enfermedadesHereditarias, setEnfermedadesHereditarias] = React.useState([]);
    const [citas, setCitas] = React.useState([]);
    const [descripcion, setDiscripcion] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [noData, setNoData] = React.useState(false);

    const key = 'updatable';
    
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ];

    const { ced } = useParams();

    console.log(ced)

    React.useEffect( () => {
        mostrar_informacion_expediente();
    }, []);

    const mostrar_informacion_expediente = () => {
        console.log("Ced: ", {cedula: ced});
        message.loading({ content: 'Cargando expediente...', key, duration: 50});

        AxiosUsers.mostrar_informacion_expediente({cedula: ced}).then ( response => {
            console.log("mostrar_informacion_expediente: ",response.data[6]);
            let info_paciente = response.data[0][0];
            let alergias = response.data[1];
            let discapacidades = response.data[2];
            let enfermedades_persistentes = response.data[3];
            let enfermedades_hereditarias = response.data[4];
            let signos_vitales = response.data[5];
            let citas = response.data[6];
            let d = "";
            if (response.data[1].length !== 0){
                for (let i = 0; i < response.data[1].length; i++){
                    // d = d + response.data[1][i].nombre_alergia + ' ,';
                    if (i === response.data[1].length -1){
                        d = d + response.data[1][i].nombre_alergia;                    
                    }else{
                        d = d + response.data[1][i].nombre_alergia + ', ';
                    }
                }
                setDiscripcion(d);
            }
            setInfoExpediente(response.data);
            setPaciente(response.data[0][0]);
            setSignosVitales(response.data[5]);
            setAlergias(response.data[1]);
            setDiscapacidades(response.data[2]);
            setEnfermedadesPersistentes(response.data[3]);
            setEnfermedadesHereditarias(response.data[4]);
            setCitas(response.data[6]);
            setLoading(false);
            message.success({ content: 'Mostrando expediente', key, duration: 3 });

        }).catch ( err =>{
            setNoData(true)
            message.success({ content: 'No existe expediente', key, duration: 3 });
            console.log("err: ", err);
        });
    }

    return (
        
        noData?<div>

            <Card>

                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/medico/homepacientes">
                        <FileSearchOutlined />
                        <span>Gestión usuarios</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/medico/homepacientes/expedientepaciente/${ced}`}>
                        <FileOutlined/>
                        <span>Expediente</span>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Empty 
                    style={{
                        marginTop: 160,
                        marginBottom: 170,
                    }}
                    description={<>
                        <span>
                            No existe expediente para el paciente
                        </span>
                        <br/>
                        <Button className = "mt-2" type="primary">
                            <Link to="/medico/homepacientes">
                                Regresar a gestión de pacientes
                            </Link>
                        </Button>
                        </>
                } />
            </Card>

        </div>: loading?
        
        <Card>

        <Breadcrumb>
            <Breadcrumb.Item href="/admin">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/medico/homepacientes">
                <FileSearchOutlined />
                <span>Gestión usuarios</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href={`/medico/homepacientes/expedientepaciente/${ced}`}>
                <FileOutlined/>
                <span>Expediente</span>
            </Breadcrumb.Item>
        </Breadcrumb>

        <Empty 
            style={{
                marginTop: 160,
                marginBottom: 170,
            }}
            description={<>
                <span>
                    Cargando ...
                </span>
                <br/>
                
                </>
        } />
    </Card>:


        <div>

            <Card>
                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/medico/homepacientes">
                        <FileSearchOutlined />
                        <span>Gestión usuarios</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href={`/medico/homepacientes/expedientepaciente/${ced}`}>
                        <FileOutlined/>
                        <span>Expediente</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <p className="lead text-center">EXPEDIENTE</p>
                <Row>
                    <Col span = {8}>
                        <Row>
                            <Col span = {24}>
                                <Card>
                                    <Row className = "">
                                        <Col className="" span={5}>
                                            <Avatar
                                            style={{
                                                backgroundColor: '#00AAE4',
                                            }}
                                            icon={<UserOutlined />}
                                            size={60}
                                            />
                                        </Col>
                                        <Col className="" span={19}>
                                            <Row className="">
                                                <Col> 
                                                    <span className="mx-2 lead">{paciente.nombre} {paciente.apellido}</span>           
                                                </Col>
                                            </Row>
                                            
                                            <Row className="">
                                                <span className="ms-2 text-secondary">{paciente.fecha_nacimiento}</span>
                                                <span className="ms-2 text-secondary">{(moment(moment(paciente.fecha_nacimiento).format('YYYY-MM-DD'),'YYYYMMDD').fromNow()).substring(4,12)}</span>
                                                {/* <span className="ms-2 text-secondary">{moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}</span> */}
                                                <span className="ms-2 text-secondary">{paciente.sexo === 'M'? 'Masculino': paciente.sexo === 'F'? 'Femenino': 'Prefiero no decirlo' }</span>
                                                <span className="ms-2 text-secondary">{paciente.correo}</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>                                
                            </Col>
                        </Row>

                        <Row className = "mt-3">
                            <Col span = {24}>                       
                                <Card size = "small" className = "lead" title="Últimos signos vitales registrados">

                                    {
                                        signosVitales.length === 0?
                                        
                                        <>
                                            <Row className="mb-4 mt-3">
                                            <Col span={24} className="">
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                            </Col>
                                            </Row>
                                        </>:
                                        
                                        <>

                                    {signosVitales.map( item => 
                                        <Row className="mb-4 ms-4 ps-2 mt-3">
                                            <Col span={2} className="">
                                                <FontAwesomeIcon icon={ item.key === 'Estatura'?faRulerVertical:
                                                                        item.key === 'Peso'? faWeight:
                                                                        item.key === 'Masa Coporal'? faMale:
                                                                        item.key === 'Porcentaje de grasa corporal'? faPercent:
                                                                        item.key === 'Masa muscular'? faHandHoldingHeart:
                                                                        item.key === 'Tensión arterial'? faFileMedicalAlt:
                                                                        item.key === 'Frecuencia cardíaca'? faHeartbeat:
                                                                        item.key === 'Frecuencia respiratoria'? faLungs:
                                                                        item.key === 'Saturación de oxígeno'? faDiagnoses:
                                                                        item.key === 'Temperatura'? faThermometerQuarter:
                                                                        faFileMedical
                                                                        } size="2x" color="#00AAE4"/>
                                            </Col>
                                            <Col span={14} className="">
                                                <span className="mt-2 ps-5 text-secondary">{ item.key === 'Porcentaje de grasa corporal'? 'Grasa corporal' :
                                                                                            item.key ===  'Tensión arterial'?'T. arterial':
                                                                                            item.key ===  'Frecuencia cardíaca'?'F. cardíaca':
                                                                                            item.key ===  'Frecuencia respiratoria'?'F. respiratoria':
                                                                                            item.key ===  'Saturación de oxígeno'?'S. de oxígeno':
                                                                                            item.key}</span>
                                            </Col>
                                            <Col span={6} className="">
                                                <b>{item.value} {item.unidad}</b>
                                            </Col>
                                        </Row>
                                                                            
                                    )}

                                        </>
                                    }


                                </Card>
                            </Col>
                        </Row>

                    </Col>

                    <Col className = "ps-3" span = {16}>

                        <Row>
                            <Col span = {24}>

                                

                                <Card size = "small" title="Antecedentes" >
                                    <Row>
                                        <Col span = {24}>
                                            {
                                                descripcion === ""?<Alert className = "text-center" message="No se registran alergias" type="success"/>:
                                                <Alert className = "mt-2" message="El paciente tiene las siguientes alergias a estos medicamentos:" description = {descripcion} type="warning" showIcon />
                                            }
                                            {/* <Alert className = "text-center" message="El paciente no tiene alergias conocidas" type="success"/> */}
                                            
                                            

                                        </Col>
                                    </Row>
  
                                    <Row>
                                        <Col span = {24}>
                                            <Card bordered className = "mt-2">
                                                <Divider className = "text-info" plain>
                                                    Discapacidades
                                                </Divider>
                                                {
                                                    discapacidades.length === 0? <>
                                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                    </>:
                                                    <>
                                                        {
                                                            discapacidades.map ( item =>
                                                                <Tag className = "mt-1">{item.nombre_discapacidad}</Tag>                                                        
                                                            )
                                                        }

                                                    </>
                                                }
                                                
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span = {12}>
                                            <Card bordered className = "mt-2">
                                                <Divider className = "text-info" plain>
                                                    Enfermedades persistentes
                                                </Divider>

                                                {
                                                    enfermedadadesPersistentes.length === 0? <>
                                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                    </>:
                                                    <>
                                                            {
                                                                enfermedadadesPersistentes.map ( item =>
                                                                    <Tag className = "mt-1">{item.nombre_enfermedad}</Tag>                                                        
                                                                )
                                                            }
                                                    </>
                                                }
                                            </Card>
                                        </Col>
                                        <Col span = {12}>
                                            <Card bordered className = "mt-2 ms-2">
                                                <Divider className = "text-info" plain>
                                                    Enfermedades hereditarias
                                                </Divider>
                                                
                                                {
                                                    enfermedadesHereditarias.length === 0?<>
                                                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                    </>:
                                                    <>
                                                        {
                                                            enfermedadesHereditarias.map ( item =>
                                                                <Tag className = "mt-1">{item.nombre_enfermedad}</Tag>                                                        
                                                            )
                                                        }
                                                    </>
                                                }
                                            </Card>
                                        </Col>
                                    </Row>                            
                                </Card>
                            </Col>
                        </Row>

                        <Row className = "mt-3">
                            <Col span = {24}>
                                <Card title = "Citas anteriores " size = "small">

                                    {
                                        citas.length === 0? <>
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </>:
                                        <>

                                                {citas.map( item => 


                                                    <Tooltip title="Abrir cita">
                                                    <Link to = {`/medico/citaanterior/paciente/${item.id_cita}/${ced}`} className = "me-4">
                                                        
                                                        <Row>
                                                            <Col span = {16} className = "ms-5 ps-5">
                                                            

                                                                <Card className = "ms-5 mt-2">

                                                                    <Row className = "text-center">
                                                                        <Col span = {2}>
                                                                            <Row>
                                                                                <Col span = {24} className = "lead">
                                                                                    {
                                                                                        ((moment(item.fecha_atencion).format('YYYY-MM-DD')+'').split('-')[2])
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col span = {24} className = "lead">
                                                                                    {
                                                                                        ((moment(item.fecha_atencion).format('YYYY-MM-DD')+'').split('-')[1])
                                                                                    }
                                                                                </Col>
                                                                                
                                                                            </Row>
                                                                            <Row>
                                                                                <Col span = {24} className = "lead">
                                                                                    {
                                                                                        ((moment(item.fecha_atencion).format('YYYY-MM-DD')+'').split('-')[0])
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>

                                                                        <Col span = {12}>
                                                                            <Row>
                                                                                <Col span = {24} className = "lead ms-5 mt-2 pt-4">
                                                                                    {item.nombre} {item.apellido}
                                                                                </Col>
                                                                            </Row>
                                                                            {/* <Row span = {24}>
                                                                                <Col>
                                                                                    2020
                                                                                </Col>
                                                                            </Row> */}
                                                                        </Col>
                                                                    
                                                                        <Col span = {2}>
                                                                            <Row>
                                                                                <Col className = "lead mt-2 pt-4 ms-5 ps-5">
                                                                                    <EyeOutlined />
                                                                                </Col>
                                                                            </Row>
                                                                            {/* <Row span = {24}>
                                                                                <Col>
                                                                                    2020
                                                                                </Col>
                                                                            </Row> */}
                                                                        </Col>

                                                                    </Row>
                                                                </Card>
                                                            </Col>
                                                        </Row>
                                                    </Link>
                                                </Tooltip>



                                                )

                                                }
                                        </>
                                    }









                                    {/* <Link to = "/medico/id">
                                        <Descriptions title="">
                                            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                                            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                                            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                                            <Descriptions.Item label="Remark">empty</Descriptions.Item>
                                            <Descriptions.Item label="Address">
                                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                                            </Descriptions.Item>
                                        </Descriptions>                                    
                                    </Link> */}


                                </Card>

                            </Col>

                        </Row>

                    </Col>


                </Row>

            </Card>


        </div>
    )
}

export default ExpedientePaciente
