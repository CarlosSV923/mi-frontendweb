import React from 'react';
import 'antd/dist/antd.css';
import {Steps, Button, message, Form, Input, Radio, Row, Col, 
        Collapse, Badge, Alert, Divider, Card, Select, InputNumber,
        Upload, Modal, Empty, Avatar, Table, Checkbox} from 'antd'
import {UserOutlined, InfoCircleOutlined, HeartOutlined, 
        PlusSquareOutlined, FileAddOutlined, PlusOutlined, 
        PaperClipOutlined, CalendarOutlined, FileOutlined, 
        LineChartOutlined, MedicineBoxFilled, 
        FileImageOutlined, DatabaseOutlined,
        MinusCircleOutlined, ExclamationCircleOutlined, CloudSyncOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThermometerQuarter,faWeight, faRulerVertical, faMale, 
        faLungs, faHeartbeat, faFileMedicalAlt, faDiagnoses, 
        faPercent, faHandHoldingHeart, faFileMedical} from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';


import EditableTable from './EditableTable';
import shortid from 'shortid';
import { useParams } from 'react-router-dom';
import AxiosDiscapacidades from '../Services/AxiosDiscapacidades';
import AxiosAlergias from '../Services/AxiosAlergias';
import AxiosMedicamentos from '../Services/AxiosMedicamentos';
import AxiosEnfermedades from '../Services/AxiosEnfermedades';
import axios from 'axios';
import AxiosExamenes from '../Services/AxiosExamenes';
import AxiosEnfermedadesHereditarias from '../Services/AxiosEnfermedadesHereditarias';
import AxiosEnfermedadesPersistentes from '../Services/AxiosEnfermedadesPersistentes';
import AxiosSignosVitales from '../Services/AxiosSignosVitales';
import AxiosCitas from '../Services/AxiosCitas';
import AxiosEnfermedadesCitas from '../Services/AxiosEnfermedadesCitas';
import AxiosUsers from '../Services/AxiosUsers';
import AxiosSeguimientos from '../Services/AxiosSeguimientos';

const { Option } = Select;
const { confirm } = Modal;

const alergias = [];
// const discapacidades = [];
const enfermedades_hereditarias = [];
const enfermedades_preexistentes = [];
const enfermedades_persistentes = [];

const enfermedades_diagnostico = [];

const key = 'updatable';

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

let seguimi = false;

const { Panel } = Collapse;

const AtenderCita = (props) => {  
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
    const [enfermedadesDiagnostivoSeleccionadas, setEnfermedadesDiagnosticoSeleccionadas] = React.useState([]);
    const [observaciones, setObservaciones] = React.useState(""); 
    const [diagnostico, setDiagnostico] = React.useState("");
    const [instrucciones, setInstrucciones] = React.useState("");
    const [tratamiento, setTratamiento] = React.useState("");
    const [listaDisc, setListaDisc] = React.useState([]);
    const [listaMed, setListaMed] = React.useState([]);
    const [listaAler, setListaAler] = React.useState([]);
    const [listaSig, setListaSig] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [seguimiento, setSeguimiento] = React.useState(false);
    const [cedulaMedico, setCedulaMedico] = React.useState("");
    const [cedulaPaciente, setCedulaPaciente] = React.useState("");
    const [camposAdicionalesAgregados, setCamposAdicionalesAgregados] = React.useState([]);
    const [dataSource, setDataSource] = React.useState([])
    const [columns, setColumns] = React.useState([{
                                                    title: 'Name',
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                },
                                                {
                                                    title: 'Age',
                                                    dataIndex: 'age',
                                                    key: 'age',
                                                },
                                                {
                                                    title: 'Address',
                                                    dataIndex: 'address',
                                                    key: 'address',
                                                }]);
    const [exito, setExito] = React.useState(0);
    const [signosVitales, setSignosVitales] = React.useState([{tipo_signo:"estatura", valor_signo: 5, unidad_signo: "cm"},
                                                              {tipo_signo:"peso", valor_signo: 20, unidad_signo: "kg"},
                                                              {tipo_signo:"masa_corporal", valor_signo: 30, unidad_signo: "kg/m2"},
                                                              {tipo_signo:"porcentaje", valor_signo: 40, unidad_signo: "%"},
                                                              {tipo_signo:"masa_muscular", valor_signo: 50, unidad_signo: "%"},
                                                              {tipo_signo:"tension_arterial", valor_signo: 60, unidad_signo: "mmHg"},
                                                              {tipo_signo:"frecuencia_cardiaca", valor_signo: 70, unidad_signo: "bmp"},
                                                              {tipo_signo:"frecuencia_respiratoria", valor_signo: 80, unidad_signo: "r/m"},
                                                              {tipo_signo:"saturacion", valor_signo: 90, unidad_signo: ""},
                                                              {tipo_signo:"temperatura", valor_signo: 0, unidad_signo: "°C"}]);
  
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
    const [mensajeExito, setMensajeExito] = React.useState("");
    const [dataCita, setDataCita] = React.useState({medico: "0912908694",
                                                    paciente: "0954003067",
                                                    estado: "P",
                                                    observRec: "Observación/recomendación",
                                                    planTratam: "Plan/tratamiento",
                                                    procedimiento: "Procedimiento",
                                                    instrucciones: "Instrucciones",
                                                    sintomas: "Síntomas",
                                                    fecha_agendada: "2021/07/22 00:00:00",
                                                    fecha_atencion: "2021/07/24 00:00:00",
                                                    seguimiento: 2});
    const [dataExamen, setDataExamen] = React.useState({seguimiento: 2,
                                                        diagnostico: "diagnostico",
                                                        tipo_examen: "tipo_examen",
                                                        medico: "0812345671",
                                                        paciente: "0954003067",
                                                        comentarios: "Comentarios",
                                                        cita: 89});

    const [nombre, setNombre] = React.useState("");
    const [apellido, setApellido] = React.useState("");
    const [paciente, setPaciente] = React.useState([]);
    
    React.useEffect(()=>{
        
        mostrar_discapacidades();
        mostrar_medicamentos();
        mostrar_enfermedades();
        informacion();
        console.log(localStorage.getItem('userdata'),'hhh')

    }, []);

    const informacion = () => {
        AxiosUsers.informacion({id_cita: id}).then( response => {
            console.log("id_cita: ",response);
            setCedulaMedico(response.data[0].medico);
            setCedulaPaciente(response.data[0].paciente);
            setNombre(response.data[0].nombre);
            setApellido(response.data[0].apellido);
            AxiosUsers.info_paciente(response.data[0].paciente).then( response2 => {
                console.log("LLLLLLLLLLLLLLLLLLL: ",response2.data);
                setPaciente(response2.data[0])
            });
        });
    }

    const {id} = useParams();
    console.log(id);

    const next = (e) => {
      console.log("next before: ",e);
      console.log(current)
      setCurrent(current + 1);
      console.log("next after");
      console.log(current + 1);
      console.log("");
    };

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const cancelar_modal = () => {
        setIsModalVisible(false);
      };

    //   La cita está a punto de finalizar, de en <span className="text-danger"><b>OK</b></span> para culminar la cita. Adicionalmente puede iniciar un seguimiento del estado de salud del paciente, <span className="text-danger"><b>marcando la respectiva opción

      

    const iniciar_seguimiento = (e) => {
        setSeguimiento(e.target.checked);
        console.log(`checked = ${e.target.checked}`);
        seguimi = e.target.checked;
      }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }
    
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
    

    const handleChange = ({ fileList }) => {
        console.log("filelist: ", fileList);
        setFileList(fileList)
    };

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

    const  info = () => {
        Modal.info({
          title: 'This is a notification message',
          content: (
            <div>
              <p>some messages...some messages...</p>
              <p>some messages...some messages...</p>
            </div>
          ),
          onOk() {

          },
          onCancel() {
            console.log('Cancel');
          },
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
        //console.log(discapacidadesSeleccionadas);
    }

    const alergias_seleccionadas = (valores_seleccionados) => {
        setAlergiasSeleccionadas(valores_seleccionados);
        console.log("alergias_seleccionadas");
        console.log(valores_seleccionados);
        //console.log(alergiasSeleccionadas);
    }

    const enfermedades_persistentes_seleccionadas = (valores_seleccionados) => {
        setEnfermedadesPersistentesSeleccionadas(valores_seleccionados);
        console.log("enfermedades_persistentes_seleccionadas");
        console.log(valores_seleccionados);
        //console.log(enfermedadesPersistentesSeleccionadas);
    }

    const enfermedades_hereditarias_seleccionadas = (valores_seleccionados) => {
        setEnfermedadesHereditariasSeleccionadas(valores_seleccionados);
        console.log("enfermedades_hereditarias_seleccionadas: ", valores_seleccionados);
        console.log(valores_seleccionados);
        //console.log(enfermedadesHereditariasSeleccionadas);
    }

    const enfermedades_diagnostico_seleccionadas = (valores_seleccionados) => {
        setEnfermedadesDiagnosticoSeleccionadas(valores_seleccionados);
        console.log("enfermedades_diagnostico_seleccionadas: ", valores_seleccionados);
        console.log(valores_seleccionados);
        //console.log(enfermedadesHereditariasSeleccionadas);
    }

    const almacenar_discapacidades_adicionales = (lista, temp) => {

        let data = lista;
        let data_modificada = []
        for (let i = 0 ; i < data.length; i++){
            data_modificada.push({"nombre":data[i]});
        }
        
        let json ={"discapacidades":data_modificada};
        console.log(json);
        AxiosDiscapacidades.almacenar_discapacidades(json).then(res =>{
            console.log("AxiosDiscapacidades.almacenar_discapacidades: ", res.data);
            let array = Object.values(res.data);
            let array_todas_discapacidades = [...array, ...temp];
            let array_todas_discapacidades_mod = []
            console.log("array_todas_discapacidades ",array_todas_discapacidades);
            for (let i=0; i < array_todas_discapacidades.length; i++){
                array_todas_discapacidades_mod.push({"discapacidad":parseInt(array_todas_discapacidades[i])})
            }
            console.log("array_todas_discapacidades_mod ",array_todas_discapacidades_mod);
            AxiosDiscapacidades.almacenar_discapacidades_pacientes({discapacidades_paciente: array_todas_discapacidades_mod, "paciente":cedulaPaciente}).then(res2 =>{
                console.log("AxiosDiscapacidades.almacenar_discapacidades_pacientes: ",res2);
                setExito(exito + 1)
                if(exito === 9){
                    // message.success({ content: 'Cita guardada con éxito', key, duration: 3 });
                }
            }).catch(err => {
                console.log('err.response.data', err.response.data);
            })
            //console.log("array: ",Object.values(array));
            // console.log("array: ",JSON.parse(array));
            // for (let i = 0; i < array.length; i++){
            //     console.log("Elem: ", array[i]);
            // }
        })

    //     AxiosDiscapacidades.almacenar_discapacidades(formData).then( res => {

    // }
}

    const almacenar_alergias_adicionales = (lista, temp, segui) => {


        let data = lista;
        let data_modificada = []
        for (let i = 0 ; i < data.length; i++){
            data_modificada.push({"nombre":data[i]});
        }
        // discapacid
        let json ={"alergias":data_modificada, "paciente":cedulaPaciente};
        console.log(json);
        console.log("data_modificado_alergia: ",json);
        AxiosAlergias.almacenar_alergias(json).then(res =>{
            console.log("AxiosAlergias.almacenar_alergias: ", res.data);
            let array = Object.values(res.data);
            let array_todas_alergias = [...array, ...temp];
            let array_todas_alergias_mod = []
            console.log("array_todas_alergias ",array_todas_alergias);
            for (let i=0; i < array_todas_alergias.length; i++){
                array_todas_alergias_mod.push({"medicamento":parseInt(array_todas_alergias[i])})
            }
            console.log("array_todas_alergias_mod ",array_todas_alergias_mod);
            AxiosAlergias.almacenar_alergias_paciente({alergias_paciente: array_todas_alergias_mod, "paciente":cedulaPaciente}).then(res2 =>{
                console.log("AxiosAlergias.almacenar_alergias_paciente: ",res2);
                setExito(exito + 1)
                console.log("JLLLLLLLLLLLLLLLLLLLLLLLLLLLLL: ", segui);
                message.success({ content: 'Cita guardada con éxito', key, duration: 3 });
                if (seguimi===true){
                    
                    AxiosSeguimientos.crear_seguimiento({"fecha_inicio": moment(Date.now()).format('YYYY-MM-DD'), "paciente": cedulaPaciente, "medico": cedulaMedico}).then(res3 => {
                        console.log("SEGUIMIENTO: ",res3);
                        props.history.push('/medico/seguimiento/'+res3.data.id_seguimiento);
                    })
                }else{
                    props.history.push('/medico');
                }


            }).catch(err => {
                console.log('err.response.data', err.response.data);
            })
            //console.log("array: ",Object.values(array));
            // console.log("array: ",JSON.parse(array));
            // for (let i = 0; i < array.length; i++){
            //     console.log("Elem: ", array[i]);
            // }
        })

    //     AxiosDiscapacidades.almacenar_discapacidades(formData).then( res => {

    // }
}

    const almacenar_enfermedades_hereditarias_adicionales = (temp) => {
        let data = temp;
        let data_modificada = []
        for (let i = 0 ; i < data.length; i++){
            data_modificada.push({"enfermedad":data[i]});
        }
        let json ={"enfermedades_hereditarias_paciente":data_modificada, "paciente":cedulaPaciente};
        console.log(json);
        console.log("data_modificado_enfermedades_hereditarias: ",json);
        AxiosEnfermedadesHereditarias.almacenar_enfermedades_hereditarias_paciente(json).then(res2 =>{
            setExito(exito + 1)
            if(exito === 9){
                // message.success({ content: 'Cita guardada con éxito', key, duration: 3 });
            }
            console.log("AxiosEnfermedadesHereditarias.almacenar_enfermedades_hereditarias_paciente: ",res2);
        }).catch( err => {
            console.log("err: ",err);
        } )
    }

    const almacenar_enfermedades_persistentes_adicionales = (temp) => {
        let data = temp;
        let data_modificada = []
        for (let i = 0 ; i < data.length; i++){
            data_modificada.push({"enfermedad":data[i]});
        }
        let json ={"enfermedades_persistentes_paciente":data_modificada, "paciente": cedulaPaciente};
        console.log(json);
        console.log("data_modificado_enfermedades_hereditarias: ",json);
        AxiosEnfermedadesPersistentes.almacenar_enfermedades_persistentes_paciente(json).then(res2 =>{
            console.log("AxiosEnfermedadesHereditarias.almacenar_enfermedades_persistentes_paciente: ",res2);
            setExito(exito + 1)
            if(exito === 9){
                // message.success({ content: 'Cita guardada con éxito', key, duration: 3 });
            }
        }).catch( err => {
            console.log("err: ",err);
        } )
    }

    const almacenar_signos_vitales_adicionales = (temp) => {
        
        let json ={"signos_vitales_paciente":temp, "cita":id, "seguimiento":2};
        //console.log(json);
        console.log("almacenar_signos_vitales_adicionales: ",json);
        AxiosSignosVitales.almacenar_signos_vitales_paciente(json).then(res2 =>{
            console.log("AxiosSignosVitales.almacenar_signos_vitales_paciente: ",res2);
            setExito(exito + 1)
            if(exito === 9){
                // message.success({ content: 'Cita guardada con éxito', key, duration: 3 });
            }
        }).catch( err => {
            console.log("err: ",err);
        } )
    }

    const almacenar_medicamentos_cita_adicionales = (temp) => {
        let json ={"medicamentos_cita_paciente":temp, "cita":id};
        //console.log(json);
        console.log("almacenar_medicamentos_cita_adicionales: ",json);
        AxiosMedicamentos.almacenar_medicamentos_cita_paciente(json).then(res2 =>{
            console.log("AxiosMedicamentos.almacenar_medicamentos_cita_paciente: ",res2);
            setExito(exito + 1)
            if(exito === 9){
                // message.success({ content: 'Cita guardada con éxito', key, duration: 3 });
            }
        }).catch( err => {
            console.log("err: ",err.response.data);
        } )
    }

    const almacenar_enfermedades_cita = (temp) => {
        let json ={"enfermedades_cita_paciente":temp, "cita":id};
        //console.log(json);
        console.log("enfermedades_cita_paciente: ",json);
        AxiosEnfermedadesCitas.almacenar_enfermedades_cita_paciente(json).then(res2 =>{
            console.log("AxiosEnfermedadesCitas.almacenar_enfermedades_cita_paciente: ",res2);
            setExito(exito + 1)
            if(exito === 9){
                // message.success({ content: 'Cita guardada con éxito', key, duration: 3 });
            }
        }).catch( err => {
            console.log("err: ",err.response.data);
        } )
    }

    const campos_adicionales_agregadas2 = (valores_agregados) => {

        /*        
          "medico": "0912908694",
          "paciente": "0954003067",
          "estado": "P",
          "observRec": "Observación/recomendación",
          "planTratam": "Plan/tratamiento",
          "procedimiento": "Procedimiento",
          "instrucciones": "Instrucciones",
          "sintomas": "Síntomas",
          "fecha_agendada": "2021/07/22 00:00:00",
          "fecha_atencion": "2021/07/24 00:00:00",
          "seguimiento": 1
        */
        // let cita = { medico: "0912908694",
        //              paciente: "0954003067",
        //              inicio_cita:"2021/07/24 00:00:00",
        //              fin_cita: "2021/07/24 00:30:00",
        //              init_comment:"comen",
        //              estado:  "P",
        //              observRec: "Observación/recomendación",
        //              procedimiento: "Procedimiento",
        //              instrucciones: "Instrucciones",
        //              sintomas: "Síntomas",
        //              fecha_agendada: "2021/07/22 00:00:00",
        //              fecha_atencion: "2021/07/24 00:00:00"}
        let cita = { id_cita: id,
                     estado:  "A",
                     observRec: observaciones,
                     planTratam: tratamiento,
                     instrucciones: instrucciones,
                     sintomas: diagnostico,
                     fecha_atencion: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                     seguimiento: ""}
        almacenar_cita(cita);

    }

    const almacenar_secciones = () => {
        
    }

    const campos_adicionales_agregadas3 = (valores_agregados) => {
        console.log("PPPPPPPPPPPPP: ", valores_agregados);
        if (current === 0){
            setListaDisc(valores_agregados.lista_discapacidades);
            setListaAler(valores_agregados.lista_alergias);
            setCurrent(current + 1);
        }else if (current === 1){
            setListaSig(valores_agregados.lista_signos);
            setCurrent(current + 1);
        }else if(current === 2){
            setCurrent(current + 1);
        }else if (current === 3) {

            setListaMed(valores_agregados.lista_medicamentos);
            console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHH: ",valores_agregados.lista_medicamentos)
            console.log("fileList: ",fileList);
            let temp_discapacidades = []
            for (let i = 0; i< discapacidadesSeleccionadas.length; i++ ){
                let elem = discapacidadesSeleccionadas[i].split(",")
                temp_discapacidades.push(elem[1]);
            }

            let temp_alergias = [];
            for (let i = 0; i< alergiasSeleccionadas.length; i++ ){
                let elem = alergiasSeleccionadas[i].split(",")
                temp_alergias.push(elem[1]);
            }

            let temp_enfermedades_hereditarias = [];
            for (let i = 0; i< enfermedadesHereditariasSeleccionadas.length; i++ ){
                let elem = enfermedadesHereditariasSeleccionadas[i].split(",")
                temp_enfermedades_hereditarias.push(elem[1]);
            }

            let temp_enfermedades_persistentes = [];
            for (let i = 0; i< enfermedadesPersistentesSeleccionadas.length; i++ ){
                let elem = enfermedadesPersistentesSeleccionadas[i].split(",")
                temp_enfermedades_persistentes.push(elem[1]);
            }

            console.log(valores_agregados);
            let medicamentos_nuevos = valores_agregados.lista_medicamentos;
            let medicamentos_nuevos_mod = [] 
            for (let i = 0; i < medicamentos_nuevos.length ; i++) {

                medicamentos_nuevos_mod.push({medicamento: medicamentos_nuevos[i].medicina,
                                            dosis: medicamentos_nuevos[i].dosis, 
                                            frecuencia: medicamentos_nuevos[i].frecuencia, 
                                            duracion: medicamentos_nuevos[i].duracion,
                                            });

            }

            let temp_enfermedades_citas = [];
            for (let i = 0; i< enfermedadesDiagnostivoSeleccionadas.length; i++ ){
                let elem = enfermedadesDiagnostivoSeleccionadas[i].split(",")
                temp_enfermedades_citas.push({"enfermedad":elem[1]});
            }

            let signos_vitales_nuevos = listaSig;

            let signos_vitales_nuevos_mod = [] 
            for (let i = 0; i < signos_vitales_nuevos.length ; i++) {

                signos_vitales_nuevos_mod.push({key: signos_vitales_nuevos[i].nombre_signo_vital, 
                                                value: signos_vitales_nuevos[i].valor_signo_vital, 
                                                unidad: signos_vitales_nuevos[i].unidad});

            }
            console.log('signos_vitales_nuevos_mod:' , signos_vitales_nuevos_mod);
            console.log("signos_vitales_nuevos: ", signos_vitales_nuevos);
            
            let signos_vitales_predeterminados = [{key: 'Estatura', value: estatura, unidad: 'cm'},
                                                {key: 'Peso', value: peso, unidad: 'Kg'},
                                                {key: 'Masa Coporal', value: masaCorporal, unidad: 'Kg/m2'},
                                                {key: 'Porcentaje de grasa corporal', value: porcentaje, unidad: '%'},
                                                {key: 'Masa muscular', value: masaMuscular, unidad: '%'},
                                                {key: 'Tensión arterial', value: tensionArterial, unidad: 'mmHg'},
                                                {key: 'Frecuencia cardíaca', value: frecuenciaCardiaca, unidad: 'bmp'},
                                                {key: 'Frecuencia respiratoria', value: frecuenciaRespiratoria, unidad: 'r/m'},
                                                {key: 'Saturación de oxígeno', value: saturacion, unidad: 'cm'},
                                                {key: 'Temperatura', value: temperatura, unidad: '°C'}]

            let signos_vitales_totales = [...signos_vitales_nuevos_mod, ...signos_vitales_predeterminados];
            let cita = { id_cita: id,
                estado:  "A",
                observRec: observaciones,
                planTratam: tratamiento,
                instrucciones: instrucciones,
                sintomas: diagnostico,
                fecha_atencion: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
                seguimiento: ""}           
                confirm({
                    title: 'La cita está a punto de finalizar. Si desea puede iniciar un seguimiento marcando la siguiente opción',
                    icon: <ExclamationCircleOutlined />,
                    content: <Checkbox onChange={ e => {iniciar_seguimiento(e)}}>Iniciar seguimiento</Checkbox>,
                    onOk() {
                        console.log('OK000');
                        console.log("El check: ",seguimiento);   
                        message.loading({ content: 'Guardando cita...', key, duration: 50});
                    

                        enviar2(cita, listaDisc, temp_discapacidades,
                            listaAler, temp_alergias,
                            temp_enfermedades_hereditarias,
                            temp_enfermedades_persistentes,
                            signos_vitales_totales,
                            medicamentos_nuevos_mod,
                            temp_enfermedades_citas
                        );
                    },
                onCancel() {
                  console.log('Cancel');
                },
            });

            // console.log("VALUEEEEEEEEEE: ", value);
        }
    }

    const ejecutar_cita = (cita, listaDisc, temp_discapacidades,
        listaAler, temp_alergias,
        temp_enfermedades_hereditarias,
        temp_enfermedades_persistentes,
        signos_vitales_totales,
        medicamentos_nuevos_mod,
        temp_enfermedades_citas) => {

        console.log("ENNNNNNNNNNNNNNNNNNNNNNNNNNNNNN EJECUTAR");
        console.log("CITA: ",cita);
        console.log("listaDisc: ",listaDisc);
        console.log("listaDisc: ",temp_discapacidades);
        console.log("listaAler: ",listaAler);
        console.log("temp_alergias: ",temp_alergias);
        console.log("temp_enfermedades_hereditarias: ",temp_enfermedades_hereditarias);
        console.log("temp_enfermedades_persistentes: ",temp_enfermedades_persistentes);
        console.log("signos_vitales_totales: ",signos_vitales_totales);
        console.log("medicamentos_nuevos_mod: ",medicamentos_nuevos_mod);
        console.log("temp_enfermedades_citas: ",temp_enfermedades_citas);
    
        
        actualizar_cita(cita);
        // almacenar_cita(cita);
        almacenar_discapacidades_adicionales(listaDisc, temp_discapacidades);        
        almacenar_alergias_adicionales(listaAler, temp_alergias, seguimiento);
        almacenar_enfermedades_hereditarias_adicionales(temp_enfermedades_hereditarias);
        almacenar_enfermedades_persistentes_adicionales(temp_enfermedades_persistentes);
        almacenar_signos_vitales_adicionales(signos_vitales_totales);
        subir_imagenes();
        almacenar_medicamentos_cita_adicionales(medicamentos_nuevos_mod);
        almacenar_enfermedades_cita(temp_enfermedades_citas);

    }

    const enviar2 = (cita, listaDisc, temp_discapacidades,
                    listaAler, temp_alergias,
                    temp_enfermedades_hereditarias,
                    temp_enfermedades_persistentes,
                    signos_vitales_totales,
                    medicamentos_nuevos_mod,
                    temp_enfermedades_citas
                    ) => {

        ejecutar_cita(cita, listaDisc, temp_discapacidades,
            listaAler, temp_alergias,
            temp_enfermedades_hereditarias,
            temp_enfermedades_persistentes,
            signos_vitales_totales,
            medicamentos_nuevos_mod,
            temp_enfermedades_citas);
    }

    // const campos_adicionales_agregadas = (valores_agregados) => {
        

        
    //     setCamposAdicionalesAgregados(valores_agregados);
    //     // subir_imagenes();
    //     console.log("campos_adicionales_agregadas");
    //     console.log(valores_agregados);
    //     console.log("discapacidadesSeleccionadas: ", discapacidadesSeleccionadas);
    //     console.log("alergiasSeleccionadas: ", alergiasSeleccionadas);
    //     console.log("enfermedadesHereditariasSeleccionadas: ", enfermedadesHereditariasSeleccionadas);
    //     console.log("enfermedadesPersistentesSeleccionadas: ", enfermedadesPersistentesSeleccionadas);
    //     console.log("medicamentos_nuevos: ", valores_agregados.lista_medicamentos);
    //     console.log("enfermedadesDiagnostivoSeleccionadas: ", enfermedadesDiagnostivoSeleccionadas);
    //     console.log("signos_vitales_nuevos: ", valores_agregados.lista_signos);

    //     console.log("fileList: ",fileList);
    //     let temp_discapacidades = []
    //     for (let i = 0; i< discapacidadesSeleccionadas.length; i++ ){
    //         let elem = discapacidadesSeleccionadas[i].split(",")
    //         temp_discapacidades.push(elem[1]);
    //     }

    //     let temp_alergias = [];
    //     for (let i = 0; i< alergiasSeleccionadas.length; i++ ){
    //         let elem = alergiasSeleccionadas[i].split(",")
    //         temp_alergias.push(elem[1]);
    //     }

    //     let temp_enfermedades_hereditarias = [];
    //     for (let i = 0; i< enfermedadesHereditariasSeleccionadas.length; i++ ){
    //         let elem = enfermedadesHereditariasSeleccionadas[i].split(",")
    //         temp_enfermedades_hereditarias.push(elem[1]);
    //     }

    //     let temp_enfermedades_persistentes = [];
    //     for (let i = 0; i< enfermedadesPersistentesSeleccionadas.length; i++ ){
    //         let elem = enfermedadesPersistentesSeleccionadas[i].split(",")
    //         temp_enfermedades_persistentes.push(elem[1]);
    //     }

    //     console.log(valores_agregados);
    //     let medicamentos_nuevos = valores_agregados.lista_medicamentos;
    //     let medicamentos_nuevos_mod = [] 
    //     for (let i = 0; i < medicamentos_nuevos.length ; i++) {

    //         medicamentos_nuevos_mod.push({medicamento: medicamentos_nuevos[i].medicina,
    //                                       dosis: medicamentos_nuevos[i].dosis, 
    //                                       frecuencia: medicamentos_nuevos[i].frecuencia, 
    //                                       duracion: medicamentos_nuevos[i].duracion,
    //                                       });

    //     }

    //     let temp_enfermedades_citas = [];
    //     for (let i = 0; i< enfermedadesDiagnostivoSeleccionadas.length; i++ ){
    //         let elem = enfermedadesDiagnostivoSeleccionadas[i].split(",")
    //         temp_enfermedades_citas.push({"enfermedad":elem[1]});
    //     }

    //     let signos_vitales_nuevos = valores_agregados.lista_signos;
    //     console.log("pppppppppppppppppppppppppppp: ", signos_vitales_nuevos);
    //     console.log("pppppppppppppppppppppppppppp: ", valores_agregados);

    //     let signos_vitales_nuevos_mod = [] 
    //     for (let i = 0; i < signos_vitales_nuevos.length ; i++) {

    //         signos_vitales_nuevos_mod.push({key: signos_vitales_nuevos[i].nombre_signo_vital, 
    //                                         value: signos_vitales_nuevos[i].valor_signo_vital, 
    //                                         unidad: signos_vitales_nuevos[i].unidad});

    //     }
    //     console.log('signos_vitales_nuevos_mod:' , signos_vitales_nuevos_mod);
    //     console.log("signos_vitales_nuevos: ", signos_vitales_nuevos);
        
    //     let signos_vitales_predeterminados = [{key: 'Estatura', value: estatura, unidad: 'cm'},
    //                                           {key: 'Peso', value: peso, unidad: 'Kg'},
    //                                           {key: 'Masa Coporal', value: masaCorporal, unidad: 'Kg/m2'},
    //                                           {key: 'Porcentaje de grasa corporal', value: porcentaje, unidad: '%'},
    //                                           {key: 'Masa muscular', value: masaMuscular, unidad: '%'},
    //                                           {key: 'Tensión arterial', value: tensionArterial, unidad: 'mmHg'},
    //                                           {key: 'Frecuencia cardíaca', value: frecuenciaCardiaca, unidad: 'bmp'},
    //                                           {key: 'Frecuencia respiratoria', value: frecuenciaRespiratoria, unidad: 'r/m'},
    //                                           {key: 'Saturación de oxígeno', value: saturacion, unidad: 'cm'},
    //                                           {key: 'Temperatura', value: temperatura, unidad: '°C'}]

    //     let signos_vitales_totales = [...signos_vitales_nuevos_mod, ...signos_vitales_predeterminados];

    //     console.log('signos_vitales_totales ', signos_vitales_totales);

    //     // let temp_signos_vitales = [];
    //     // for (let i = 0; i< enfermedadesPersistentesSeleccionadas.length; i++ ){
    //     //     let elem = enfermedadesPersistentesSeleccionadas[i].split(",")
    //     //     temp_enfermedades_persistentes.push(elem[1]);
    //     // }


    //     console.log("temp_discapacidades: ",temp_discapacidades);
    //     console.log("temp_alergias: ",temp_alergias);
    //     console.log("temp_enfermedades_hereditarias: ",temp_enfermedades_hereditarias);
    //     console.log("temp_enfermedades_persistentes: ",temp_enfermedades_persistentes);
    //     console.log("medicamentos_nuevos_mod: ", medicamentos_nuevos_mod);
    //     console.log('temp_enfermedades_citas: ',temp_enfermedades_citas);

    //     // almacenar_cita(valores_agregados.lista_discapacidades, temp_discapacidades,
    //     //                valores_agregados.lista_alergias, temp_alergias,
    //     //                temp_enfermedades_hereditarias,
    //     //                temp_enfermedades_persistentes,
    //     //                signos_vitales_totales,
    //     //                medicamentos_nuevos_mod,
    //     //                temp_enfermedades_citas);


    //     // almacenar_cita(valores_agregados.lista_discapacidades, temp_discapacidades,
    //     //                valores_agregados.lista_alergias, temp_alergias,
    //     //                temp_enfermedades_hereditarias,
    //     //                temp_enfermedades_persistentes,
    //     //                signos_vitales_totales,
    //     //                medicamentos_nuevos_mod,
    //     //                temp_enfermedades_citas);

        
    //     // almacenar_discapacidades_adicionales(valores_agregados.lista_discapacidades, temp_discapacidades);        
    //     // almacenar_alergias_adicionales(valores_agregados.lista_alergias, temp_alergias);
    //     // almacenar_enfermedades_hereditarias_adicionales(temp_enfermedades_hereditarias);
    //     // almacenar_enfermedades_persistentes_adicionales(temp_enfermedades_persistentes);
    //     // almacenar_signos_vitales_adicionales(signos_vitales_totales);
    //     // subir_imagenes();
    //     // almacenar_medicamentos_cita_adicionales(medicamentos_nuevos_mod);
    //     // almacenar_enfermedades_cita(temp_enfermedades_citas);




    //     let cita = { medico: "0912908694",
    //                  paciente: "0954003067",
    //                  inicio_cita:"2021/07/24 00:00:00",
    //                  fin_cita: "2021/07/24 00:30:00",
    //                  init_comment:"comen",
    //                  estado:  "P",
    //                  planTratam: tratamiento,
    //                  observRec: observaciones,
    //                  procedimiento: "",
    //                  instrucciones: instrucciones,
    //                  sintomas: diagnostico,
    //                  fecha_agendada: "2021/07/22 00:00:00",
    //                  fecha_atencion: "2021/07/24 00:00:00"}

        




    //     almacenar_cita(cita);
    //     almacenar_discapacidades_adicionales(valores_agregados.lista_discapacidades, temp_discapacidades);        
    //     almacenar_alergias_adicionales(valores_agregados.lista_alergias, temp_alergias);
    //     almacenar_enfermedades_hereditarias_adicionales(temp_enfermedades_hereditarias);
    //     almacenar_enfermedades_persistentes_adicionales(temp_enfermedades_persistentes);
    //     almacenar_signos_vitales_adicionales(signos_vitales_totales);
    //     // subir_imagenes();
    //     almacenar_medicamentos_cita_adicionales(medicamentos_nuevos_mod);
    //     almacenar_enfermedades_cita(temp_enfermedades_citas);



    //     // let discapacidades_ingresadas = [...temp_discapacidades,...valores_agregados.lista_discapacidades];
    //     // console.log("discapacidades_ingresadas: ",discapacidades_ingresadas);
        
    //     let json = {seguimiento: 1,
    //                 diagnostico: "diagnostico",
    //                 tipo_examen: "tipo_examen",
    //                 medico: "0912908694",
    //                 paciente: "0954003067",
    //                 comentarios: "Comentarios",
    //                 cita: 1};
    
    // }

    const campo_observacion = (observacion) =>{
        setObservaciones(observacion.target.value);
        //console.log("observacion");
        //console.log(observacion.target.value);
    }

    const campo_diagnostico = (diagnostico) =>{
        setDiagnostico(diagnostico.target.value);
        console.log(diagnostico.target.value);
        // console.log("observacion");
        // console.log(observacion.target.value);
    }

    const campo_instrucciones = (instrucciones) =>{
        setInstrucciones(instrucciones.target.value);
        //console.log("observacion");
        //console.log(observacion.target.value);
    }

    const campo_tratamiento = (tratamiento) =>{
        setTratamiento(tratamiento.target.value);
        //console.log("observacion");
        //console.log(observacion.target.value);
    }

    const enviar = (e) => {
        console.log("medicamentos_agregados: ", e);
    }

    const signos_vitales = (valor, unidad, tipo) => {

        console.log("signo: ", valor);
        console.log("unidad: ", unidad);
        console.log("tipo_signo: ", tipo);
        console.log("Is vacío: ",signosVitales.length);
        console.log(signosVitales[0].tipo_signo === "estatura");
        let update = {tipo_signo:tipo, valor_signo: valor, unidad_signo: unidad};
        console.log(update);
        // {tipo_signo:"peso", valor_signo: 20, unidad_signo: "kg"},

        // const nueva_data = signosVitales.filter( item => item.tipo_signo === tipo? update:item );
        const nueva_data = signosVitales.filter( item => item.tipo_signo === tipo? console.log("update"):console.log("item"));
        console.log(nueva_data); 
        //setSignosVitales(nueva_data);
        console.log("Signos");

    }

    const subir_imagenes = () => {
        //event.preventDefault();
        for (let i = 0; i < fileList.length; i++){
            let formData = new FormData();
            console.log("fileList[0].originFileObj: ",fileList[0].originFileObj);
            formData.append("image_name", fileList[i].originFileObj);   
            console.log("FORM DATA: ", fileList[i].originFileObj);         
            AxiosExamenes.almacenar_examen(formData).then( res => {
                console.log("AxiosExamenes.almacenar_examen88888888: ",res);
                // let dataExamenNueva = {
                //                         seguimiento: 2,
                //                         diagnostico: "",
                //                         tipo_examen: "examen",
                //                         medico: cedulaMedico,
                //                         paciente: cedulaPaciente,
                //                         comentarios: "",
                //                         cita: id
                //                       };
                
                let dataExamenNueva = {
                                        seguimiento: 2,
                                        diagnostico: "Sin datos",
                                        tipo_examen: "examen",
                                        medico: cedulaMedico,
                                        paciente: cedulaPaciente,
                                        comentarios: "Sin datos",
                                        cita: id
                };

                dataExamenNueva.url_examen = res.data;
                console.log("CIIIIIIIIIIIIIIIIIIIIIIIII: ",dataExamenNueva);
                AxiosExamenes.almacenar_informacion_examen(dataExamenNueva).then( res2 => {
                    console.log("AxiosExamenes.almacenar_informacion_examenwwwwwwww: ",res2);
                });
            }).catch(err => {
                console.log('err.response.data', err.response.data);
            });

        }
        setExito(exito + 1)
        if(exito === 9){
            // message.success({ content: 'Cita guardada con éxito', key, duration: 3 });
        }
    }

    const almacenar_cita = async (cita) => {
        let id = "";
        await AxiosCitas.almacenar_informacion_cita(cita).then( res => {
            id = res.data;
            console.log("AxiosCitas.almacenar_informacion_cita: ", res.data);
            setExito(exito + 1);
            if(exito === 9){
                // message.success({ content: 'Cita guardada con éxito', key, duration: 3 });
            }
        });
        // console.log('id: ', cita);
    }

    const actualizar_cita = async (cita) => {
        let id = "";
        await AxiosCitas.actualizar_cita(cita).then( res => {
            id = res.data;
            console.log("AxiosCitas.actualizar_cita: ", res.data);
            
        });
        // console.log('id: ', cita);
    }

    return (
        <>            
            {/* nombre_signo_vital valor_signo_vital unidad
                { nombre_signo_vital: ['Pulso'], valor_signo_vital: [12], unidad :["a"]}
            */}
            <Row>      
                <Col span={15} className="">
                    <Form onFinish = {valores_agregados => campos_adicionales_agregadas3(valores_agregados)} >
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
                                        <span className="mx-2 lead">{paciente.nombre} {paciente.apellido}</span>           
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
                                    {/* <span className="ms-2 text-secondary">11/07/1950</span> */}
                                    <span className="ms-2 text-secondary">{(moment(moment(paciente.fecha_nacimiento).format('YYYY-MM-DD'),'YYYYMMDD').fromNow()).substring(4,12)}</span>
                                    {/* <span className="ms-2 text-secondary">72 años</span> */}
                                    <span className="ms-2 text-secondary">{paciente.sexo === 'M'? 'Masculino': paciente.sexo === 'F'? 'Femenino': 'Prefiero no decirlo' }</span>
                                    <span className="ms-2 text-secondary">{paciente.correo}</span>
                                    {/* <span className="ms-2 text-secondary">Femenino</span>
                                    <span className="ms-2 text-secondary">email@live.es</span> */}
                                    {/* <span className="mx-2 text-secondary">Miguel Hidalgo</span>  */}
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Divider></Divider>
                                <Steps current={current} size="small" className="mt-4" onChange= {(c) => console.log("Cambiandooooooooooooooo")}>
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
                                                    
                                                    

                                                {/* Aquí comienza */}
                                                {discapacidad?<>
                                                    <Row className="">
                                                        <Col span={24} className="">
                                                            <Form.Item >
                                                                <Row>
                                                                    <Select mode="tags" className="" value = {discapacidadesSeleccionadas} onChange = { (valores_seleccionados) => discapacidades_seleccionadas(valores_seleccionados)} placeholder="Seleccione las discapacidades">
                                                                        {
                                                                            discapacidades.map ( item => 
                                                                                (
                                                                                    <Option key={item.nombre+ ',' + item.id_discapacidad}>{item.nombre}</Option>
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
                                                            <Form.List name="lista_discapacidades">
                                                                {(fields, { add, remove }) => (
                                                                    <>
                                                                    <div>
                                                                        {fields.map(field => (
                                                                            <div key = {shortid.generate()}>
                                                                                <Row>
                                                                                    <Col span = {23}>
                                                                                        <Form.Item {...field}>
                                                                                            <Input placeholder="Ingrese la discapacidad" style={{ width: '100%' }}/>                                                                                
                                                                                        </Form.Item>
                                                                                    </Col>
                                                                                    <Col span = {1}>
                                                                                        {fields.length > 0 ? (
                                                                                            <MinusCircleOutlined 
                                                                                                className="dynamic-delete-button"
                                                                                                onClick={() => remove(field.name)}
                                                                                                style={{ width: '5%' }}/>
                                                                                        ) : null}
                                                                                    </Col>
                                                                                </Row>                                                                            
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                <Form.Item>
                                                                    <Button
                                                                        type="dashed"
                                                                        onClick={() => add()}
                                                                        icon={<PlusOutlined />}
                                                                        style={{ width: '100%' }}>
                                                                        Añadir manualmente otra discapacidad
                                                                    </Button>
                                                                    {/* <Form.ErrorList errors={errors} /> */}
                                                                </Form.Item>
                                                                </>
                                                                )}
                                                            </Form.List>
                                                        </Col>
                                                    </Row>
                                                </>:null
                                                }

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
                                                                            <Select mode="tags" value = {alergiasSeleccionadas} onChange = {(valores_seleccionados) => alergias_seleccionadas(valores_seleccionados)} className="" placeholder="Seleccione las alergias">
                                                                                {
                                                                                    medicamentos.map ( item => 
                                                                                        (
                                                                                            <Option key = {item.nombre + ',' +item.id_medicamento}>{item.nombre}</Option>
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
                                                            <Form.List name="lista_alergias">
                                                                {(fields, { add, remove }) => (
                                                                    <>
                                                                    <div>
                                                                        {fields.map(field => (
                                                                            <div key = {shortid.generate()}>
                                                                                <Row>
                                                                                    <Col span = {23}>
                                                                                        <Form.Item {...field}>
                                                                                            <Input placeholder="Ingrese la alergia" style={{ width: '100%' }}/>                                                                                
                                                                                        </Form.Item>
                                                                                    </Col>
                                                                                    <Col span = {1}>
                                                                                        {fields.length > 0 ? (
                                                                                            <MinusCircleOutlined 
                                                                                                className="dynamic-delete-button"
                                                                                                onClick={() => remove(field.name)}
                                                                                                style={{ width: '5%' }}/>
                                                                                        ) : null}
                                                                                    </Col>
                                                                                </Row>                                                                            
                                                                            </div>
                                                                        ))}
                                                                    </div>
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
                                                        </Col>
                                                    </Row>
                                                    </>:null}

                                                    <Divider plain>Enfermedades persistentes</Divider>
                                                    <Row className="mt-5">
                                                        <Col span={24}>
                                                            <Form.Item>
                                                                <Select mode="tags" value = {enfermedadesPersistentesSeleccionadas} placeholder="Seleccione las enfermedades persistentes" onChange={valores_seleccionados => enfermedades_persistentes_seleccionadas(valores_seleccionados)}>
                                                                    {
                                                                        enfermedades.map ( item => 
                                                                            (
                                                                                <Option key = {item.nombreLargo + ',' + item.id_enfermedad}>{item.nombreLargo}</Option>
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
                                                                <Select mode="tags" value = {enfermedadesHereditariasSeleccionadas} style={{ width: '100%' }} placeholder="Seleccione las enfermedades hereditarias" onChange={(valores_seleccionados) => enfermedades_hereditarias_seleccionadas(valores_seleccionados)}>
                                                                    {
                                                                        enfermedades.map ( item => 
                                                                            (
                                                                                <Option key = {item.nombreLargo + ',' + item.id_enfermedad}>{item.nombreLargo}</Option>
                                                                            )
                                                                        )
                                                                    }
                                                                </Select> 
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <Divider plain>Notas antecedentes</Divider>
                                                    <Row>
                                                        <Col span={24} className="">
                                                            {/* <TextArea style={{ height: '200%' }} onChange = { observacion => campo_observacion(observacion) } showCount maxLength={100} /> */}

                                                            <TextArea rows = {4} style={{ height: '200%' }} placeholder="Notas antecedentes" value = {observaciones} onChange = { observacion => campo_observacion(observacion) } showCount maxLength = {100}/>
                                                        </Col>
                                                    </Row>

                                                    {/* <Button type="primary" htmlType="submit">
                                                        Guardar cita
                                                    </Button> */}


                                                    {/* <Button type="primary" htmlType="submit">
                                                        Terminar cita
                                                    </Button> */}
                                                    {/* <Button type="primary" htmlType="submit">
                                                        Terminar cita
                                                    </Button>
                                                    <Button type="primary" onClick = {() => almacenar_cita()}>
                                                        Guardar cita
                                                    </Button> */}
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
                                                        <Row className="mb-4 ms-5">
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
                                                                    value = {estatura}
                                                                    formatter={value => `${value} cm`}
                                                                    parser={value => value.replace('cm', '')}
                                                                    onChange={valor => setEstatura(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-4 ms-5">
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
                                                                    value = {peso}
                                                                    formatter={value => `${value} Kg`}
                                                                    parser={value => value.replace('Kg', '')}
                                                                    onChange={valor => setPeso(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-4 ms-5">
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
                                                                    value = {masaCorporal}
                                                                    formatter={value => `${value} Kg/m2`}
                                                                    parser={value => value.replace('Kg/m2', '')}
                                                                    onChange={valor => setMasaCorporal(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-4 ms-5">
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
                                                                    value = {porcentaje}
                                                                    formatter={value => `${value} %`}
                                                                    parser={value => value.replace('%', '')}
                                                                    onChange={valor => setPorcentaje(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-4 ms-5">
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
                                                                    value = {masaMuscular}
                                                                    formatter={value => `${value} %`}
                                                                    parser={value => value.replace('%', '')}
                                                                    onChange={valor => setMasaMuscular(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-4 ms-5">
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
                                                                    value = {tensionArterial}
                                                                    parser={value => value.replace('mmHg', '')}
                                                                    onChange={valor => setTensionArterial(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-4 ms-5">
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
                                                                    value = {frecuenciaCardiaca}
                                                                    parser={value => value.replace('bmp', '')}
                                                                    onChange={valor => setFrecuenciaCardiaca(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-4 ms-5">
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
                                                                    value={frecuenciaRespiratoria}
                                                                    formatter={value => `${value} r/m`}
                                                                    parser={value => value.replace('r/m', '')}
                                                                    onChange={valor => setFrecuenciaRespiratoria(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-4 ms-5">
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
                                                                    value={saturacion}
                                                                    parser={value => value.replace('', '')}
                                                                    onChange={valor => setSaturacion(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row className="mb-4 ms-5">
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
                                                                    value={temperatura}
                                                                    formatter={value => `${value} °C`}
                                                                    parser={value => value.replace('°C', '')}
                                                                    onChange={valor => setTemperatura(valor)}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Form.List name="lista_signos">
                                                            {(fields, { add, remove }) => (
                                                                <>
                                                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                                        <div className="" key = {shortid.generate()}>
                                                                            <Row className="ms-5">
                                                                                <Col span={1} >
                                                                                    <Form.Item>
                                                                                            {/* <FontAwesomeIcon icon={faRulerVertical} size="2x" color=""/> */}
                                                                                            <FontAwesomeIcon icon={faFileMedical} size="2x" color=""/>
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                <Col span = {9} className="me-1">
                                                                                    <Form.Item 
                                                                                        {...restField}
                                                                                        name = {[name, 'nombre_signo_vital']}
                                                                                        fieldKey={[fieldKey, 'nombre_signo_vital']}
                                                                                    >
                                                                                        <Input className="text-center" bordered={false} placeholder="Nombre signo vital"/>                                                                                
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                <Col span = {2} className="me-4">
                                                                                    <Form.Item 
                                                                                        {...restField}
                                                                                        name = {[name, 'valor_signo_vital']}
                                                                                        fieldKey={[fieldKey, 'valor_signo_vital']}
                                                                                    >
                                                                                        <InputNumber style = {{width:"140%"}} min={1} max={400}/>
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                <Col span = {4}>
                                                                                    <Form.Item 
                                                                                        {...restField}
                                                                                        name = {[name, 'unidad']}
                                                                                        fieldKey={[fieldKey, 'unidad']}
                                                                                    >
                                                                                        <Input placeholder="Unidad" />                                                                                
                                                                                    </Form.Item>
                                                                                </Col>                                                                                       
                                                                                {fields.length > 0 ? (
                                                                                    <Col span = {2}>
                                                                                        <MinusCircleOutlined 
                                                                                            className="dynamic-delete-button"
                                                                                            onClick={() => remove(name)}
                                                                                            style={{ width: '5%' }}
                                                                                        />
                                                                                    </Col>):null}                                                                                        
                                                                            </Row>                                                                            
                                                                        </div>
                                                                    ))}
                                                                
                                                                    <Row className="mb-2 mt-2">
                                                                        <Col span={20} className="">
                                                                            <Button
                                                                                type="dashed"
                                                                                onClick={() => add()}
                                                                                icon={<PlusOutlined />}
                                                                                style={{ width: '56%' }}
                                                                                >
                                                                                Añadir manualmente signo vital
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                            </>
                                                        )}
                                                        </Form.List>

                                                        {/* <Button type="primary" htmlType="submit">
                                                            Terminar cita
                                                        </Button> */}
                                                    </div>
                                                </Card>                                              
                                        </>:null
                                    }
                                    {
                                        current === 2?                
                                        <>    
                                            <Card type="inner" className="text-center" title="Exámenes">
                                                <Row>
                                                    <Col span={24} className="">    
                                                        <Upload
                                                            // action="http://127.0.0.1:8000/api/upload/images"
                                                            listType="picture-card"
                                                            fileList={fileList}
                                                            onPreview={handlePreview}
                                                            onChange={handleChange}
                                                            beforeUpload={() => false}
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
                                                {/* <Button type="primary" onClick = {subir_imagenes}>Subir</Button> */}
                                                {/* <Button type="primary" onClick = {() => subir_imagenes()}>
                                                        Subir
                                                </Button>
                                                <Button type="primary" htmlType="submit">
                                                        Terminar cita
                                                </Button> */}
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
                                                                        <Select mode="tags" value = {enfermedadesDiagnostivoSeleccionadas} style={{ width: '100%' }} placeholder="Seleccione las enfermedades" onChange={(valores_seleccionados) => enfermedades_diagnostico_seleccionadas(valores_seleccionados)}>
                                                                           {
                                                                                enfermedades.map ( item => 
                                                                                    (
                                                                                        <Option key = {item.nombreLargo + ',' + item.id_enfermedad}>{item.nombreLargo}</Option>
                                                                                    )
                                                                                )
                                                                            }

                                                                        </Select>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col span={24}>
                                                                        <TextArea showCount maxLength={400} value = {diagnostico} onChange = { diagnostico => campo_diagnostico(diagnostico) } />
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
                                
                                                            <Card>

                                                                <Form.List name="lista_medicamentos">
                                                            {(fields, { add, remove }) => (
                                                                <>
                                                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                                        <div className="" key = {shortid.generate()}>
                                                                            <Row className="">

                                                                                <Col span = {7} className="me-1">
                                                                                    <Form.Item 
                                                                                        {...restField}
                                                                                        name = {[name, 'medicina']}
                                                                                        fieldKey={[fieldKey, 'medicina']}
                                                                                    >
                                                                                        <Select className="" onChange = {() => console.log("Fields: ", fields)} placeholder= "Medicamento">
                                                                                            {
                                                                                                medicamentos.map ( item => 
                                                                                                    (
                                                                                                        <Option value= {item.id_medicamento} key={item.nombre}>{item.nombre}</Option>
                                                                                                    )
                                                                                                )
                                                                                            }
                                                                                        </Select>
                                                                                        {/* <Input className="text-center" bordered={true} placeholder="Medicina"/>                                                                                 */}
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                <Col span = {5} className="me-1">
                                                                                    <Form.Item 
                                                                                        {...restField}
                                                                                        name = {[name, 'dosis']}
                                                                                        fieldKey={[fieldKey, 'dosis']}
                                                                                    >
                                                                                        <Input className="text-center" bordered={true} placeholder="Dosis"/>                                                                                
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                <Col span = {5} className="me-1">
                                                                                    <Form.Item 
                                                                                        {...restField}
                                                                                        name = {[name, 'frecuencia']}
                                                                                        fieldKey={[fieldKey, 'frecuencia']}
                                                                                    >
                                                                                        <Input className="text-center" bordered={true} placeholder="Frecuencia"/>                                                                                
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                <Col span = {5} className="me-1">
                                                                                    <Form.Item 
                                                                                        {...restField}
                                                                                        name = {[name, 'duracion']}
                                                                                        fieldKey={[fieldKey, 'duracion']}
                                                                                    >
                                                                                        <Input className="text-center" bordered={true} placeholder="Duración"/>                                                                                
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                {fields.length > 0 ? (
                                                                                    <Col span = {1}>
                                                                                        <MinusCircleOutlined 
                                                                                            className="dynamic-delete-button ms-2"
                                                                                            onClick={() => remove(name)}
                                                                                            style={{ width: '5%' }}
                                                                                        />
                                                                                    </Col>):null}                                                                                        
                                                                            </Row>                                                                            
                                                                        </div>
                                                                    ))}
                                                               
                                                               <Form.Item className="mt-3">
                                                                    <Button
                                                                        type="dashed"
                                                                        onClick={() => add()}
                                                                        icon={<PlusOutlined />}
                                                                        style={{ width: '100%' }}>
                                                                        Añadir medicamento
                                                                    </Button>
                                                                </Form.Item>

                                                            </>
                                                        )}
                                                        </Form.List>
                                                            </Card>
                                                                <Card type="inner" className="mt-2" title="Instrucciones médicas">
                                                                    <TextArea className="mt-4" showCount maxLength={400}  value = {instrucciones} onChange = { intrucciones => campo_instrucciones(intrucciones) }/>
                                                                </Card>
                                                            </Card>                                                            
                                                        </Col>
                                                    </Row>
                                                    
                                                    <Row className="">
                                                        <Col span={24}>
                                                            <Card type="inner" className="" title="Plan de tratamiento">
                                                                <TextArea className="mt-4" showCount maxLength={400} value = {tratamiento} onChange = { tratamiento => campo_tratamiento(tratamiento) }/>
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
                                        <Button type="primary" htmlType="submit">
                                            Siguiente
                                        </Button>
                                        
                                        )}
                                        {current === steps.length - 1 && (
                                        // <Button type="primary" onClick={() => message.success('Cita finalizada con éxito!')}>
                                        //     Terminar cita
                                        // </Button>
                                            // <Button type="primary" visible = {true} htmlType="submit">
                                            //     Guardar cita
                                            // </Button>
                                            // <Button type="primary" visible = {true} onClick = {showModal}>
                                            //     Guardar cita
                                            // </Button>
                                            // <Button type="primary" visible = {true} onClick = {() => info()}>
                                            //     Guardar cita
                                            // </Button>
                                            // <Button type="primary" onClick = {() => showConfirm()}>
                                            //     Guardar cita
                                            // </Button>
                                            <Button type="primary" htmlType="submit">
                                                Guardar cita
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
                                {/* <Alert
                                    message="Paciente alérgico:"
                                    description="Complejo B"
                                    type="warning"
                                    showIcon
                                    className="ms-3 me-3 mb-3 mt-2"
                                /> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col span = {24}>
                                <Collapse defaultActiveKey={['1']}>
                                    <Panel header="Archivos adjuntos" extra = {<PaperClipOutlined />} key="1">
                                        {/* <Card type="inner" className="text-center mb-1">
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
                                        </Card> */}
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
                                    <Panel header="Citas pasadas" extra = {<CalendarOutlined />} key="2">
                                        {/* <Card type="inner" className="text-center mb-1">
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
                                        </Card> */}
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
                                    <Panel header="Enfermedades anteriores diagnosticadas" extra = {<FileOutlined />} key="3">
                                        {/* <Card type="inner" className="text-center mb-1">
                                            <Row>
                                                <p>Cirugías Previas, Diabetes, Enfermedades Tiroideas, Hipertensión Arterial, Cardiopatias, Traumatismos, Cáncer, Tuberculosis, Transfusiones, Patologías Respiratorias, Patologías Gastrointestinales
                                                </p>
                                            </Row>
                                        </Card> */}
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