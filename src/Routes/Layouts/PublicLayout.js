import React from 'react';
import { Layout } from 'antd';
import PublicHeader from '../Components/PublicHeader';
import FooterComp from '../Components/Footer';
const { Content } = Layout;

const PublicLayout = ({children}) =>(
    <Layout style={{ minHeight: '100vh' }}>
            <PublicHeader/>
                <Content style={{ margin: '16px' }}>
                    {children}
                </Content>
            <FooterComp/>
    </Layout>
)

export default PublicLayout;