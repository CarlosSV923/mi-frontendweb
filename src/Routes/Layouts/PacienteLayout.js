import React from 'react';
import { Layout } from 'antd';
import HeaderComp from '../Components/Header';
import FooterComp from '../Components/Footer';
import SiderPacienteComp from '../Components/SiderPaciente';
const { Content } = Layout;

const PacienteLayout = ({children}) =>(
    <Layout style={{ minHeight: '100vh' }}>
        <SiderPacienteComp/>
        <Layout className="site-layout">
            <HeaderComp/>
            <Content style={{ margin: '16px' }}>
                {children}
            </Content>
            <FooterComp/>
        </Layout>
    </Layout>
)

export default PacienteLayout;