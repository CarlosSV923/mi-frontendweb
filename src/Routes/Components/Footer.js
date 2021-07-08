import React from 'react';
import { Layout } from 'antd';
import '../../custom-antd.css'; 
const { Footer } = Layout;

export default class FooterComp extends React.Component{
    render(){
        return (<Footer className="style-footer"> Sistema de Seguimiento de Pacientes ©2021 [ESPOL]</Footer>);
    }
}