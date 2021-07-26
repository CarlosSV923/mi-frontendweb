import React from 'react';
import { Layout } from 'antd';
import HeaderComp from '../Components/Header';
import FooterComp from '../Components/Footer';
import SiderMedicoComp from '../Components/SiderMedico';
const { Content } = Layout;

const MedicoLayout = ({children}) =>(
    <Layout style={{ minHeight: '100vh' }}>
        <SiderMedicoComp/>
        <Layout className="site-layout">
            <HeaderComp/>
            <Content style={{ margin: '16px' }}>
                {children}
            </Content>
            <FooterComp/>
        </Layout>
    </Layout>
)

export default MedicoLayout;