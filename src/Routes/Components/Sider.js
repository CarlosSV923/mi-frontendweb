import React from 'react';
import { Menu, Layout  } from 'antd';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import '../../custom-antd.css';

//import { RiRouterLine, RiTerminalWindowLine } from "react-icons/ri";
const { SubMenu } = Menu;
const { Sider } = Layout; 


export default class SiderComp extends React.Component{
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        this.setState({ collapsed });
      };

      render(){
          return(
            <Sider
            breakpoint="lg"
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            {this.state.collapsed ? <img className="App-logo" src={"espol2.png"} alt="icon" /> : <img className="App-logo" src={"./espol2.png"} alt="logo" />}
            <br/>
            <br/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item 
              icon={<AppstoreOutlined />}
              key="12">
                <span>
                <span>Citas
                </span>
                </span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item
              icon={<AppstoreOutlined />}
              key="111">
                <span>
                
                <span>Seguimientos
                </span>
                </span>
                <Link to="/" />
              </Menu.Item>
              
            </Menu>
          </Sider>
          );
      }
}