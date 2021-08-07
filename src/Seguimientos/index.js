import React from 'react';
import 'antd/dist/antd.css';
import {
    Steps, Button, message, Form, Input, Radio, Row, Col,
    Collapse, Badge, Alert, Divider, Card, Select, InputNumber,
    Upload, Modal, Empty, Avatar, Table, Tabs
} from 'antd'
import {
    UserOutlined, InfoCircleOutlined, HeartOutlined,
    PlusSquareOutlined, FileAddOutlined, PlusOutlined,
    PaperClipOutlined, CalendarOutlined, FileOutlined,
    LineChartOutlined, MedicineBoxFilled,
    FileImageOutlined, DatabaseOutlined,
    MinusCircleOutlined, AndroidOutlined, AppleOutlined
} from '@ant-design/icons';
import InfoMedica from './infoMedica';

const { TabPane } = Tabs;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <HeartOutlined />
                            Información Médica
                        </span>
                    }
                    key="1"
                >
                    <InfoMedica/>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <FileAddOutlined />
                            Citas Asociadas
                        </span>
                    }
                    key="2"
                >
                    Citas
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <PlusSquareOutlined />
                            Examenes
                        </span>
                    }
                    key="3"
                >
                    Examenes
                </TabPane>
            </Tabs>
        );
    }
}