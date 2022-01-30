import React, { Component } from "react";
import axios from 'axios'
import Booking_form from "../components/booking_form";
import Login from "../components/login";
import {useState} from 'react'

import { Card, Layout, Button, Tabs, Modal } from 'antd'

const { Footer } = Layout;
const { TabPane } = Tabs;




function callback(key) {
    console.log(key);
  }


class RestaurantDetail extends React.Component {
    state = {
        loading: false,
        visible: false,
        restaurant: {}
    }
    

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };

    componentDidMount(){
        const restaurantID = this.props.match.params.restaurantID;
        axios.get(`http://127.0.0.1:8000/restaurants/${restaurantID}`)
            .then(res => {
                this.setState({
                    restaurant: res.data
                });
            
            })
    }

    render(){
      
        const { visible } = this.state;
        return(
        <Layout>
            <Card title={this.state.restaurant.name} style={{ height: 'auto'}}>
            <Tabs defaultActiveKey="3"
                  onChange={callback}
                  style={{ textAlign: 'left', width:'100%'}} 
                  centered>
                <TabPane tab="Menu" key="1">
                  Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Zdjęcia" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Informacje" key="3">
                    <div className='strict_info' style={{border:'1px solid lightgrey', padding:'20px', marginBottom:'10px'}}>
                    <h1>Godziny otwarcia</h1><br/>
                    <p>Poniedziałek: 8:00 - 21:00</p>
                    <p>Wtorek: 8:00 - 21:00</p>
                    <p>Środa: 8:00 - 21:00 </p>
                    <p>Czwartek: 8:00 - 21:00</p>
                    <p>Piątek: 8:00 - 23:00</p>
                    <p>Sobota: 8:00 - 23:00</p>
                    <p>Niedziela: 8:00 - 18:00</p>
                    </div>
                    <div className='strict_info' style={{border:'1px solid lightgrey', padding:'20px'}}>
                    <h1>Informacja Prawna</h1><br/>
                    <p>{this.state.restaurant.name}</p>
                    <p>Adres: {this.state.restaurant.street} {this.state.restaurant.house_number}/{this.state.restaurant.flat_number}</p>
                    <p>Kod Pocztowy: {this.state.restaurant.zip_code}, {this.state.restaurant.city}</p>
                    <p>Telefon kontaktowy: +48 {this.state.restaurant.phone_number}</p>
                    </div>
                </TabPane>
                </Tabs>                
            </Card>
            <Footer class='footer'>
                
            
            <Button 
                type="primary"
                shape="round" size='large' 
                style={{ width: '60%', height: 50 }}
                onClick={this.showModal}
                >Rezerwacja
                </Button>
            <Modal
              visible={visible}
              onCancel={this.handleCancel}
            >
            <Booking_form/>
            </Modal>
            </Footer>
        </Layout>
       
        )
    }
}



export default RestaurantDetail;