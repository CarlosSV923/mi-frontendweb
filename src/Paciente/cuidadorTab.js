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
    SearchOutlined, DeleteOutlined
} from '@ant-design/icons';

import AxiosPersonas from '../Services/AxiosPersonas';
import ModalCuidador from './modalCuidador';
import Auth from '../Login/Auth';
require('moment/locale/es-us.js');

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default class CuidadorTab extends React.Component {

    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.savePacienteAsociado = this.savePacienteAsociado.bind(this);
        this.state = {
            fetchingPacientes: true,
            cuidadores: []
        }
    }

    componentDidMount() {
        this.getPacientes();
    }

    closeModal() {
        this.setState({ visibleModal: false });
    }

    openModal() {
        this.setState({ visibleModal: true });
    }

    getColumnsFormat() {
        return [
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Apellido',
                dataIndex: 'apellido',
                key: 'apellido',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Cedula',
                dataIndex: 'cedula',
                key: 'cedula',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Correo',
                dataIndex: 'correo',
                key: 'correo',
                render: text => <div>{text ? text : "N/A"}</div>
            },
            {
                title: 'Nombre de Usuario',
                dataIndex: 'username',
                key: 'username',
                render: text => <div>{text ? text : "N/A"}</div>
            },

            {
                title: 'Acción',
                dataIndex: 'accion',
                render: (_, record) =>
                    <div className="text-center">
                        <Popconfirm title="¿Quiere eliminar este registro?" onConfirm={(e) => { this.deletePacienteAsociado(record) }}>
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

    getPacientes = (value = null) => {
        this.setState({ fetchingPacientes: true, cuidadores: [] });
        var filter = { filter: value };
        AxiosPersonas.getCuidadoresPacienteFilter({ ...filter, paciente: Auth.getDataUser().cedula }).then(resp => {
            console.log(resp);
            this.setState({ fetchingPacientes: false, cuidadores: resp.data });
        }).catch(err => {
            this.setState({ fetchingPacientes: false });
            console.log(err);
            message.error("Error consultando pacientes a cargo. Intentelo mas tarde.");
        });
    }

    savePacienteAsociado = (cuidador) => {
        this.setState({ loadingSave: true });
        AxiosPersonas.savePacienteAsociadoCuidador({ ...cuidador, paciente: Auth.getDataUser().cedula }).then(resp => {
            console.log(resp);
            this.setState({ loadingSave: false, visibleModal: false }, () => { this.getPacientes() });
            message.success("Cuidador registrado correctamente.");
        }).catch(error => {
            console.log(error);
            this.setState({ loadingSave: false });
            message.error("Error registrando cuidador a cargo. Intentelo mas tarde.");
        });
    }

    deletePacienteAsociado = (reg) => {
        AxiosPersonas.deletePacienteAsociadoCuidador({ cuidador: reg.cedula, paciente: Auth.getDataUser().cedula }).then(resp => {
            console.log(resp);
            message.success("Cuidador eliminado correctamente.");
            this.getPacientes();
        }).catch(error => {
            console.log(error);
            message.error("Error eliminando cuidador a cargo. Intentelo mas tarde.");
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col className="text-center" span={24}>
                        <Title level={4}>Cuidadores a Cargo</Title>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col style={{ textAlign: "end" }} span={24}>

                        <Button
                            type="primary"
                            onClick={(e) => { this.openModal() }}
                        >
                            Agendar Cuidador
                        </Button>
                    </Col>
                </Row>
                <br />
                <Table columns={this.getColumnsFormat()} loading={this.state.fetchingPacientes} bordered={true} dataSource={this.state.cuidadores ? this.state.cuidadores : []} pagination={{ pageSize: 50 }} scroll={{ y: 300 }} rowKey={row => row.id_seguimiento} />

                <ModalCuidador
                    visible={this.state.visibleModal}
                    close={this.closeModal}
                    savePacienteAsociado={this.savePacienteAsociado}
                    loadingSave={this.state.loadingSave}
                />

            </div>

        );
    }

}