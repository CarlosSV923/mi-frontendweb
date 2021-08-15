import React from 'react';
import 'antd/dist/antd.css';
import {
    Steps, Button, message, Form, Input, Popconfirm, Row, Col,
    Collapse, DatePicker, Alert, Divider, Card, Select, InputNumber,
    Upload, Modal, Spin, Table, Tabs, Typography
} from 'antd'
import {
    UserOutlined, InfoCircleOutlined, HeartOutlined,
    PlusSquareOutlined, FileAddOutlined, PlusOutlined,
    PaperClipOutlined, CalendarOutlined, FileOutlined,
    LineChartOutlined, MedicineBoxFilled,
    FileImageOutlined, DatabaseOutlined,
    MinusCircleOutlined, DeleteOutlined, EyeOutlined
} from '@ant-design/icons';

import AxiosPersonas from './../Services/AxiosPersonas';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default class ModalPaciente extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pacientes: []
        }
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            visible: this.props.visible,
            loadingSave: this.props.loadingSave,
        })
    }

    componentDidUpdate() {
        if (this.state.visible !== this.props.visible) {
            this.setState({ visible: this.props.visible }, () => {
                if (!this.state.visible) {
                    this.formRef.current.setFieldsValue({
                        paciente: {
                            key: null,
                            value: null,
                            label: null
                        }
                    })
                }
            });
        }
        if (this.state.loadingSave !== this.props.loadingSave) {
            this.setState({ loadingSave: this.props.loadingSave });
        }

    }
    
    savePacienteAsociado(e) {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            this.setState({
                pacienteSave: {
                    paciente: values.paciente.value,

                }
            }, () => {

                this.props.savePacienteAsociado(this.state.pacienteSave);

            });
        }).catch(err => {
            console.log(err);
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

    render() {
        return (
            <div>
                <Modal title={"Paciente a Cargo"}
                    visible={this.state.visible}
                    onCancel={(e) => { this.props.close() }}
                    footer={[
                        <Button key="back" onClick={(e) => { this.props.close() }}>
                            Cancelar
                        </Button>,
                        <Button htmlType="submit" loading={this.state.loadingSave} type="primary" onClick={(e) => { this.savePacienteAsociado(e) }}>
                            Guardar
                        </Button>
                    ]}
                >
                    <div style={{ textAlign: "center" }}>
                        <Form
                            ref={this.formRef}
                            layout="vertical"
                        >
                            <Form.Item
                                name="paciente"
                                label="Seleccione o busque al Paciente"
                                rules={[
                                    {
                                        required: true,
                                        message: "*Debe Seleccionar un Paciente"
                                    },
                                ]}
                            >
                                <Select
                                    labelInValue
                                    showSearch
                                    disabled={this.state.event}
                                    filterOption={false}
                                    placeholder={"Ingrese la cedula o el nombre del paciente"}
                                    notFoundContent={this.state.fetchingPacientes ? <Spin size="small" /> : null}
                                    onSearch={(value) => { this.debounceLocal(this.getPacientes(value), 80) }}
                                >
                                    {this.state.pacientes.map(user => (<Select.Option key={user.cedula} value={user.cedula}>{user.cedula + " - " + user.nombre + " " + user.apellido}</Select.Option>))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div >
        );
    }

}