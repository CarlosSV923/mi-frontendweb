import React, { Component } from 'react';
import { Form, Button, Select, message, DatePicker, Space, Spin } from 'antd';
import AxiosPersonas from './../Services/AxiosPersonas';
import moment from 'moment';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import AxiosCitas from './../Services/AxiosCitas';
import { estadoCitaColor } from './enumEstadoCita';
import Auth from './../Login/Auth';
import ModalDescargar from './modals/ModalDescargar';
import { truncate } from 'fs';

require('moment/locale/es-us.js');

const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';

export default class FilterAgenda extends Component {
    constructor(props) {
        super(props);
        this.cloaseModal = this.cloaseModal.bind(this);
        this.state = {
            pacientes: [],
            isLoading: false,
        }
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.setState({ userData: Auth.getDataUser() });
    }

    debounceLocal = (fn, delay = 50) => {
        let time;
        return (...args) => {
            clearTimeout(time);
            time = setTimeout(() => fn(...args), delay);
        };
    };

    getCitasMedico(filter) {
        AxiosCitas.getCitasMedico(filter).then(resp => {
            console.log(resp);
            const citas = resp.data.map(cita => {
                cita.title = cita.cedula + " - " + cita.nombre + " " + cita.apellido;
                cita.bgColor = estadoCitaColor[cita.estado];
                cita.start = new Date(cita.start);
                cita.end = new Date(cita.end);
                return cita;
            });
            console.log(citas);
            this.props.setDataFilter({ events: citas, date: this.state.filter.date_min });
            this.setState({ isLoading: false })
        }).catch(err => {
            this.setState({ isLoading: false })
            console.log(err);
            message.error('No se cargar las citas, intentelo mas tarde!');
        });
    }

    getPacientes = (value) => {
        this.setState({ fetchingPacientes: true, pacientes: [] });
        var filter = { filter: value };
        AxiosPersonas.getPacientesFilter(filter).then(resp => {
            console.log(resp);
            this.setState({ fetchingPacientes: false, pacientes: resp.data });
        }).catch(err => {
            this.setState({ fetchingPacientes: false });
            console.log(err);
        });
    }



    getCitas(e) {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            const filter = {
                paciente: values.paciente ? values.paciente.value : null,
                cedula: this.state.userData.cedula,
                date_min: values.dateRange[0]._d,
                date_max: values.dateRange[1]._d,
            }
            this.setState({
                isLoading: true,
                filter,
            }, () => { this.getCitasMedico(filter) });
        }).catch(err => {
            console.log(err);
        });
    }

    getCitasReporte(e) {
        e.preventDefault();
        if (this.state.filter) {

            this.setState({ fetchingData: true, visible: true});  
            AxiosCitas.getCitasReporte(this.state.filter).then(resp => {
                this.setState({fetchingData: false, data: resp.data})
            }).catch(error => {
                console.log(error);
                this.setState({ fetchingData: false}); 
            });
        }
        else {
            message.warning("Debe seleccionar un filtro de busqueda para generar un reporte.");
        }
    }

    cloaseModal(){
        this.setState({data:null, fetchingData: false, visible: false})
    }

    render() {
        return (
            <div style={{ "display": "flex", justifyContent: "flex-end" }}>
                <Form
                    ref={this.formRef}
                    layout="inline"
                    onSubmi={this.handlerCrearCita}
                >
                    <Form.Item
                        name="dateRange"
                        // label="Seleccione las fechas de busqueda"
                        rules={[
                            {
                                required: true,
                                message: "*Debe seleccionar un rango de fechas para realizar la busqueda."
                            },
                        ]}
                    >
                        <RangePicker
                            placeholder={["Desde", "Hasta"]}
                            format={dateFormat}
                        />
                    </Form.Item>
                    <Form.Item
                        name="paciente"
                        // label="Seleccione o busque al Paciente"
                        
                    >
                        <Select
                            style={{width:"100%"}}
                            labelInValue
                            showSearch
                            filterOption={false}
                            placeholder={"Ingrese la cedula o el nombre del paciente"}
                            notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                            onSearch={(value) => { this.debounceLocal(this.getPacientes(value), 80) }}
                        >
                            {this.state.pacientes.map(user => (<Select.Option key={user.cedula} value={user.cedula}>{user.cedula + " - " + user.nombre + " " + user.apellido}</Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            loading={this.state.isLoading}
                            onClick={(e) => this.getCitas(e)}
                            placeholder="Buscar"
                        >Buscar</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={(e) => this.getCitasReporte(e)}
                            placeholder="Reporte"
                        >
                            Reporte
                            </Button>
                    </Form.Item>

                </Form>
                <ModalDescargar 
                    visible={this.state.visible}
                    onCancel={this.cloaseModal}
                    isLoading={this.state.fetchingData}
                    data={this.state.data}
                />
            </div>
        );
    }
}