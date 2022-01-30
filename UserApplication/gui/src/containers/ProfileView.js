import React from "react";
import axios from 'axios'
import Bookings from "../components/accounts/bookings";
import '../App.css';
import AccountForm from "../components/accounts/account_form";

import { Layout, Button, Modal } from 'antd'

const { Footer } = Layout;

class ProfileView extends React.Component {
    state = {
        loading: false,
        visible: false,
        requests: []
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

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/acceptedbookings/`)
          .then(res => {
            const requests = res.data;
            this.setState({ requests });
          })
      }
    
    render(){
        const { visible } = this.state;
        return(
            <div> <div style={{ height:'500px'}}>Potwierdzone rezerwacje
            <Bookings data ={this.state.requests}/>
            </div>
            <Footer class='footer'>
            <Button 
                type="primary"
                shape="round" size='large'
                onClick={this.showModal}
                style={{ width: '60%', height: 50, background:'green', borderColor:'green'}}
                >Aktualizuj dane użytkownika
                <Modal
                visible={visible}
                onCancel={this.handleCancel}
                >
                    <AccountForm/>
                
                </Modal>
                </Button>
                </Footer>
            </div>
        )
    }
}

export default ProfileView;