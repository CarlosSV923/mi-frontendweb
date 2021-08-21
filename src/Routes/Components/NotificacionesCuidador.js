import React from 'react'
import 'antd/dist/antd.css';
import {Row, Col, Button, Card, Tooltip } from 'antd';
import moment from 'moment';
import 'moment/locale/es';
import Modal from 'antd/lib/modal/Modal';

const NotificacionesCuidador = (props) => {
    
    const [detalleVentana, setDetalleVentana] = React.useState(false);    

    return (
        <div>
            <Tooltip title="Notificación">
                    <Card className = "mt-2">
                        <Row>
                            <Col span={24}>
                                <p className="">Paciente: {props.nombre_paciente} {props.apellido_paciente} - {props.cedula_paciente}</p>
                            </Col>
                        </Row>
                        <Row>
                            {/* onClick = {this.setState({isModalVisible:true})}  */}
                            <Col span={24}>
                                <p className="">Médico: {props.nombre_medico} {props.apellido_medico} - {props.cedula_medico}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <p className="">Hora atención: {moment(props.start).format('LT')}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Button onClick={() => setDetalleVentana(true)}>Ver detalle</Button>
                        </Row>              
                    </Card>
            </Tooltip>
            <Modal
                title="Detalle notificación"
                visible={detalleVentana}
                onOk={() => setDetalleVentana(false)}
                onCancel={() => setDetalleVentana(false)}
                width={300}
            >
                <p><b>Paciente: </b>{props.nombre_paciente} {props.apellido_paciente}</p>
                <p><b>Médico: </b>{props.nombre_medico} {props.apellido_medico}</p>
                <p><b>Especialidad: </b>{props.especialidad}</p>
                <p><b>Hora de inicio: </b> {moment(props.start).format('LT')}</p>
                <p><b>Hora de fin: </b>{moment(props.end).format('LT')}</p>
            </Modal>
        </div>
    )
}

export default NotificacionesCuidador
