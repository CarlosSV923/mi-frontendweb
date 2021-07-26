import React from 'react';
import { Layout } from 'antd';
import HeaderComp from '../Components/Header';
import FooterComp from '../Components/Footer';
import SiderAdminComp from '../Components/SiderAdmin';
const { Content } = Layout;

const AdminLayout = ({children}) =>(
    <Layout style={{ minHeight: '100vh' }}>
        <SiderAdminComp/>
        <Layout className="site-layout">
            <HeaderComp/>
            <Content style={{ margin: '16px' }}>
                {children}
            </Content>
            <FooterComp/>
        </Layout>
    </Layout>
)

export default AdminLayout;