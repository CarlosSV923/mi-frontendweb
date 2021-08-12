import React from 'react';
import 'antd/dist/antd.css';
import {
    message, Tabs
} from 'antd'
import {
    HeartOutlined,
    PlusSquareOutlined, FileAddOutlined, 
} from '@ant-design/icons';
import InfoMedica from './infoMedica';
import CitasAsociadas from './citasAsociadas';
import ExamenesAsociados from './examenesAsociados';
import AxiosSeguimientos from './../Services/AxiosSeguimientos';


const { TabPane } = Tabs;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.getSeguimientoId = this.getSeguimientoId.bind(this);
        this.state = {
            isLoading: true,
            seguimientoData:{}
        }
    }

    componentDidMount(){
        this.getSeguimientoId();
    }

    getSeguimientoId() {
        console.log(this.props.match.params)
        AxiosSeguimientos.getSeguimiento(this.props.match.params.id).then(resp => {
            console.log(resp);
            this.setState({ seguimientoData: resp.data, isLoading: false });

        }).catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
            message.error("No se pudo obtener informacion del seguimiento. Intentelo mas tarde.");
        });
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
                    <InfoMedica 
                        seguimientoData={this.state.seguimientoData} 
                        isLoadingSeg={this.state.isLoading} 
                        getSeguimientoId={this.getSeguimientoId}
                        idSeg={this.props.match.params.id}
                    />
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
                    <CitasAsociadas 
                        seguimientoData={this.state.seguimientoData} 
                        isLoadingSeg={this.state.isLoading} 
                        getSeguimientoId={this.getSeguimientoId}
                        idSeg={this.props.match.params.id}
                    />
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
                   <ExamenesAsociados 
                        seguimientoData={this.state.seguimientoData} 
                        isLoadingSeg={this.state.isLoading} 
                        getSeguimientoId={this.getSeguimientoId}
                        idSeg={this.props.match.params.id}
                    />
                </TabPane>
            </Tabs>
        );
    }
}