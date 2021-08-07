import React from 'react';
import 'antd/dist/antd.css';
import {
    Steps, Button, message, Form, Input, Radio, Row, Col,
    Collapse, Badge, Alert, Divider, Card, Select, InputNumber,
    Upload, Modal, Empty, Avatar, Table, Tabs, Typography
} from 'antd'
import {
    UserOutlined, InfoCircleOutlined, HeartOutlined,
    PlusSquareOutlined, FileAddOutlined, PlusOutlined,
    PaperClipOutlined, CalendarOutlined, FileOutlined,
    LineChartOutlined, MedicineBoxFilled,
    FileImageOutlined, DatabaseOutlined,
    MinusCircleOutlined, AndroidOutlined, AppleOutlined
} from '@ant-design/icons';
const { Title, Text } = Typography;

export default class InfoMedica extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col className="text-center" span={24}>
                        <Title level={4}>Seguimiento de Paciente</Title>
                    </Col>
                </Row>
                <br/>
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
                                <Text className="mx-1 lead" >Paciente: <b>Nombre Apellido</b></Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <span className="mx-1 lead">Seguimiento <b>En Progreso</b></span>

                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24} className="text-center">
                                <span className="mx-2 lead">Iniciado en: <b>12/12/12</b></span>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={24} className="text-center">
                                <span className="mx-2 lead">Finalizado en: <b>12/12/12</b></span>
                            </Col>
                        </Row>
                    </Col>

                </Row>

            </div>
        );
    }
}