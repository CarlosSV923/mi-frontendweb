import React from 'react';
import { Card, Avatar, Modal, Button, Title } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default class ModalAgenda extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            visibleModal: this.props.visibleModal,
            slotInfo: this.props.slotInfo
        }
    }

    componentDidMount() {
        this.setState({ visibleModal: this.props.visibleModal, slotInfo: this.props.slotInfo }, () => { console.log(this.stage) });
    }

    componentDidUpdate(prevProps) {
        if (this.props.visibleModal !== prevProps.visibleModal) {
            this.setState({ visibleModal: this.props.visibleModal });
        }
        if (this.props.slotInfo !== prevProps.slotInfo) {
            this.setState({ slotInfo: this.props.slotInfo });
        }
    }

    render() {
        return (
            <Modal title="Agendar Nueva Cita"
                visible={this.state.visibleModal}
                onOk={this.props.agendarCita}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button key="back" onClick={this.props.handleCancel}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.props.agendarCita}>
                        Agendar
                    </Button>]}
            >
                <div style={{ textAlign: "center" }}>
                    {/* <Title level={4}>{""}</Title> */}

                </div>
            </Modal>
        );
    }


}