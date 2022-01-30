import React from "react";
import { Modal, Button } from 'antd';
import axios from 'axios'


class Popup extends React.Component {
  state = {
    loading: false,
    visible: false,
    restaurant: {}
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

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button 
                type="primary" 
                shape="round" size='large' 
                style={{ width: '60%', height: 50 }}
                onClick={this.showModal}
                >Rezerwacja
                </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
            <Button
              key="link"
              href="https://google.com"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Search on Google
            </Button>,
          ]}
        >
          <p>{this.state.restaurant.name}</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
  }
}

export default Popup;