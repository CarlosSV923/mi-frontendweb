import React from 'react';
import 'antd/dist/antd.css';
import {Steps, Button, message, Form, Input, Radio, Row, Col, Collapse, Badge, Dropdown, Menu, Alert, Divider, Card, Select, InputNumber, Upload, Modal, Empty, Avatar} from 'antd'
import { UserOutlined, 
         SolutionOutlined, 
         LoadingOutlined, 
         SmileOutlined, DownOutlined, InfoCircleOutlined, HeartOutlined, PlusSquareOutlined, FileAddOutlined, InboxOutlined, PlusOutlined, PaperClipOutlined, CalendarOutlined, FileOutlined, LineChartOutlined, PlusCircleOutlined,MedicineBoxFilled, FileImageOutlined, CopyOutlined, FileSearchOutlined, DatabaseOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faThermometerQuarter,faWeight, faRulerVertical, faMale, faTachometerAlt, faTablets, faSyringe, faPrescriptionBottle, faNotesMedical, faMedkit, faLaugh, faLungs, faHospital, faHospitalAlt, faHospitalSymbol, faHospitalUser, faHeartbeat, faHeart, faFileSignature, faFileMedical, faFileMedicalAlt, faDiagnoses, faPercent, faHandHoldingHeart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import EditableTable from './EditableTable';

const { Option } = Select;

const { Dragger } = Upload;

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}



const alergias = [];

const discapacidades = [];

const enfermedades_hereditarias = [];

const enfermedades_preexistentes = [];

const enfermedades_diagnostico = [];

enfermedades_diagnostico.push(<Option key={"COVID-19"}>COVID-19</Option>)
enfermedades_diagnostico.push(<Option key={"Dengue 1"}>Dengue 1</Option>)
enfermedades_diagnostico.push(<Option key={"Dengue 2"}>Dengue 2</Option>)
enfermedades_diagnostico.push(<Option key={"Dengue 3"}>Dengue 3</Option>)
enfermedades_diagnostico.push(<Option key={"Dengue 4"}>Dengue 4</Option>)
enfermedades_diagnostico.push(<Option key={"Influenza"}>Influenza</Option>)
enfermedades_diagnostico.push(<Option key={"Bronquitis Aguda"}>Bronquitis Aguda</Option>)


discapacidades.push(<Option key={"Fisica"}>Física o motora</Option>)
discapacidades.push(<Option key={"Sensorial"}>Sensorial</Option>)
discapacidades.push(<Option key={"Psicosocial"}>Psicosocial</Option>)
discapacidades.push(<Option key={"Intelectual"}>Intelectual</Option>)


enfermedades_preexistentes.push(<Option key={"Cancer"}>Cáncer</Option>)
enfermedades_preexistentes.push(<Option key={"Diabetes"}>Diabetes</Option>)
enfermedades_preexistentes.push(<Option key={"Hipertensión"}>Anemia de células falciformes</Option>)

enfermedades_hereditarias.push(<Option key={"Anemia"}>Anemia de células falciformes</Option>)
enfermedades_hereditarias.push(<Option key={"Fibrosis"}>Fibrosis quítica</Option>)
enfermedades_hereditarias.push(<Option key={"Fenilcetonuria"}>Fenilcetonuria</Option>)
enfermedades_hereditarias.push(<Option key={"Enfermedad"}>Enfermedad de Batten</Option>)
enfermedades_hereditarias.push(<Option key={"Hemocromatosis"}>Hemocromatosis</Option>)
enfermedades_hereditarias.push(<Option key={"Hemofilia"}>Hemofilia</Option>)
enfermedades_hereditarias.push(<Option key={"Distrofia"}>Distrofia muscular de Duchenne</Option>)

alergias.push(<Option key={"Asma"}>Asma</Option>)
alergias.push(<Option key={"Rinitis"}>Rinitis</Option>)
alergias.push(<Option key={"Conjuntivitis"}>Conjuntivitis</Option>)
alergias.push(<Option key={"Dermatitis"}>Dermatitis</Option>)
alergias.push(<Option key={"Eccema"}>Eccema</Option>)
alergias.push(<Option key={"Urticacia"}>Urticacia</Option>)

const { Step } = Steps;

function handleChange(value) {
    console.log(`selected ${value}`);
  }
//opciones_discapacidades

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

function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }
  
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Física o motora
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Sensorial
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        Psicosocial
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        Intelectual
      </Menu.Item>
    </Menu>
  );

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

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);

const AtenderCita = () => {  

    const [current, setCurrent] = React.useState(0);
    const [discapacidad, setDiscapacidad] = React.useState(false);
    const [discapacidadNo, setDiscapacidadNo] = React.useState(false);

    const [alergia, setAlergia] = React.useState(false);
    const [alergiaNo, setAlergiaNo] = React.useState(false);

    // const [state, setState] = React.useState();

    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [previewTitle, setPreviewTitle] = React.useState('');

    
    const [fileList, setFileList] = React.useState([]);
    
    React.useEffect(()=>{
        setFileList([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2017/10/11/14/51/bn7_eeg_results-8col.jpg',
            },
            {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2017/10/11/14/51/bn7_eeg_results-8col.jpg',
            },
            {
                uid: '-3',
                name: 'image.png',
                status: 'done',
                url: 'https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2017/10/11/14/51/bn7_eeg_results-8col.jpg',
            },
            {
                uid: '-4',
                name: 'image.png',
                status: 'done',
                url: 'https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2017/10/11/14/51/bn7_eeg_results-8col.jpg',
            },
        ]);
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
        // this.setState({
        //   value4: e.target.value,
        // });
    };

    const onChange6 = e => {
        console.log('radio4 checked', e.target.value);
        setAlergia(e.target.value);
        // this.setState({
        //   value4: e.target.value,
        // });
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

    const cambiar_estado_si = (e) =>{
        console.log("XX: ",e.target.checked);
        setDiscapacidad(true);    
        setDiscapacidadNo(false);    

    }

    const cambiar_estado_no = (e) =>{
        setDiscapacidadNo(true);
        setDiscapacidad(false)
    }

    const cambiar_estado_alergia = (e) =>{
        console.log("B: ",discapacidad);
        setAlergia(true);
        setAlergiaNo(false);
        console.log("A: ",discapacidad)
    }

    const cambiar_estado_alergia_no = (e) =>{
        console.log("B: ",discapacidad);
        setAlergia(false);
        setAlergiaNo(true);
        console.log("A: ",discapacidad)
    }

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    return (
        <>
            
            <Row>
                
                <Col span={15} className="">
                    <Form>
                        <Row>
                            <Col span={24} className="text-center">
                                <h5 className="lead m-4">Atención de cita</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="" span={2}>
                                {/* <FontAwesomeIcon icon={faUserCircle} size="4x" color="blue"/> */}
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
                                    {/* <Col>
                                    </Col>
                                    <Col>
                                    </Col> */}
                                    <Col>
                                        <span className="badge bg-info mt-2">11/07/2021</span>
                                    </Col>
                                    
                                    {/* <Button>Default Button</Button> */}
                                </Row>
                                <Row className="">
                                    <span className="ms-2 text-secondary">11/07/1950</span>
                                    <span className="ms-2 text-secondary">72 años</span>
                                    <span className="ms-2 text-secondary">Femenino</span>
                                    <span className="ms-2 text-secondary">email@live.es</span>
                                    {/* <span className="mx-2 text-secondary">Miguel Hidalgo</span>  */}
                                </Row>

                            </Col>
                            {/* <Col span={7} className="justify-content-center">
                                <Button className="float-end mt-2 me-4" type="primary">Terminar cita</Button>
                            </Col> */}
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
                                    {
                                        current === 0?
                                        <>    
                                            <Form>
                                                <Card type="inner" className="text-center" title="Antecedentes">
                                                    <Row className="">
                                                        <Col span={24} className="">
                                                            <Form.Item label="Discapacidad">
                                                                <Row>
                                                                    <Col>
                                                                        <Radio.Group
                                                                        options={opciones_discapacidades}
                                                                        onChange={e => onChange4(e)}
                                                                        value={discapacidad}
                                                                        optionType="button"
                                                                        buttonStyle="solid"
                                                                        />
                                                                      
                                                                    </Col>
                                                                </Row>
                                                                {discapacidad?<Row>
                                                                    <Col span={24} className="mt-3">
                                                                        {discapacidad?
                                                                            <Select mode="tags" style={{ width: '100%' }} placeholder="Seleccione las discapacidades" onChange={handleChange}>
                                                                            {discapacidades}
                                                                          </Select>:null}
                                                                    </Col>
                                                                </Row>:null}
                                                                
                                                                {discapacidad?<Row>
                                                                    <Col span={24} className="mt-2 ">
                                                                        <TextArea showCount maxLength={100} />
                                                                    </Col>
                                                                </Row>:null}

                                                            </Form.Item>
                                                                                                       
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                    <Col span={24} className="me-4">
                                                            <Form.Item label="Alergia">
                                                                <Row>
                                                                    <Col>

                                                                        <Radio.Group
                                                                        options={opciones_alergias}
                                                                        onChange={e => onChange6(e)}
                                                                        value={alergia}
                                                                        optionType="button"
                                                                        buttonStyle="solid"
                                                                        />

                                                                    </Col>
                                                                </Row>
                                                                {alergia?<Row>
                                                                    <Col span={24} className="mt-3">
                                                                        {alergia?
                                                                            <Select mode="tags" style={{ width: '100%' }} placeholder="Seleccione las alergias" onChange={handleChange}>
                                                                            {alergias}
                                                                          </Select>:null}
                                                                    </Col>
                                                                </Row>:null}
                                                                {alergia?<Row>
                                                                    <Col span={24} className="mt-2 ">
                                                                        <TextArea showCount maxLength={100} />
                                                                    </Col>
                                                                </Row>:null}
                                                            </Form.Item>                                         
                                                        </Col>
                                                    </Row>
                                                    <Divider plain>Enfermedades preexistentes</Divider>
                                                    <Row>
                                                        <Col span={24}>
                                                            <Form.Item>
                                                                <Select mode="tags" style={{ width: '100%' }} placeholder="Seleccione las enfermedades preexistentes" onChange={handleChange}>
                                                                            {enfermedades_preexistentes}
                                                                </Select> 
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={24} className="">
                                                            <TextArea showCount maxLength={100} />
                                                        </Col>
                                                    </Row>
                                                    <Divider plain>Enfermedades hereditarias</Divider>
                                                    <Row>
                                                        <Col span={24}>
                                                            <Form.Item>
                                                                <Select mode="tags" style={{ width: '100%' }} placeholder="Seleccione las enfermedades hereditarias" onChange={handleChange}>
                                                                        {enfermedades_hereditarias}
                                                                </Select> 
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={24} className="">
                                                            <TextArea showCount maxLength={100} />
                                                        </Col>
                                                    </Row>
                                                </Card>                                              
                                            </Form>
                                        </>:null
                                    }
                                    {
                                        current === 1?                
                                        <>    
                                            <Form className="">
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

                                                </Card>                                              
                                            </Form>
                                        </>:null
                                    }
                                    {
                                        current === 2?                
                                        <>    
                                                <Card type="inner" className="text-center" title="Exámenes">
                                                        <Row>

                                                            <Col span={24} className="">
                                                                {/* <Dragger {...props}>
                                                                    <p className="ant-upload-drag-icon">
                                                                    <InboxOutlined />
                                                                    </p>
                                                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                                    <p className="ant-upload-hint">
                                                                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                                                    band files
                                                                    </p>
                                                                </Dragger>                             */}
                                                                <Upload
                                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                    listType="picture-card"
                                                                    fileList={fileList}
                                                                    onPreview={handlePreview}
                                                                    onChange={handleChange}
                                                                    >
                                                                    {/* {fileList.length >= 8 ? null : uploadButton} */}
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
                                                        <Row>
                                                            <Col span={24} className="mt-2">
                                                                <TextArea showCount maxLength={100} />
                                                            </Col>
                                                    </Row>
                                                </Card>                                              
                                        </>:null
                                    }
                                    {
                                        current === 3?
                                        <>    
                                            <Form>
                                                <Card type="inner" className="" title="">
                                                    
                                                    <Row className="mb-2">
                                                        <Col span={24}>
                                                            {/* <Card type="inner" className="text-center" title="">
                                                                li
                                                            </Card> */}
                                                            <Card type="inner" className="text-center" title="Diagnóstico">
                                                                <Row className="mb-2">
                                                                    <Col span={24}>
                                                                        <Select mode="tags" style={{ width: '100%' }} placeholder="Seleccione las enfermedades" onChange={handleChange}>
                                                                            {enfermedades_diagnostico}
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
                                                    <Row className="mb-2">
                                                        <Col span={24}>
                                                            <Card type="inner" className="text-center" title="Procedimiento">
                                                                    <TextArea showCount maxLength={400} />
                                                            </Card>
                                                        </Col>
                                                    </Row>

                                                    {/* <Row className="mb-2">
                                                        <Col span={24}>
                                                            <Card type="inner" className="mb-2" title="Receta de medicamentos">
                                                                <EditableTable className="" />
                                                            </Card>
                                                        </Col>
                                                    </Row> */}

                                                    <Row className="mb-2">


                                                        <Col span={24}>
                                                            <Card type="inner" className="mb-2" title="Receta de medicamentos">
                                                                <EditableTable className="" />
                                                                {/* <TextArea showCount maxLength={400} /> */}
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
                                            </Form>
                                        </>:null
                                    }


                                    {/* {steps[current].content} */}
                                
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
                                        {/* {text} */}
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
                                        {/* {text} */}
                                        <Card type="inner" className="text-center mb-1">
                                            <Row>
                                                <Col span={4}>
                                                    <DatabaseOutlined className="" />
                                                </Col>
                                                <Col span={12}>
                                                    <a>02/02/2020</a>
                                                </Col>
                                                {/* <Col span={8}>
                                                    114 KB
                                                </Col> */}
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
                                                {/* <Col span={8}>
                                                    114 KB
                                                </Col> */}
                                            </Row>
                                        </Card>
                                    </Panel>
                                    <Panel header="Antecedentes clínicos" extra = {<FileOutlined />} key="3">
                                        {/* {text} */}
                                        <Card type="inner" className="text-center mb-1">
                                            <Row>
                                                <p>Cirugías Previas, Diabetes, Enfermedades Tiroideas, Hipertensión Arterial, Cardiopatias, Traumatismos, Cáncer, Tuberculosis, Transfusiones, Patologías Respiratorias, Patologías Gastrointestinales
                                                </p>
                                            </Row>
                                        </Card>
                                    </Panel>
                                    <Panel header="Notas de padecimiento" extra = {<LineChartOutlined/>} key="4">
                                        {/* {text} */}
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
                                    <Panel header="Diagnóstico" extra = {<HeartOutlined />} key="5">
                                        {/* {text} */}
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
                                    <Panel header="Tratamientos" extra = {<PlusOutlined />} key="6">
                                        {/* {text} */}
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
                                    <Panel header="Medicamentos" extra = {<MedicineBoxFilled />} key="7">
                                        {/* {text} */}
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