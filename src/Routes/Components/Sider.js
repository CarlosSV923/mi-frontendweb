import React from 'react';
import { Menu, Layout  } from 'antd';
import { Link } from 'react-router-dom';
import { FormOutlined, HeartOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import shortid from 'shortid';
//import '../../custom-antd.css';

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
              icon={<FormOutlined />}
              key="12">
                <span>
                <span>Citas
                </span>
                </span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item
              icon={<HeartOutlined />}
              key="111">
                <span>
                
                <span>Seguimientos
                </span>
                </span>
                <Link to="/" />
              </Menu.Item>

              <SubMenu key="admin" icon={<FontAwesomeIcon icon={faUserCog}/>} title="Administrador">
                <Menu.Item key={shortid.generate()}>Discapacidades<Link to="/formulariodiscapacidades"></Link></Menu.Item>
                <Menu.Item key={shortid.generate()}>Usuarios<Link to="/formulariousuarios"></Link></Menu.Item>
                <Menu.Item key={shortid.generate()}>Roles<Link to="/formularioroles"></Link></Menu.Item>
                <Menu.Item key={shortid.generate()}>Medicamentos<Link to="/formulariomedicamentos" /></Menu.Item>
                <Menu.Item key={shortid.generate()}>Enfermedades<Link to="/formularioenfermedades" /></Menu.Item>
              </SubMenu>

            </Menu>
          </Sider>
          );
      }
}