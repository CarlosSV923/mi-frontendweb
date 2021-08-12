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
import ModalExamAsociados from './modalExamAsociado';
import Auth from './../Login/Auth';
require('moment/locale/es-us.js');

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

export default class IndexTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            seguimientos: []
        }
    }

    componentDidMount() {

        this.getSeguimientos(this.getPersona());
    }

    getPersona() {
        if (Auth.isMedico()) {
            return { medico: Auth.getDataUser().cedula };
        }
        if (Auth.isPaciente()) {
            return { paciente: Auth.getDataUser().cedula };
        }
        return {};
    }

    getSeguimientos(filtro = {}) {
        AxiosSeguimientos.getSeguimientos(filtro).then(resp => {
            console.log(resp);
            const segs = resp.data.map(seg => {
                return {
                    ...seg,
                    paciente: seg.nombrePaciente && seg.apellidoPaciente ? seg.nombrePaciente + " " + seg.apellidoPaciente : "N/A",
                    medico: seg.nombreMedico && seg.apellidoMedico ? seg.nombreMedico + " " + seg.apellidoMedico : "N/A",
                }

            });

            this.setState({ seguimientos: segs, isLoading: false });

        }).catch(error => {
            console.log(error);
            this.setState({ isLoading: false });
            message.error("No se pudo obtener los seguimientos. Intentelo mas tarde.");
        });
    }

    getSegFilter(e) {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            const filter = {
                date_min: values.dateRange[0]._d,
                date_max: values.dateRange[1]._d,
                ...this.getPersona(),
            }
            this.getExamenesSeg(filter);
        }).catch(err => {
            console.log(err);
        });
    }

    getColumnsFormat() {
        return [
            {
                title: 'Estado Seguimiento',
                dataIndex: 'estadoSeguimiento',
                key: 'estadoSeguimiento',
                render: text => <div>{text ? text === "P" ? "En Proceso" : "Finalizado" : "N/A"}</div>
            },
            {
                title: 'Fecha de Inicio',
                dataIndex: 'fecha_inicio',
                key: 'fecha_inicio',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Fecha Finalizacion',
                dataIndex: 'fecha_fin',
                key: 'fecha_fin',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Medico',
                dataIndex: 'medico',
                key: 'medico',
                render: text => <div>{text ? text.split("T")[0] : "N/A"}</div>
            },
            {
                title: 'Paciente',
                dataIndex: 'paciente',
                key: 'paciente',
                render: text => <div>{text ? text.split("T")[0] : "N/A"}</div>
            },

            {
                title: 'Acción',
                dataIndex: 'accion',
                render: (_, record) =>
                    <div className="text-center">
                        <a target="_blank" rel="noreferrer" href={(Auth.isPaciente() ? "/paciente/seguimiento/" : "/medico/seguimiento/") + record.id_seguimiento} className="me-4">
                            Ver Detalles
                        </a>
                    </div>,
            }
        ];
    }

    render() {
        return (
            <div>
                <Row>
                    <Col className="text-center" span={24}>
                        <Title level={4}>Historial de Seguimientos</Title>
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
                                    onClick={(e) => this.getSegFilter(e)}
                                    placeholder="Buscar"
                                >
                                    Buscar
                                </Button>
                            </Form.Item>


                        </Form>
                    </Col>
                </Row>
                <br />
                <Table columns={this.getColumnsFormat()} loading={this.state.isLoadingSeg} bordered={true} dataSource={this.state.seguimientos ? this.state.seguimientos : []} pagination={{ pageSize: 50 }} scroll={{ y: 300 }} rowKey={row => row.id_seguimiento} />

            </div>
        );
    }

}