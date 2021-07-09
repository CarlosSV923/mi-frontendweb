import React from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default class ItemAgenda extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {

        }

    }

    render() {
        return (
            <Card
                style={{ width: "auto", display: 'block', position: 'absolute' }}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    description="This is the description"
                />
            </Card>
        );
    }


}