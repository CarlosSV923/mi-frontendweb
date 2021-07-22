import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Modal, Button, Spin, Title, Select, Input, DatePicker } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import CitasSrvices from "./../../Services/CitasServices";
import moment from 'moment';
import debounce from 'lodash/debounce';
require('moment/locale/es-us.js');
const { Meta } = Card;

const { RangePicker } = DatePicker;

export default class ModalAgenda extends React.Component {
    constructor(props) {
        super(props);
        this.getPacientes = this.getPacientes.bind(this);
        this.state = {
            visibleModal: this.props.visibleModal,
            slotInfo: this.props.slotInfo,
            event: this.props.event,
            dateFormat: "DD/MM/YYYY HH:mm",
            users: [],
            fetching: false,
        }
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            visibleModal: this.props.visibleModal,
            slotInfo: this.props.slotInfo,
            event: this.props.event
        });


    }

    debounceLocal = (fn, delay = 50) => {
        let time;
        return (...args) => {
            clearTimeout(time);
            time = setTimeout(() => fn(...args), delay);
        };
    };

    getPacientes = (value) => {
        this.setState({ fetching: true, users: [] });
        var filter = { cedula: value, nombre: value, apellido: value, rol: "Paciente" };
        CitasSrvices.getPersonasFilter(filter).then(resp => {
            console.log(resp);
            this.setState({ fetching: false });
            this.setState({ users: resp.data });
        }).catch(err => {
            this.setState({ fetching: false });
            console.log(err);
        });
    }

    componentDidUpdate() {

        if (this.state.visibleModal !== this.props.visibleModal) {
            this.setState({ visibleModal: this.props.visibleModal });
        }
        if (this.state.slotInfo !== this.props.slotInfo) {
            this.setState({ slotInfo: this.props.slotInfo }, () => {
                if (this.state.slotInfo) {
                    const start = moment(this.props.slotInfo.start.toLocaleString(), this.state.dateFormat);
                    const end = moment(this.props.slotInfo.end.toLocaleString(), this.state.dateFormat);
                    this.formRef.current.setFieldsValue({
                        start,
                        end,
                        rangeDate: [start, end]
                    })
                }

            });
        }
        if (this.state.event !== this.props.event) {
            this.setState({ event: this.props.event }, () => {
                if (this.state.event) {
                    const start = moment(this.props.event.start.toLocaleString(), this.state.dateFormat);
                    const end = moment(this.props.event.end.toLocaleString(), this.state.dateFormat);
                    this.formRef.current.setFieldsValue({
                        start,
                        end,
                        rangeDate: [start, end]
                    })
                }

            });
        }

    }

    handlerCrearCita = e => {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            this.setState({
                slotInfoSave: {
                    start: this.props.slotInfo.start, end: this.props.slotInfo.end, title: "Paciente", desc: values.comment
                }
            }, () => { this.props.agendarCita(this.state.slotInfoSave) });
        }).catch(err => {
            console.log(err);
        });
    }

    handlerEditarCita = e => {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            this.setState({
                eventSave: {
                    start: values.start._d,
                    end: values.end._d,
                    title: "Paciente",
                    desc: values.comment
                }
            }, () => { this.props.updateCita(this.state.eventSave) });
        }).catch(err => {
            console.log(err);
        });
    }

    handlerCancelarCita = (e) => {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            this.setState({
                eventSave: {
                    start: values.start._d,
                    end: values.end._d,
                    title: "Paciente",
                    desc: values.comment,
                    'bgColor': '#cd853f',

                }
            }, () => { this.props.cancelarCita(this.state.eventSave) });
        }).catch(err => {
            console.log(err);
        });
    }

    getBtnsAgendarCita() {
        return [
            <Button key="back" onClick={this.props.handleCancel}>
                Cerrar
            </Button>,
            <Button htmlType="submit" type="primary" onClick={this.handlerCrearCita}>
                Agendar
            </Button>];
    }



    getBtnsEditarCita() {
        return [
            <Button key="back" onClick={this.props.handleCancel}>
                Cerrar
            </Button>,
            <Button key="submit" type="primary" onClick={this.handlerCancelarCita}>
                Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={this.handlerEditarCita}>
                Guardar
            </Button>,
            <Button key="submit" type="primary">
                <Link to={{ pathname: '/atenderCita' }} >
                    Atender
                </Link>
            </Button>
        ];
    }

    render() {
        return (
            <div>
                {this.state.slotInfo || this.state.event ? <Modal title={this.state.slotInfo ? "Agendar Nueva Cita" : "Editar Cita"}
                    visible={this.state.visibleModal}
                    onOk={this.state.slotInfo ? this.props.agendarCita : this.props.updateCita}
                    onCancel={this.props.handleCancel}
                    footer={this.state.slotInfo ? this.getBtnsAgendarCita() : this.getBtnsEditarCita()}
                >
                    <div style={{ textAlign: "center" }}>
                        <Form
                            ref={this.formRef}
                            layout="vertical"
                            onSubmi={this.handlerCrearCita}
                        >
                            <Form.Item
                                name="paciente"
                                label="Seleccione o busque al Paciente"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    labelInValue
                                    showSearch
                                    
                                    filterOption={false}
                                    placeholder={"Ingrese la cedula o el nombre del paciente"}
                                    notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                                    onSearch={(value) => { this.debounceLocal(this.getPacientes(value), 80) }}
                                >
                                    {this.state.users.map(user => (<Select.Option key={user.cedula} value={user.cedula}>{user.cedula + " - " + user.nombre + " " + user.apellido}</Select.Option>))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="start" label="Fecha de inicio de la Cita">
                                <DatePicker style={{ width: "100%" }} showTime={{ format: 'HH:mm' }} format={this.state.dateFormat} disabled={this.state.slotInfo} />
                            </Form.Item>
                            <Form.Item name="end" label="Fecha de fin de la Cita">
                                <DatePicker style={{ width: "100%" }} showTime={{ format: 'HH:mm' }} format={this.state.dateFormat} disabled={this.state.slotInfo} />
                            </Form.Item>
                            {/* <Form.Item name="rangeDate" label="Fecha de la Cita">
                                <RangePicker style={{width: "100%"}} format={this.state.dateFormat} showTime={{format: 'HH', minuteStep:"30"}} disabled={this.state.slotInfo}  />
                            </Form.Item> */}
                            <Form.Item name="comment" label="Comentario">
                                <Input.TextArea />
                            </Form.Item>

                        </Form>

                    </div>
                </Modal> : null}
            </div>
        );
    }


}