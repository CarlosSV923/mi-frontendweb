import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Modal, Button, Spin, Space, Title, Select, Input, DatePicker } from 'antd';
import ExcelExportCitas from './../ExcelExportCitas';
export default class ModalDescargar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        this.setState({...this.props});
    }

    componentDidUpdate(){
        if(this.state.visible !== this.props.visible){
            this.setState({visible: this.props.visible});
        }
        if(this.state.isLoading !== this.props.isLoading){
            this.setState({isLoading: this.props.isLoading});
        }
        if(this.state.data !== this.props.data){
            this.setState({data: this.props.data});
        }
    }

    render() {
        return (
            <div>
                <Modal title="Generar reporte Excel"
                    visible={this.state.visible}
                    onCancel={this.props.onCancel}
                    cancelText={"Cerrar"}
                    onOk={this.props.onCancel}
                >
                    {this.state.isLoading && this.state.visible ? <div style={{ textAlign: "center" }}>
                    <p>{"Generando Archivo de Reporte..."}</p>
                        <Space size="middle">
                            <Spin size="large" />
                        </Space>
                    </div>: null}
                    {this.state.data && !this.state.isLoading && this.state.visible ? <div style={{ textAlign: "center" }}>
                    <p>{"Reporte Generado con exito."}</p>
                        <ExcelExportCitas data={this.state.data}/>
                    </div> : null}
                    {!this.state.data && !this.state.isLoading && this.state.visible ? <div style={{ textAlign: "center" }}>
                    <p>{"Error obteniendo datos para generar reporte"}</p>
                        
                    </div>: null}
                </Modal>
            </div>
        );
    }

}