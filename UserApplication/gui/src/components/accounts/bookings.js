import React from "react";
import { List, Card } from 'antd';

import { StarOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Bookings = (props) => {
    return(
        <div>
            <div>
            <List
                itemLayout="vertical"
                size="small"
                dataSource={props.data}
                renderItem={item => (
                <div class='item'>
                <List.Item style={{ alignItems: "center"}}>
                <Card
                style={{ width: '53rem'}}>
                    <h1>Restauracja {item.restaurant}</h1>
                    <Meta
                      title={item.date}
                    />
                    {item.time} <br />
                    {item.additionals}
                    {item.status}
                    
                </Card>
                </List.Item>
                </div>
                )}
            />
            </div>
          </div>
        )
}

export default Bookings; 