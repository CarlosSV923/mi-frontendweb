import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { FormOutlined, HeartOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import shortid from 'shortid';

const { SubMenu } = Menu;
const { Sider } = Layout;

export default class SiderAdminComp extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        {this.state.collapsed ? <img className="App-logo" src={"espol2.png"} alt="icon" /> : <img className="App-logo" src={"./espol2.png"} alt="logo" />}
        <br />
        <br />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>


          <SubMenu key="admin" icon={<FontAwesomeIcon icon={faUserCog} />} title="Administrador">
            <Menu.Item key={shortid.generate()}>Discapacidades<Link to="/admin/formulariodiscapacidades"></Link></Menu.Item>
            <Menu.Item key={shortid.generate()}>Usuarios<Link to="/admin/formulariousuarios"></Link></Menu.Item>
            <Menu.Item key={shortid.generate()}>Roles<Link to="/admin/formularioroles"></Link></Menu.Item>
            <Menu.Item key={shortid.generate()}>Medicamentos<Link to="/admin/formulariomedicamentos" /></Menu.Item>
            <Menu.Item key={shortid.generate()}>Enfermedades<Link to="/admin/formularioenfermedades" /></Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>
    );
  }
}