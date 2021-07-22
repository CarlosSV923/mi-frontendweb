import React from 'react';
import 'antd/dist/antd.css';
import {Steps, Button, message, Form, Input, Radio, Row, Col, 
        Collapse, Badge, Alert, Divider, Card, Select, InputNumber,
        Upload, Modal, Empty, Avatar} from 'antd'
import {UserOutlined, InfoCircleOutlined, HeartOutlined, 
        PlusSquareOutlined, FileAddOutlined, PlusOutlined, 
        PaperClipOutlined, CalendarOutlined, FileOutlined, 
        LineChartOutlined, MedicineBoxFilled, 
        FileImageOutlined, DatabaseOutlined,
        MinusCircleOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThermometerQuarter,faWeight, faRulerVertical, faMale, 
        faLungs, faHeartbeat, faFileMedicalAlt, faDiagnoses, 
        faPercent, faHandHoldingHeart} from '@fortawesome/free-solid-svg-icons';
import EditableTable from './EditableTable';
import shortid from 'shortid';

import AxiosDiscapacidades from '../Services/AxiosDiscapacidades';
import AxiosMedicamentos from '../Services/AxiosMedicamentos';
import AxiosEnfermedades from '../Services/AxiosEnfermedades';

const { Option } = Select;

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

const alergias = [];
// const discapacidades = [];
const enfermedades_hereditarias = [];
const enfermedades_preexistentes = [];
const enfermedades_persistentes = [];

const enfermedades_diagnostico = [];


enfermedades_diagnostico.push(<Option key={"COVID-19"}>COVID-19</Option>)
enfermedades_diagnostico.push(<Option key={"Dengue 1"}>Dengue 1</Option>)
enfermedades_diagnostico.push(<Option key={"Dengue 2"}>Dengue 2</Option>)
enfermedades_diagnostico.push(<Option key={"Dengue 3"}>Dengue 3</Option>)
enfermedades_diagnostico.push(<Option key={"Dengue 4"}>Dengue 4</Option>)
enfermedades_diagnostico.push(<Option key={"Influenza"}>Influenza</Option>)
enfermedades_diagnostico.push(<Option key={"Bronquitis Aguda"}>Bronquitis Aguda</Option>)

// discapacidades.push(<Option key={"Fisica"}>Física o motora</Option>)
// discapacidades.push(<Option key={"Sensorial"}>Sensorial</Option>)
// discapacidades.push(<Option key={"Psicosocial"}>Psicosocial</Option>)
// discapacidades.push(<Option key={"Intelectual"}>Intelectual</Option>)

enfermedades_preexistentes.push(<Option key={"Cancer"}>Cáncer</Option>)
enfermedades_preexistentes.push(<Option key={"Diabetes"}>Diabetes</Option>)
enfermedades_preexistentes.push(<Option key={"Hipertensión"}>Anemia de células falciformes</Option>)

enfermedades_persistentes.push(<Option key={"VIH"}>Cáncer</Option>)
enfermedades_persistentes.push(<Option key={"HepatitisB"}>Hepatitis B</Option>)
enfermedades_persistentes.push(<Option key={"HepatitisC"}>Hepatitis C</Option>)
enfermedades_persistentes.push(<Option key={"Tuberculosis"}>Tuberculosis</Option>)
enfermedades_persistentes.push(<Option key={"Helmintiasis"}>Helmintiasis</Option>)
enfermedades_persistentes.push(<Option key={"VPH"}>VPH</Option>)

enfermedades_hereditarias.push(<Option key={"Anemia"}>Anemia de células falciformes</Option>)
enfermedades_hereditarias.push(<Option key={"Fibrosis"}>Fibrosis quítica</Option>)
enfermedades_hereditarias.push(<Option key={"Fenilcetonuria"}>Fenilcetonuria</Option>)
enfermedades_hereditarias.push(<Option key={"Enfermedad"}>Enfermedad de Batten</Option>)
enfermedades_hereditarias.push(<Option key={"Hemocromatosis"}>Hemocromatosis</Option>)
enfermedades_hereditarias.push(<Option key={"Hemofilia"}>Hemofilia</Option>)
enfermedades_hereditarias.push(<Option key={"Distrofia"}>Distrofia muscular de Duchenne</Option>)

alergias.push(<Option key={"Amoxicilina"}>Amoxicilina</Option>)
alergias.push(<Option key={"acetil"}>Ácido acetil salicílico</Option>)
alergias.push(<Option key={"Polen"}>Polen</Option>)
alergias.push(<Option key={"El yodo"}>El yodo</Option>)



const { Step } = Steps;

const opciones_discapacidades = [
    { label: 'No', value: false },
    { label: 'Si', value: true },
];

const opciones_alergias = [
    { label: 'No', value: false },
    { label: 'Si', value: true },
];

const { TextArea } = Input;

function onChange(value) {
    console.log('changed', value);
  }

const steps = [
    {
        title: 'general',
        content: 'Second-content',
        icon: InfoCircleOutlined,
    },
    {
        title: 'Signos vitales',
        content: 'First-content',
        icon: HeartOutlined
    },
    {
        title: 'Exámenes',
        content: 'Second-content',
        icon: PlusSquareOutlined,
    },
    {
        title: 'Diagnóstigo y tratamiento',
        content: 'Second-content',
        icon: FileAddOutlined,
    },      
];


const { Panel } = Collapse;

const AtenderCita = () => {  
    const [current, setCurrent] = React.useState(0);
    const [discapacidad, setDiscapacidad] = React.useState(false);
    const [alergia, setAlergia] = React.useState(false);
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');
    const [fileList, setFileList] = React.useState([]);
    const [listaExamenes, setListaExamenes] = React.useState([]);
    const [indice, setIndice] = React.useState(0);
    const [discapacidades, setDiscapacidades] = React.useState([]);
    const [medicamentos, setMedicamentos] = React.useState([]);
    const [enfermedades, setEnfermedades] = React.useState([]);
    // const [enfermedadesSeleccionadas, setEnfermedadesSeleccionadas] = React.useState([]);
    const [discapacidadesSeleccionadas, setDiscapacidadesSeleccionadas] = React.useState([]);
    const [alergiasSeleccionadas, setAlergiasSeleccionadas] = React.useState([]);
    const [enfermedadesPersistentesSeleccionadas, setEnfermedadesPersistentesSeleccionadas] = React.useState([]);
    const [enfermedadesHereditariasSeleccionadas, setEnfermedadesHereditariasSeleccionadas] = React.useState([]);
    const [observaciones, setObservaciones] = React.useState("");
    const [discapacidadesAgregadas, setDiscapacidadesAgregadas] = React.useState("");

    React.useEffect(()=>{
        
        mostrar_discapacidades();
        mostrar_medicamentos();
        mostrar_enfermedades();

    }, []);

    const next = () => {
      console.log("next before");
      console.log(current)
      setCurrent(current + 1);
      console.log("next after");
      console.log(current + 1);
      console.log("");
    };
  
    const onChange4 = e => {
        console.log('radio4 checked', e.target.value);
        setDiscapacidad(e.target.value);
    };

    const onChange6 = e => {
        console.log('radio4 checked', e.target.value);
        setAlergia(e.target.value);
    };

    const handleCancel = () => setPreviewVisible(false);


    const handlePreview = async file => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    

    const handleChange = ({ fileList }) => setFileList(fileList);

    const prev = () => {
      console.log("previous before");
      console.log(current);
      setCurrent(current - 1);
      console.log("previous before");
      console.log(current - 1);
      console.log("");
    };


    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    const add_ex = () => {
        
        const item = 
        <>
            <Divider plain>Examen {indice}</Divider>
            <Row>
                <Col span={24} className="">
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        >
                        {uploadButton}
                    </Upload>
                    <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Col>
            </Row>
        </>;

        setListaExamenes([...listaExamenes,item]);
        setIndice(indice + 1);
    }
    
    const mostrar_discapacidades = () => {
        AxiosDiscapacidades.mostrar_discapacidades().then((res)=>{
            setDiscapacidades(res.data)
            console.log(res.data);
        })
    }

    const mostrar_medicamentos = () => {
        AxiosMedicamentos.mostrar_medicamentos().then( res => {
            setMedicamentos(res.data);
            console.log(res.data);
        });
    }

    const mostrar_enfermedades = () => {
        AxiosEnfermedades.mostrar_enfermedades().then( res => {
            setEnfermedades(res.data);
            console.log(res.data);
        });
    }

    const discapacidades_seleccionadas = (valores_seleccionados) => {
        setDiscapacidadesSeleccionadas(valores_seleccionados)
        console.log("discapacidades_seleccionadas");
        console.log(valores_seleccionados);
        console.log(discapacidadesSeleccionadas);
    }

    const alergias_seleccionadas = (valores_seleccionados) => {
        setAlergiasSeleccionadas(valores_seleccionados);
        console.log("alergias_seleccionadas");
        console.log(valores_seleccionados);
        console.log(alergiasSeleccionadas);
    }

    const enfermedades_persistentes_seleccionadas = (valores_seleccionados) => {
        setEnfermedadesPersistentesSeleccionadas(valores_seleccionados);
        console.log("enfermedades_persistentes_seleccionadas");
        console.log(valores_seleccionados);
        console.log(enfermedadesPersistentesSeleccionadas);
    }

    const enfermedades_hereditarias_seleccionadas = (valores_seleccionados) => {
        setEnfermedadesHereditariasSeleccionadas(valores_seleccionados);
        console.log("enfermedades_hereditarias_seleccionadas");
        console.log(valores_seleccionados);
        console.log(enfermedadesHereditariasSeleccionadas);
    }

    const discapacidades_agregadas = (valores_agregados) => {
        setDiscapacidadesAgregadas(valores_agregados);
        console.log("discapacidades_agregadas");
        console.log(valores_agregados);
        console.log(discapacidadesAgregadas);
    }

    return (
        <>            
            <Row>      
                <Col span={15} className="">
                    <Form onFinish = {valores_agregados => discapacidades_agregadas(valores_agregados)}>
                        <Row>
                            <Col span={24} className="text-center">
                                <h5 className="lead m-4">Atención de cita</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="" span={2}>
                                <Avatar
                                style={{
                                    backgroundColor: '#00AAE4',
                                }}
                                icon={<UserOutlined />}
                                size={60}
                                />
                            </Col>
                            <Col className="" span={15}>
                                <Row className="">
                                    <Col>
                                        <span className="mx-2 lead">Beth Hidalgo</span>           
                                    </Col>
                                    <Col>                                        
                                        <Badge status="processing" text="Cita en curso" 
                                            className="me-2 mt-2 text-success"/> 
                                    </Col>
                                    <Col>
                                        <span className="badge bg-info mt-2">11/07/2021</span>
                                    </Col>
                                </Row>
                                
                                <Row className="">
                                    <span className="ms-2 text-secondary">11/07/1950</span>
                                    <span className="ms-2 text-secondary">72 años</span>
                                    <span className="ms-2 text-secondary">Femenino</span>
                                    <span className="ms-2 text-secondary">email@live.es</span>
                                    {/* <span className="mx-2 text-secondary">Miguel Hidalgo</span>  */}
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Divider></Divider>
                                <Steps current={current} size="small" className="mt-4">
                                    {steps.map(item => (
                                    <Step key={item.title} title={item.title} icon = {<item.icon/>} />
                                    ))}
                                </Steps>                            
                                <Divider></Divider>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <div className="steps-content">
                                    {current === 0?
                                        <>    
                                            {/* <Form> */}
                                                <Card type="inner" className="text-center" title="Antecedentes">
                                                    <Row className="">
                                                        <Col span={24} className="">
                                                            <Form.Item label="Discapacidad">
                                                                <Row>
                                                                    <Col span={5}>
                                                                        <Radio.Group
                                                                        options={opciones_discapacidades}
                                                                        onChange={e => onChange4(e)}
                                                                        value={discapacidad}
                                                                        optionType="button"
                                                                        buttonStyle="solid"
                                                                        />                        
                                                                    </Col>
                                                                </Row>
                                                                
                                                            </Form.Item>                                    
                                                        </Col>
                                                    </Row>
                                                    
                                                    {discapacidad?<>
                                                        
                                                        <Row className="">
                                                            <Col span={24} className="">
                                                                <Form.Item >
                                                                    <Row>
                                                                            <Select mode="tags" className="" onChange = { (valores_seleccionados) => discapacidades_seleccionadas(valores_seleccionados)} placeholder="Seleccione las discapacidades">
                                                                                {
                                                                                    discapacidades.map ( item => 
                                                                                        (
                                                                                            <Option key={item.nombre}>{item.nombre}</Option>
                                                                                        )
                                                                                    )
                                                                                }
                                                                            </Select>                                                                   
                                                                    </Row>
                                                                    
                                                                </Form.Item>                                    
                                                            </Col>
                                                        </Row>

                                                        <Row className="">
                                                            <Col span={24} className="">
                                                                <Form.List name="discapacidades">
                                                                    {(fields, { add, remove }, { errors }) => (
                                                                    <>
                                                                    {fields.map((field) => (
                                                                        <Form.Item
                                                                            required={false}
                                                                            key={field.key}>
                                                                            <Form.Item
                                                                                {...field}
                                                                                validateTrigger={['onChange', 'onBlur']}
                                                                                noStyle>
                                                                                <Input placeholder="Ingrese la discapacidad"
                                                                                style={{ width: '95%' }}/>
                                                                                {fields.length > 0 ? (
                                                                                <MinusCircleOutlined
                                                                                    className="dynamic-delete-button"
                                                                                    onClick={() => remove(field.name)}
                                                                                    style={{ width: '5%' }}/>
                                                                                ) : null}
                                                                            </Form.Item>
                                                                        </Form.Item>
                                                                        ))}
                                                                        <Form.Item>
                                                                            <Button
                                                                                type="dashed"
                                                                                onClick={() => add()}
                                                                                icon={<PlusOutlined />}
                                                                                style={{ width: '100%' }}>
                                                                                Añadir manualmente otra discapacidad
                                                                            </Button>
                                                                            <Form.ErrorList errors={errors} />
                                                                        </Form.Item>
                                                                    </>
                                                                    )}
                                                                </Form.List>
                                                        </Col>
                                                    </Row>

                                                </>:null}


                                                    <Row>
                                                        <Col span={24} className="">
                                                            <Form.Item label="Alergia">
                                                                <Row>
                                                                    <Col className="ps-1" span={7}>
                                                                        <Radio.Group
                                                                        options={opciones_alergias}
                                                                        onChange={e => onChange6(e)}
                                                                        value={alergia}
                                                                        className="ps-3"
                                                                        optionType="button"
                                                                        buttonStyle="solid"
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Form.Item>                                         
                                                        </Col>
                                                    </Row>

                                                    {alergia?<>
                                                        
                                                        <Row className="">
                                                            <Col span={24} className="">
                                                                <Form.Item >
                                                                    <Row>
                                                                            <Select mode="tags" onChange = {(valores_seleccionados) => alergias_seleccionadas(valores_seleccionados)} className="" placeholder="Seleccione las alergias">
                                                                                {
                                                                                    medicamentos.map ( item => 
                                                                                        (
                                                                                            <Option key = {item.codigo}>{item.nombre}</Option>
                                                                                        )
                                                                                    )
                                                                                }
                                                                            </Select>                                                                 
                                                                    </Row>
                                                                    
                                                                </Form.Item>                                    
                                                            </Col>
                                                        </Row>

                                                        <Row className="">
                                                            <Col span={24} className="">
                                                                <Form name="dynamic_form_item">
                                                                    <Form.List name="names">
                                                                        {(fields, { add, remove }, { errors }) => (
                                                                        <>
                                                                            {fields.map((field) => (
                                                                            <Form.Item
                                                                                required={false}
                                                                                key={field.key}>
                                                                                <Form.Item
                                                                                    {...field}
                                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                                    noStyle>
                                                                                    <Input placeholder="Ingrese la discapacidad"
                                                                                    style={{ width: '95%' }}/>
                                                                                    {fields.length > 0 ? (
                                                                                    <MinusCircleOutlined
                                                                                        className="dynamic-delete-button"
                                                                                        onClick={() => remove(field.name)}
                                                                                        style={{ width: '5%' }}/>
                                                                                    ) : null}
                                                                                </Form.Item>
                                                                            </Form.Item>
                                                                            ))}
                                                                            <Form.Item>
                                                                                <Button
                                                                                    type="dashed"
                                                                                    onClick={() => add()}
                                                                                    icon={<PlusOutlined />}
                                                                                    style={{ width: '100%' }}>
                                                                                    Añadir manualmente otra alergia
                                                                                </Button>
                                                                                {/* <Form.ErrorList errors={errors} /> */}
                                                                            </Form.Item>
                                                                        </>
                                                                        )}
                                                                    </Form.List>
                                                                </Form>
                                                            </Col>
                                                        </Row>
                                                    </>:null}


                                                    <Divider plain>Enfermedades persistentes</Divider>
                                                    <Row className="mt-5">
                                                        <Col span={24}>
                                                            <Form.Item>
                                                                <Select mode="tags" placeholder="Seleccione las enfermedades persistentes" onChange={valores_seleccionados => enfermedades_persistentes_seleccionadas(valores_seleccionados)}>
                                                                    {
                                                                        enfermedades.map ( item => 
                                                                            (
                                                                                <Option key = {item.nombreLargo}>{item.nombreLargo}</Option>
                                                                            )
                                                                        )
                                                                    }
                                                                </Select> 
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    
                                                    <Divider plain>Enfermedades hereditarias</Divider>
                                                    <Row className="mt-5">
                                                        <Col span={24}>
                                                            <Form.Item>
                                                                <Select mode="tags" style={{ width: '100%' }} placeholder="Seleccione las enfermedades hereditarias" onChange={(valores_seleccionados) => enfermedades_hereditarias_seleccionadas(valores_seleccionados)}>
                                                                    {
                                                                        enfermedades.map ( item => 
                                                                            (
                                                                                <Option key = {item.nombreLargo}>{item.nombreLargo}</Option>
                                                                            )
                                                                        )
                                                                    }
                                                                </Select> 
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <Divider plain>Observaciones</Divider>
                                                    <Row>
                                                        <Col span={24} className="">
                                                            <TextArea style={{ height: '200%' }} showCount maxLength={100} />
                                                        </Col>
                                                    </Row>
                                                    
                                                </Card>                                              
                                            {/* </Form> */}
                                        </>:null
                                    }
                                    {
                                        current === 1?                
                                        <>    
                                            {/* <Form className=""> */}
                                                <Card type="inner" className="text-center" title="Signos vitales">
                                                    <div className="ms-5 ps-5">

                                                        <Row className="mb-2 ms-5">
                                                            <Col span={1} className="">
                                                                <FontAwesomeIcon icon={faRulerVertical} size="2x" color=""/>
                                                            </Col>
                                                            <Col span={12} className="">
                                                                <span className="mt-2 text-secondary">Estatura</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={200}
                                                                    formatter={value => `${value} cm`}
                                                                    parser={value => value.replace('cm', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-2 ms-5">
                                                            <Col span={1} className="">
                                                                <FontAwesomeIcon icon={faWeight} size="2x" color=""/>
                                                            </Col>
                                                            <Col span={12} className="">
                                                                <span className="mt-2 text-secondary">Peso</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={100}
                                                                    formatter={value => `${value} Kg`}
                                                                    parser={value => value.replace('Kg', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-2 ms-5">
                                                            <Col span={1} className="">
                                                                <FontAwesomeIcon icon={faMale} size="2x" color=""/> 
                                                            </Col>
                                                            <Col span={12} className="">    
                                                                <span className="mt-2 text-secondary">Masa corporal</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={100}
                                                                    formatter={value => `${value} Kg/m2`}
                                                                    parser={value => value.replace('Kg/m2', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-2 ms-5">
                                                            <Col span={1} className="">
                                                                <FontAwesomeIcon icon={faPercent} size="2x" color=""/>
                                                            </Col>
                                                            <Col span={12} className="">
                                                                <span className="mt-2 text-secondary">Porcentaje de grasa corporal</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={100}
                                                                    formatter={value => `${value} %`}
                                                                    parser={value => value.replace('%', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-2 ms-5">
                                                            <Col span={1} className="">    
                                                                <FontAwesomeIcon icon={faHandHoldingHeart} size="2x" color=""/>
                                                            </Col>
                                                            <Col span={12} className="">
                                                                <span className="mt-2 text-secondary">Masa muscular</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={100}
                                                                    formatter={value => `${value} %`}
                                                                    parser={value => value.replace('%', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-2 ms-5">
                                                            <Col span={1} className="">
                                                                <FontAwesomeIcon icon={faFileMedicalAlt} size="2x" color=""/>
                                                            </Col>
                                                            <Col span={12} className="">
                                                                <span className="mt-2 text-secondary">Tensión arterial</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={100}
                                                                    formatter={value => `${value} mmHg`}
                                                                    parser={value => value.replace('mmHg', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-2 ms-5">
                                                            <Col span={1} className="">
                                                                <FontAwesomeIcon icon={faHeartbeat} size="2x" color=""/>
                                                            </Col>
                                                            <Col span={12} className="">
                                                                <span className="mt-2 text-secondary">Frecuencia cardíaca</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={100}
                                                                    formatter={value => `${value} bmp`}
                                                                    parser={value => value.replace('bmp', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-2 ms-5">
                                                            <Col span={1} className="">
                                                                <FontAwesomeIcon icon={faLungs} size="2x" color=""/>
                                                            </Col>
                                                            <Col span={12} className="">
                                                                <span className="mt-2 text-secondary">Frecuencia respiratoria</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={100}
                                                                    formatter={value => `${value} r/m`}
                                                                    parser={value => value.replace('r/m', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-2 ms-5">
                                                            <Col span={1} className="">
                                                                <FontAwesomeIcon icon={faDiagnoses} size="2x" color=""/> 
                                                            </Col>
                                                            <Col span={12} className="">
                                                                <span className="mt-2 text-secondary">Saturación de oxígeno</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={100}
                                                                    formatter={value => `${value}`}
                                                                    parser={value => value.replace('', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="ms-5">
                                                            <Col span={1} className="">
                                                                <FontAwesomeIcon icon={faThermometerQuarter} size="2x" color=""/>
                                                            </Col>
                                                            <Col span={12} className="">
                                                                <span className="mt-2 text-secondary">Temperatura</span>
                                                            </Col>
                                                            <Col span={4} className="">
                                                                <InputNumber
                                                                    defaultValue={0}
                                                                    min={0}
                                                                    max={100}
                                                                    formatter={value => `${value} °C`}
                                                                    parser={value => value.replace('°C', '')}
                                                                    onChange={onChange}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <Row className="mb-2 mt-2">
                                                        <Col span={24} className="">
                                                            <Button
                                                                type="dashed"
                                                                // onClick={() => add()}
                                                                icon={<PlusOutlined />}
                                                                style={{ width: '56%' }}
                                                                >
                                                                Añadir manualmente signo vital
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Card>                                              
                                            {/* </Form> */}
                                        </>:null
                                    }
                                    {
                                        current === 2?                
                                        <>    
                                                <Card type="inner" className="text-center" title="Exámenes">

                                                    {listaExamenes.map(elem => elem )}
                                                    <Row className="mb-2 mt-2">
                                                        <Col span={24} className="">
                                                            <Button 
                                                                type="dashed"
                                                                onClick={add_ex}
                                                                icon={<PlusOutlined />}
                                                                style={{ width: '56%' }}
                                                                >
                                                                Añadir nuevo examen
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Card>                                           
                                        </>:null
                                    }
                                    {
                                        current === 3?
                                        <>    
                                            {/* <Form> */}
                                                <Card type="inner" className="" title="">
                                                    
                                                    <Row className="mb-2">
                                                        <Col span={24}>
                                                            <Card type="inner" className="text-center" title="Diagnóstico">
                                                                <Row className="mb-2">
                                                                    <Col span={24}>
                                                                        <Select mode="tags" style={{ width: '100%' }} placeholder="Seleccione las enfermedades" onChange={handleChange}>

                                                                           {
                                                                                enfermedades.map ( item => 
                                                                                    (
                                                                                        <Option key = {item.nombreLargo}>{item.nombreLargo}</Option>
                                                                                    )
                                                                                )
                                                                            }

                                                                        </Select>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col span={24}>
                                                                        <TextArea showCount maxLength={400} />
                                                                    </Col>
                                                                </Row>
                                                            </Card>
                                                        </Col>
                                                    </Row>
                                                    {/* <Row>
                                                        <Col span = {24}>
                                                            <Select placeholder="Medicamento">
                                                                <Option value="AnmilipilB">Anmilipil</Option>
                                                                <Option value="AnmilipilA">AnmilipilA</Option>
                                                                <Option value="AnmilipilD">AnmilipilD</Option>
                                                            </Select>
                                                        </Col>
                                                    </Row> */}
                                                    <Row className="mb-2">
                                                        <Col span={24}>
                                                            <Card type="inner" className="mb-2" title="Receta de medicamentos">
                                                                <EditableTable className="" />
                                                                <Card type="inner" className="mt-2"> 
                                                                
                                                                </Card>
                                                                <Card type="inner" className="mt-2" title="Instrucciones médicas">
                                                                    <TextArea className="mt-4" showCount maxLength={400} />
                                                                </Card>
                                                            </Card>
                                                            
                                                        </Col>
                                                    </Row>
                                                    
                                                    <Row className="">
                                                        <Col span={24}>
                                                            <Card type="inner" className="" title="Plan de tratamiento">
                                                                <TextArea className="mt-4" showCount maxLength={400} />
                                                            </Card>
                                                        </Col>
                                                    </Row>      

                                                </Card>                                              
                                            {/* </Form> */}
                                        </>:null
                                    }

                                </div>
                            </Col>                            
                        </Row>
                        <Row>
                            <Col span={24} className="mt-4">
                                <div className="steps-action">
                                    {current > 0 && (
                                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                        Anterior
                                    </Button>
                                    )}{current < steps.length - 1 && (
                                        <Button type="primary" onClick={() => next()}>
                                            Siguiente
                                        </Button>
                                        )}
                                        {current === steps.length - 1 && (
                                        <Button type="primary" onClick={() => message.success('Cita finalizada con éxito!')}>
                                            Terminar cita
                                        </Button>
                                            // <Button type="primary" htmlType="submit">
                                            //     Terminar cita
                                            // </Button>
                                        )}
                                </div>            
                            </Col>
                        </Row>
                    </Form>
                </Col>

                <Col span={9} className="ps-2">      
                    <Card size="small" title="Historia Clínica">                        
                        <Row>
                            <Col span = {24}>
                                <Alert
                                    message="Paciente alérgico:"
                                    description="Complejo B"
                                    type="warning"
                                    showIcon
                                    className="ms-3 me-3 mb-3 mt-2"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span = {24}>
                                <Collapse defaultActiveKey={['1']}>
                                    <Panel header="Archivos adjuntos" extra = {<PaperClipOutlined />} key="1">
                                        <Card type="inner" className="text-center mb-1">
                                            <Row>
                                                <Col span={4}>
                                                    <FileImageOutlined className="" />
                                                </Col>
                                                <Col span={12}>
                                                    <a>Encefalograma.pjg</a>
                                                </Col>
                                                <Col span={8}>
                                                    114 KB
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card type="inner" className="text-center mb-1">
                                            <Row>
                                                <Col span={4}>
                                                    <FileImageOutlined className="" />
                                                </Col>
                                                <Col span={12}>
                                                    <a>Examen_sangre.pjg</a>
                                                </Col>
                                                <Col span={8}>
                                                    314 KB
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card type="inner" className="text-center">
                                            <Row>
                                                <Col span={4}>
                                                    <FileImageOutlined className="" />
                                                </Col>
                                                <Col span={12}>
                                                    <a>Examen_abdominal.pjg</a>
                                                </Col>
                                                <Col span={8}>
                                                    614 KB
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Panel>
                                    <Panel header="Citas pasadas" extra = {<CalendarOutlined />} key="2">
                                        <Card type="inner" className="text-center mb-1">
                                            <Row>
                                                <Col span={4}>
                                                    <DatabaseOutlined className="" />
                                                </Col>
                                                <Col span={12}>
                                                    <a>02/02/2020</a>
                                                </Col>
                                            </Row>
                                        </Card>
                                        <Card type="inner" className="text-center mb-1">
                                            <Row>
                                                <Col span={4}>
                                                    <DatabaseOutlined className="" />
                                                </Col>
                                                <Col span={12}>
                                                    <a>02/02/2020</a>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Panel>
                                    <Panel header="Enfermedades anteriores diagnosticadas" extra = {<FileOutlined />} key="3">
                                        <Card type="inner" className="text-center mb-1">
                                            <Row>
                                                <p>Cirugías Previas, Diabetes, Enfermedades Tiroideas, Hipertensión Arterial, Cardiopatias, Traumatismos, Cáncer, Tuberculosis, Transfusiones, Patologías Respiratorias, Patologías Gastrointestinales
                                                </p>
                                            </Row>
                                        </Card>
                                    </Panel>

                                    <Panel header="Medicamentos" extra = {<MedicineBoxFilled />} key="7">
                                        <Empty
                                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                            imageStyle={{
                                            height: 60,
                                            }}
                                            description={
                                            <span>
                                                No hay datos que mostrar
                                            </span>
                                            }
                                        >
                                        </Empty>
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
export default AtenderCita;