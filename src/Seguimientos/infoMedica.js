import React from 'react';
import 'antd/dist/antd.css';
import {
    Steps, Button, message, Form, Input, Popconfirm, Row, Col,
    Collapse, Badge, Alert, Divider, Card, Select, InputNumber,
    Upload, Modal, Empty, Avatar, Table, Tabs, Typography
} from 'antd'
import {
    UserOutlined, InfoCircleOutlined, HeartOutlined,
    PlusSquareOutlined, FileAddOutlined, PlusOutlined,
    PaperClipOutlined, CalendarOutlined, FileOutlined,
    LineChartOutlined, MedicineBoxFilled,
    FileImageOutlined, DatabaseOutlined,
    MinusCircleOutlined, DeleteOutlined, EyeOutlined
} from '@ant-design/icons';
import ModalSignoVital from './modalSignoVital';
import AxiosSignosVitales from './../Services/AxiosSignosVitales';
import AxiosSeguimientos from './../Services/AxiosSeguimientos';
import Auth from './../Login/Auth';

const { Title, Text } = Typography;

export default class InfoMedica extends React.Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveSignoVital = this.saveSignoVital.bind(this);
        this.editSignoVital = this.editSignoVital.bind(this);
        this.state = {
            infoMedica: [],
            seguimiento: {},
            visibleModal: false,
            editSigno: false,
            loadingSave: false,
            signo: null
        }
    }

    openEditModal(signo) {
        this.setState({ visibleModal: true, signo, editSigno: true });
    }

    getColumnsFormat() {
        return [
            {
                title: 'Signo Vital',
                dataIndex: 'key',
                key: 'key',
                render: text => <div>{text}</div>
            },
            {
                title: 'Valor',
                dataIndex: 'value',
                key: 'value',
                render: text => <div>{text}</div>
            },
            {
                title: 'Unidad',
                dataIndex: 'unidad',
                key: 'unidad',
                render: text => <div>{text}</div>
            },
            {
                title: 'Descipción',
                dataIndex: 'descrip',
                key: 'descrip',
                render: text => <div>{text ? text : "-"}</div>
            },
            {
                title: 'Fecha Registro',
                dataIndex: 'created_at',
                key: 'created_at',
                render: text => <div>{text ? text.split("T")[0] : "-"}</div>
            },
            {
                title: 'Acción',
                dataIndex: 'accion',
                render: (_, record) =>
                    <div className="text-center">
                        <Button style={{ border: "none" }} onClick={e => { this.openEditModal(record) }} className="me-4">
                            <EyeOutlined />
                        </Button>
                        <Popconfirm title="¿Quiere eliminar este registro?" onConfirm={(e) => { this.deleteSignoVital(record) }}>
                            <Button
                                type="link"
                            >
                                <DeleteOutlined className="text-danger" />
                            </Button>
                        </Popconfirm>

                    </div>,
            }
        ];
    }

    formatDataSeg() {
        if (this.state.seguimientoData) {
            const seg = this.state.seguimientoData["seguimiento"];
            const inf = this.state.seguimientoData["infoMedica"];
            if (seg) {
                this.setState({
                    fi: seg["fecha_inicio"] ? seg["fecha_inicio"] : "-",
                    ff: seg["fecha_fin"] ? seg["fecha_fin"] : "-",
                    paciente: seg["cedulaPaciente"],
                    medico: seg["cedulaMedico"],
                    nombPac: seg["nombrePaciente"] && seg["apellidoPaciente"] ? seg["nombrePaciente"] + " " + seg["apellidoPaciente"] : "-",
                    nombMed: seg["nombreMedico"] && seg["apellidoMedico"] ? seg["nombreMedico"] + " " + seg["apellidoMedico"] : "-",
                    estado: seg["estadoSeguimiento"] ? seg["estadoSeguimiento"] : "-",
                    infoMedica: inf ? inf : [],
                });
            }
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

    openModal(editSigno) {
        this.setState({ visibleModal: true, editSigno, signo: null });
    }

    closeModal() {
        this.setState({ visibleModal: false, editSigno: false, signo: null });
    }

    saveSignoVital(signo) {
        this.setState({ loadingSave: true });
        AxiosSignosVitales.saveSignosVitales({...signo, paciente: this.state.paciente, medico: this.state.medico, isPaciente: Auth.isPaciente()}).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, signo: null, visibleModal: false, editSigno: false }, () => { this.props.getSeguimientoId() });
            message.success("Signo Vital Guardado Correctamente.");
        }).catch(error => {
            console.log(error);
            this.setState({ loadingSave: false });
            message.error("No se pudo registrar el signo vital. Intentelo mas tarde.");
        });
    }

    deleteSignoVital(signo) {
        AxiosSignosVitales.deleteSignoVital(signo).then(resp => {
            console.log(resp);
            this.props.getSeguimientoId();
            message.success("Signo Vital eliminado Correctamente.");
        }).catch(error => {
            console.log(error);
            message.error("No se pudo eliminar el signo vital. Intentelo mas tarde.");
        });
    }

    updateSeguimiento(data) {
        this.setState({ loadingFinalizar: true });
        AxiosSeguimientos.finalizarSeguimiento(data).then(resp => {
            console.log(resp);
            this.setState({ loadingFinalizar: false });
            this.props.getSeguimientoId();
            message.success("Seguimiento actualizado Correctamente.");
        }).catch(error => {
            console.log(error);
            this.setState({ loadingFinalizar: false });
            message.error("No se pudo actualizar el seguimiento. Intentelo mas tarde.");
        });
    }

    editSignoVital(signo) {
        this.setState({ loadingSave: true });
        AxiosSignosVitales.editSignosVitales(signo).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, signo: null, visibleModal: false, editSigno: false }, () => { this.props.getSeguimientoId() });
            message.success("Signo Vital editado correctamente.");
        }).catch(error => {
            console.log(error);
            this.setState({ loadingSave: false });
            message.error("No se pudo actualizar el signo vital. Intentelo mas tarde.");
        });
    }

    render() {
        return (
            <div>
                <Row justify="end">
                    <Col style={{ textAlign: "end" }} span={24}>
                        {this.state.estado === "P" ? <Button
                            type="primary"
                            loading={this.state.loadingFinalizar}
                            onClick={(e) => { this.updateSeguimiento({ id_seguimiento: this.state.idSeg, estado: "F" }) }}
                        >
                            Finalizar Seguimiento
                        </Button> : null}
                        {this.state.estado === "F" ? <Button
                            type="primary"
                            loading={this.state.loadingFinalizar}
                            onClick={(e) => { this.updateSeguimiento({ id_seguimiento: this.state.idSeg, estado: "P" }) }}
                        >
                            Reabrir Seguimiento
                        </Button> : null}
                    </Col>
                </Row>
                <Row>

                    <Col className="text-center" span={24}>
                        <Title level={4}>Seguimiento de Paciente</Title>
                    </Col>
                </Row>
                <br />
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
                    <Col span={10}>
                        <Row>
                            <Col className="text-center">
                                <Text className="mx-1 lead" >Paciente: <b>{this.state.nombPac ? this.state.nombPac : ""}</b></Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <span className="mx-1 lead">Seguimiento <b>{this.state.estado ? (this.state.estado === "P" ? "En Proceso" : "Finalizado") : "-"}</b></span>

                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24} className="text-center">
                                <span className="mx-2 lead">Iniciado en: <b>{this.state.fi ? this.state.fi : ""}</b> - Finalizado en: <b>{this.state.ff ? this.state.ff : ""}</b></span>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={24} className="text-center">
                                <span className="mx-2 lead">Medico a Cargo: <b>{this.state.nombMed ? this.state.nombMed : ""}</b></span>
                            </Col>
                        </Row>
                    </Col>

                </Row>
                <br />
                <div>
                    <br />
                    <Title style={{ textAlign: "center" }} level={4}>Historial de Signos Vitales</Title>
                    <Button
                        type="primary"
                        style={{
                            marginBottom: 16,
                        }}
                        onClick={(e) => { this.openModal(false) }}
                    >
                        Agregar Signo Vital
                    </Button>
                    <Table columns={this.getColumnsFormat()} loading={this.state.isLoadingSeg} bordered={true} dataSource={this.state.infoMedica ? this.state.infoMedica : []} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} rowKey={row => row.id_info_medica} />
                </div>

                <ModalSignoVital
                    visible={this.state.visibleModal}
                    close={this.closeModal}
                    edit={this.state.editSigno}
                    signo={this.state.signo}
                    saveSignoVital={this.saveSignoVital}
                    loadingSave={this.state.loadingSave}
                    editSignoVital={this.editSignoVital}
                    idSeg={this.state.idSeg}
                />

            </div>
        );
    }
}