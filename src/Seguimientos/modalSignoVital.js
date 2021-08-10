import React from 'react';
import 'antd/dist/antd.css';
import {
    Steps, Button, message, Form, Input, Popconfirm, Row, Col,
    Collapse, Badge, Alert, Divider, Card, Select, InputNumber,
    Upload, Modal, Empty, Table, Tabs, Typography
} from 'antd'
import {
    UserOutlined, InfoCircleOutlined, HeartOutlined,
    PlusSquareOutlined, FileAddOutlined, PlusOutlined,
    PaperClipOutlined, CalendarOutlined, FileOutlined,
    LineChartOutlined, MedicineBoxFilled,
    FileImageOutlined, DatabaseOutlined,
    MinusCircleOutlined, DeleteOutlined, EyeOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

let index = 0;

export default class ModalSignoVital extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signo: {},
            items: ["Estatura", "Peso", "Masa Coporal", "Porcentaje de grasa corporal", "Masa muscular", "Tensión arterial", "Frecuencia cardíaca", "Frecuencia respiratoria", "Saturación de oxígeno", "Temperatura"],
        }
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            visible: this.props.visible,
            edit: this.props.edit,
            signo: this.props.signo,
            idSeg: this.props.idSeg,
            loadingSave: this.props.loadingSave,
        })
    }

    componentDidUpdate() {
        if (this.state.visible !== this.props.visible) {
            this.setState({ visible: this.props.visible }, () => {
                if(!this.state.visible){
                    this.formRef.current.setFieldsValue({
                        key: {
                            key: null,
                            value: null,
                            label: null
                        }
                        ,
                        value: null,
                        unidad: null,
                        descrip: null,
                    })
                }
            });
        }
        if (this.state.edit !== this.props.edit) {
            this.setState({ edit: this.props.edit });
        }
        if (this.state.loadingSave !== this.props.loadingSave) {
            this.setState({ loadingSave: this.props.loadingSave });
        }
        if (this.state.idSeg !== this.props.idSeg) {
            this.setState({ idSeg: this.props.idSeg });
        }
        if (this.state.signo !== this.props.signo) {
            this.setState({ signo: this.props.signo }, () => {
                if (this.state.signo) {
                    this.formRef.current.setFieldsValue({
                        key: {
                            key: this.state.signo.key,
                            value: this.state.signo.key,
                            label: this.state.signo.key
                        }
                        ,
                        value: this.state.signo.value,
                        unidad: this.state.signo.unidad,
                        descrip: this.state.signo.descrip,
                    })
                }
                else {
                    this.formRef.current.setFieldsValue({
                        key: {
                            key: null,
                            value: null,
                            label: null
                        }
                        ,
                        value: null,
                        unidad: null,
                        descrip: null,
                    })
                }
            });
        }
    }

    onNameChange = event => {
        this.setState({
            name: event.target.value,
        });
    };

    addItem = () => {
        const { items, name } = this.state;
        this.setState({
            items: [...items, name || `Nuevo Signo Vital ${index++}`],
            name: '',
        });
    };

    saveSigno(e) {
        e.preventDefault();
        this.formRef.current.validateFields().then(values => {
            this.setState({
                signoSave: {
                    key: values.key.value,
                    value: values.value,
                    unidad: values.unidad,
                    descrip: values.descrip,
                    seguimiento: this.state.idSeg,
                }
            }, () => {
                if (this.state.edit) {

                    this.props.editSignoVital({ ...this.state.signoSave, id_info_medica: this.state.signo.id_info_medica });
                } else {
                    this.props.saveSignoVital(this.state.signoSave);
                }
            });
        }).catch(err => {
            console.log(err);
        });

    }

    render() {
        return (
            <div>
                <Modal title={"Signo Vital"}
                    visible={this.state.visible}
                    onCancel={(e) => { this.props.close() }}
                    footer={[
                        <Button key="back" onClick={(e) => { this.props.close() }}>
                            Cancelar
                        </Button>,
                        <Button htmlType="submit" loading={this.state.loadingSave} type="primary" onClick={(e) => { this.saveSigno(e) }}>
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
                                name="key"
                                label="Seleccione o ingrese un Signo Vital"
                                rules={[
                                    {
                                        required: true,
                                        message: "*Debe Seleccionar o ingresar un Signo Vital"
                                    },
                                ]}
                            >
                                <Select
                                    labelInValue
                                    showSearch
                                    filterOption={false}
                                    placeholder={"Signos Vitales"}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <Divider style={{ margin: '4px 0' }} />
                                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                                <Input style={{ flex: 'auto' }} value={this.state.name} onChange={this.onNameChange} />
                                                <Button
                                                    type="primary"
                                                    onClick={this.addItem}
                                                >
                                                    <PlusOutlined /> Add item
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                >
                                    {this.state.items.map(signo => (<Select.Option key={signo} value={signo}>{signo}</Select.Option>))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="value"
                                label="Ingrese el valor del Signo Vital"
                                rules={[
                                    {
                                        required: true,
                                        message: "*Debe ingresar un valor valido"
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} min={1} max={400} />

                            </Form.Item>
                            <Form.Item
                                name="unidad"
                                label="Ingrese la unidad del signo vital"
                                rules={[
                                    {
                                        required: true,
                                        message: "*Debe ingresar un valor valido"
                                    },
                                ]}
                            >
                                <Input />

                            </Form.Item>
                            <Form.Item
                                name="descrip"
                                label="Descripción"

                            >
                                <TextArea showCount maxLength={400} />

                            </Form.Item>


                        </Form>
                    </div>
                </Modal>
            </div >
        );
    }
}