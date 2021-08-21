import React from 'react'
import 'antd/dist/antd.css';
import {Row, Col, Button, Card, Tooltip } from 'antd';import moment from 'moment';
import 'moment/locale/es';
import Modal from 'antd/lib/modal/Modal';
import Auth from '../../Login/Auth';

const NotificacionesPaciente = (props) => {
    
    const [detalleVentana, setDetalleVentana] = React.useState(false);    

    return (
        <div>
            <Tooltip title="Notificación">
                    <Card className = "mt-2">
                        <Row>
                            <Col span={24}>
                                <p className="">Médico: {props.nombre} {props.apellido} - {props.cedula}</p>
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
                <p><b>Nombre: </b>{props.nombre}</p>
                <p><b>Apellido: </b>{props.apellido}</p>
                <p><b>Especialidad: </b>{props.especialidad}</p>
                <p><b>Cédula: </b>{props.cedula}</p>
                <p><b>Hora de inicio: </b> {moment(props.start).format('LT')}</p>
                <p><b>Hora de fin: </b>{moment(props.end).format('LT')}</p>
            </Modal>
        </div>
    )
}

export default NotificacionesPaciente
