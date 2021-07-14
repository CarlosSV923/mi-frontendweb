import React from 'react';
import { Card, Modal, Button, Title } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default class ModalConfirmAgenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            data: this.props.data,
            title: this.props.title,
            okText: this.props.okText,
            cancelText: this.props.cancelText,
            bodyText: this.props.bodyText,
        }
    }

    componentDidMount() {
        console.log("mount confirm modal")
        this.setState({ 
            visible: this.props.visible,
            data: this.props.data,
            title: this.props.title,
            okText: this.props.okText,
            cancelText: this.props.cancelText,
            bodyText: this.props.bodyText,
        });
    }

    

    componentDidUpdate() {

        if (this.state.visible !== this.props.visible) {
            this.setState({ visible: this.props.visible });
        }
        if (this.state.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
        if (this.state.okText !== this.props.okText) {
            this.setState({ okText: this.props.okText });
        }
        if (this.state.cancelText !== this.props.cancelText) {
            this.setState({ cancelText: this.props.cancelText });
        }
        if (this.state.bodyText !== this.props.bodyText) {
            this.setState({ bodyText: this.props.bodyText });
        }
    }

    render() {
        return (
            <div>
                {this.state.data ? <Modal title={this.state.title}
                    visible={this.state.visible}
                    onOk={(e) => {this.props.confirm(); console.log("ERROR")}}
                    onCancel={this.props.cancelConfirm}
                    okText={this.state.okText}
                    cancelText={this.state.cancelText}
                >
                    <div style={{ textAlign: "center" }}>
                        {this.state.bodyText}
                    </div>
                </Modal> : null}
            </div>
        );
    }


}