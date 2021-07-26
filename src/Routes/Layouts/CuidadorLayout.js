import React from 'react';
import { Layout } from 'antd';
import HeaderComp from '../Components/Header';
import FooterComp from '../Components/Footer';
import SiderCuidadorComp from '../Components/SiderCuidador';
const { Content } = Layout;

const CuidadorLayout = ({children}) =>(
    <Layout style={{ minHeight: '100vh' }}>
        <SiderCuidadorComp/>
        <Layout className="site-layout">
            <HeaderComp/>
            <Content style={{ margin: '16px' }}>
                {children}
            </Content>
            <FooterComp/>
        </Layout>
    </Layout>
)

export default CuidadorLayout;