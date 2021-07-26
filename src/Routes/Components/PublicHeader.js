import React from 'react';
import { Layout} from 'antd';
const { Header } = Layout;

export default class PublicHeader extends React.Component {

    render() {
        return (
            <Header className="site-layout-background" style={{display: 'flex', alignItems: 'center',justifyContent: 'flex-end'}}>
                <img className="App-logo" src={"./espol2.png"} alt="icon" style={{height:'55px', width:'120px', paddingBottom: "5px"}}/> 
            </Header>
        );

    }
}