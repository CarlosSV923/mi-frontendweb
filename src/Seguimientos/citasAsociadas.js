import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import {
    Steps, Button, message, Form, Input, Popconfirm, Row, Col,
    Collapse, DatePicker, Alert, Divider, Card, Select, InputNumber,
    Upload, Modal, Empty, Avatar, Table, Tabs, Typography
} from 'antd'
import {
    UserOutlined, InfoCircleOutlined, HeartOutlined,
    SearchOutlined, DeleteOutlined, EyeOutlined
} from '@ant-design/icons';
import ModalSignoVital from './modalSignoVital';
import AxiosSignosVitales from './../Services/AxiosSignosVitales';
import AxiosSeguimientos from './../Services/AxiosSeguimientos';
import AxiosCitas from '../Services/AxiosCitas';
import moment from 'moment';
import ModalAgenCitaAsociada from './modalAgenCitaAsociada';

require('moment/locale/es-us.js');

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

export default class CitasAsociadas extends React.Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveCitaAsociada = this.saveCitaAsociada.bind(this);
        this.state = {
            citas: [],
            visibleModal: false,
            loadingSave: false,
        }
        this.formRef = React.createRef();
    }

    formatDataSeg() {
        if (this.state.seguimientoData) {
            const citas = this.state.seguimientoData["citas"];
            const seg = this.state.seguimientoData["seguimiento"];
            this.setState({
                citas: citas ? citas : [],
                paciente: seg["cedulaPaciente"],
                medico: seg["cedulaMedico"],
            });
        }
    }

    componentDidMount() {
        this.setState({
            seguimientoData: this.props.seguimientoData,
            isLoadingSeg: this.props.isLoadingSeg,
            idSeg: this.props.idSeg,
        }, () => { this.formatDataSeg() })
    }

    componentDidUpdate() {
        if (this.state.seguimientoData !== this.props.seguimientoData) {
            this.setState({ seguimientoData: this.props.seguimientoData }, () => { this.formatDataSeg() });
        }
        if (this.state.isLoadingSeg !== this.props.isLoadingSeg) {
            this.setState({ isLoadingSeg: this.props.isLoadingSeg });
        }
        if (this.state.idSeg !== this.props.idSeg) {
            this.setState({ idSeg: this.props.idSeg });
        }
    }

    transfonEstadoCita(estado) {
        if (estado) {
            if (estado === "P") return "Pendiente";
            if (estado === "A") return "Atendida";
            if (estado === "C") return "Cancelada";
        }
        return "N/A"
    }

    closeModal() {
        this.setState({ visibleModal: false });
    }

    openModal() {
        this.setState({ visibleModal: true });
    }

    saveCitaAsociada(cita) {
        const start = cita.start;
        const end = cita.end;

        start.setMinutes(start.getMinutes() - (5 * 60));
        end.setMinutes(end.getMinutes() - (5 * 60));

        const citaSave = {
            paciente: this.state.paciente,
            medico: this.state.medico,
            init_comment: cita.desc,
            inicio_cita: new Date(start),
            fin_cita: new Date(end),
            id_seguimiento: this.state.idSeg,
        }

        this.setState({ loadingSave: true });
        AxiosCitas.agendarCitaAsociada(citaSave).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, visibleModal: false }, () => { this.props.getSeguimientoId() });
            message.success("Cita Agendada Correctamente.");
        }).catch(error => {
            console.log(error);
            this.setState({ loadingSave: false });
            message.error("No se pudo agendar la cita. Intentelo mas tarde.");
        });
    }

    getCitasSeg(filter) {
        AxiosCitas.getCitasSeg(filter).then(resp => {

            console.log(resp);
            this.setState({ isLoadingCitas: false, citas: resp.data });
        }).catch(err => {
            this.setState({ isLoadingCitas: false })
            console.log(err);
            message.error('No se cargar las citas, intentelo mas tarde!');
        });
    }

    getCitas(e) {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            const filter = {
                id_seguimiento: this.state.idSeg,
                date_min: values.dateRange[0]._d,
                date_max: values.dateRange[1]._d,
            }
            this.setState({
                isLoadingCitas: true,
            }, () => { this.getCitasSeg(filter) });
        }).catch(err => {
            console.log(err);
        });
    }

    getColumnsFormat() {
        return [
            {
                title: 'Estado Cita',
                dataIndex: 'estado',
                key: 'estado',
                render: text => <div>{this.transfonEstadoCita(text)}</div>
            },
            {
                title: 'Comentario',
                dataIndex: 'init_comment',
                key: 'init_comment',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Inicio Cita',
                dataIndex: 'inicio_cita',
                key: 'inicio_cita',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Fin Cita',
                dataIndex: 'fin_cita',
                key: 'fin_cita',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Agendada',
                dataIndex: 'fecha_agendada',
                key: 'fecha_agendada',
                render: text => <div>{text ? text.split(" ")[0] : "N/A"}</div>
            },
            {
                title: 'Atendida',
                dataIndex: 'fecha_atencion',
                key: 'fecha_atencion',
                render: text => <div>{text ? text.split(" ")[0] : "N/A"}</div>
            },
            {
                title: 'Sintomas',
                dataIndex: 'sintomas',
                key: 'sintomas',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Tratamiento',
                dataIndex: 'planTratam',
                key: 'planTratam',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Instrucciones',
                dataIndex: 'instrucciones',
                key: 'instrucciones',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Acción',
                dataIndex: 'accion',
                fixed: 'right',
                width: 140,
                render: (_, record) =>
                    <div className="text-center">
                        <Link target="_blank" to = {record.estado === "P" ? `/medico/atenderCita/${record.id_cita}`:`/medico/citaanterior/paciente/${record.id_cita}/${record.paciente}`} className="me-4">
                            {record.estado === "P" ? "Atender Cita" : "Ver Detalles"}
                        </Link>
                    </div>,
            }
        ];
    }

    render() {
        return (
            <div>
                <Row>
                    <Col className="text-center" span={24}>
                        <Title level={4}>Historial de Citas Asociadas</Title>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col style={{ textAlign: "end" }} span={24}>

                        <Form
                            ref={this.formRef}
                            layout="inline"
                        >
                            <Form.Item
                                name="dateRange"
                                label="Agendada: "
                                rules={[
                                    {
                                        required: true,
                                        message: "*Debe seleccionar un rango de fechas para realizar la busqueda."
                                    },
                                ]}
                            >
                                <RangePicker
                                    style={{ width: "100%" }}
                                    placeholder={["Desde", "Hasta"]}
                                    format={dateFormat}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    icon={<SearchOutlined />}
                                    loading={this.state.isLoadingCitas}
                                    onClick={(e) => this.getCitas(e)}
                                    placeholder="Buscar"
                                >
                                    Buscar
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={(e) => { this.openModal() }}
                                >
                                    Agendar Nueva Cita
                                </Button>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
                <br />
                <Table columns={this.getColumnsFormat()} loading={this.state.isLoadingSeg} bordered={true} dataSource={this.state.citas ? this.state.citas : []} pagination={{ pageSize: 50 }} scroll={{ x: 1400, y: 300 }} rowKey={row => row.id_cita} />

                <ModalAgenCitaAsociada
                    visible={this.state.visibleModal}
                    close={this.closeModal}
                    loadingSave={this.state.loadingSave}
                    idSeg={this.state.idSeg}
                    saveCitaAsociada={this.saveCitaAsociada}
                />
            </div>
        );
    }
}