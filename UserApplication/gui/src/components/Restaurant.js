import React from "react";
import { List, Card } from 'antd';

import { StarOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Restaurant = (props) => {
    return(
        <div>
            <div className='category'>
               
            </div>

            <div>
            <List
                itemLayout="vertical"
                size="small"

                dataSource={props.data}

                renderItem={item => (
                
                
                <div class='item'>
                <a href = {`/restaurants/${item.id}`}>
                <List.Item style={{ alignItems: "center"}}>
                <Card
                    style={{ width: '53rem'}}
                    cover={
                      <img
                        alt="example"
                        height = '200'
                        src={`http://localhost:8000${item.image}`}
                      />
                    }
                    >
                    <Meta

                      title= {item.name}
                      description={item.city}
                    />
                    <p className='rating'> &#9733; {item.rating}</p>
                </Card>
                </List.Item>
                </a>
                </div>
                )}
            />
            </div>
          </div>
        )
}

export default Restaurant; 