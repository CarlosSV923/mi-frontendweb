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
import AxiosExamenes from './../Services/AxiosExamenes';
import AxiosCitas from '../Services/AxiosCitas';
import moment from 'moment';
import Auth from './../Login/Auth';
import ModalExamAsociados from './modalExamAsociado';

require('moment/locale/es-us.js');

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

export default class CitasAsociadas extends React.Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveExamenAsociada = this.saveExamenAsociada.bind(this);
        this.editExamenAsociada = this.editExamenAsociada.bind(this);
        this.state = {
            examenes: [],
            visibleModal: false,
            loadingSave: false,
            editExam: false,
            examen: null,
        }
        this.formRef = React.createRef();
    }

    formatDataSeg() {
        if (this.state.seguimientoData) {
            const exa = this.state.seguimientoData["examenes"];
            const seg = this.state.seguimientoData["seguimiento"];
            this.setState({
                examenes: exa ? exa : [],
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


    closeModal() {
        this.setState({ visibleModal: false, editExam: false, examen: null });
    }

    openModal(editExam) {
        this.setState({ visibleModal: true, editExam, examen: null });
    }

    openEditModal(examen) {
        this.setState({ visibleModal: true, examen, editExam: true });
    }

    saveExamenAsociada(exam) {
        exam.append("paciente", this.state.paciente);
        exam.append("medico", this.state.medico);
        exam.append("isPaciente", Auth.isPaciente());
        this.setState({ loadingSave: true });
        AxiosExamenes.saveExamen(exam).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, examen: null, visibleModal: false, editExam: false }, () => { this.props.getSeguimientoId() });
            message.success("Examen Guardado Correctamente.");
        }).catch(err => {
            console.log(err);
            this.setState({ loadingSave: false });
            message.error("No se pudo registrar el examen. Intentelo mas tarde.");
        });

    }

    editExamenAsociada(exam) {
        this.setState({ loadingSave: true });
        console.log(exam)
        AxiosExamenes.editExamen(exam).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, examen: null, visibleModal: false, editExam: false }, () => { this.props.getSeguimientoId() });
            message.success("Examen actualizado Correctamente.");
        }).catch(err => {
            console.log(err);
            this.setState({ loadingSave: false });
            message.error("No se pudo actualizar el examen. Intentelo mas tarde.");
        });


    }

    deleteExamenAsociado(examen) {
        AxiosExamenes.deleteExamen(examen).then(resp => {
            console.log(resp);
            this.props.getSeguimientoId()
            message.success("Examen eliminado correctamente")
        }).catch(err => {
            console.log(err);
            message.error("El Examen no se pudo eliminar. Intentelo mas tarde.");
        });
    }

    getExamenesSeg(filter) {
        AxiosExamenes.getExamenesFilter(filter).then(resp => {

            console.log(resp);
            this.setState({ isLoadingExa: false, examenes: resp.data });
        }).catch(err => {
            this.setState({ isLoadingExa: false })
            console.log(err);
            message.error('No se cargar las citas, intentelo mas tarde!');
        });
    }

    getExamenes(e) {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            const filter = {
                id_seguimiento: this.state.idSeg,
                date_min: values.dateRange[0]._d,
                date_max: values.dateRange[1]._d,
            }
            this.setState({
                isLoadingExa: true,
            }, () => { this.getExamenesSeg(filter) });
        }).catch(err => {
            console.log(err);
        });
    }

    getColumnsFormat() {
        return [
            {
                title: 'Tipo Examen',
                dataIndex: 'tipo_examen',
                key: 'tipo_examen',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Diagnostico',
                dataIndex: 'diagnostico',
                key: 'diagnostico',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Comentarios',
                dataIndex: 'comentarios',
                key: 'comentarios',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Fecha Registro',
                dataIndex: 'created_at',
                key: 'created_at',
                render: text => <div>{text ? text.split("T")[0] : "N/A"}</div>
            },

            {
                title: 'Acción',
                dataIndex: 'accion',
                render: (_, record) =>
                    <div className="text-center">
                        <Button style={{ border: "none" }} onClick={e => { this.openEditModal(record) }} className="me-4">
                            <EyeOutlined />
                        </Button>
                        {Auth.isMedico() ? <Popconfirm title="¿Quiere eliminar este registro?" onConfirm={(e) => { this.deleteExamenAsociado(record) }}>
                            <Button
                                type="link"
                            >
                                <DeleteOutlined className="text-danger" />
                            </Button>
                        </Popconfirm> : null}

                    </div>,
            }
        ];
    }

    render() {
        return (
            <div>
                <Row>
                    <Col className="text-center" span={24}>
                        <Title level={4}>Historial de Examenes Asociados</Title>
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
                                    loading={this.state.isLoadingExa}
                                    onClick={(e) => this.getExamenes(e)}
                                    placeholder="Buscar"
                                >
                                    Buscar
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={(e) => { this.openModal(false) }}
                                >
                                    Agendar Nuevo Examen
                                </Button>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
                <br />
                <Table columns={this.getColumnsFormat()} loading={this.state.isLoadingSeg} bordered={true} dataSource={this.state.examenes ? this.state.examenes : []} pagination={{ pageSize: 50 }} scroll={{ y: 300 }} rowKey={row => row.id_examen} />



                <ModalExamAsociados
                    visible={this.state.visibleModal}
                    close={this.closeModal}
                    edit={this.state.editExam}
                    examen={this.state.examen}
                    saveExamenAsociada={this.saveExamenAsociada}
                    loadingSave={this.state.loadingSave}
                    editExamenAsociada={this.editExamenAsociada}
                    idSeg={this.state.idSeg}
                />
            </div>
        );
    }
}