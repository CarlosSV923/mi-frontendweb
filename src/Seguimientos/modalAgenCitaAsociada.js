import React from 'react';
import 'antd/dist/antd.css';
import {
    Steps, Button, message, Form, Input, Popconfirm, Row, Col,
    Collapse, DatePicker, Alert, Divider, Card, Select, InputNumber,
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

export default class AgenCitaAsociada extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFormat: "DD/MM/YYYY HH:mm"
        }
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            visible: this.props.visible,
            idSeg: this.props.idSeg,
            loadingSave: this.props.loadingSave,
        })
    }

    componentDidUpdate() {
        if (this.state.visible !== this.props.visible) {
            this.setState({ visible: this.props.visible }, () => {
                if(!this.state.visible){
                    this.formRef.current.setFieldsValue({
                        start: null,
                        end: null,
                        comment: null,
                    })
                }
            });
        }
        if (this.state.loadingSave !== this.props.loadingSave) {
            this.setState({ loadingSave: this.props.loadingSave });
        }
        if (this.state.idSeg !== this.props.idSeg) {
            this.setState({ idSeg: this.props.idSeg });
        }

    }

    saveCitaAsociada() {
        this.formRef.current.validateFields().then(values => {
            this.setState({
                citaSave: {
                    start: values.start._d,
                    end: values.end._d,
                    desc: values.comment,
                    id_seguimiento: this.state.idSeg,
                }
            }, () => {
                this.props.saveCitaAsociada(this.state.citaSave);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <Modal title={"Agendar Nueva Cita"}
                    visible={this.state.visible}
                    onCancel={(e) => { this.props.close() }}
                    footer={[
                        <Button key="back" onClick={(e) => { this.props.close() }}>
                            Cancelar
                        </Button>,
                        <Button htmlType="submit" loading={this.state.loadingSave} type="primary" onClick={(e) => { this.saveCitaAsociada() }}>
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
                                name="start" 
                                label="Fecha de inicio de la Cita"
                                rules={[
                                    {
                                        required: true,
                                        message: "*Debe Seleccionar una fecha valida"
                                    },
                                ]}
                            >
                                <DatePicker style={{ width: "100%" }} showTime={{ format: 'HH:mm' }} format={this.state.dateFormat} />
                            </Form.Item>
                            <Form.Item 
                                name="end" 
                                label="Fecha de fin de la Cita"
                                rules={[
                                    {
                                        required: true,
                                        message: "*Debe Seleccionar una fecha valida"
                                    },
                                ]}
                            >
                                <DatePicker style={{ width: "100%" }} showTime={{ format: 'HH:mm' }} format={this.state.dateFormat} />
                            </Form.Item>

                            <Form.Item name="comment" label="Comentario">
                                <Input.TextArea />
                            </Form.Item>

                        </Form>

                    </div>
                </Modal>
            </div>
        );
    }


}