import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import '../App.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Login from '../components/login';
import { Modal, Button } from 'antd';
import Requests from '../components/accounts/profile';

const { Header, Content } = Layout;

const CustomLayout = (props) => {

  const [token, setToken] = useState('');

  const userLogin = (tok) => {
    setToken(tok);
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return (
        <Layout>
        <Layout>
            <div className= 'header_bar'>
                &nbsp;
                  <a href = {`/profile`}> <Button type="primary" onClick={showModal} style={{background:'green', borderRadius:'50px'}}> 
                  Mój profil
                </Button></a>
                <Button type="primary" style={{background:'red', borderRadius:'50px'}}>
                  Wyloguj
                </Button>
            </div>
          <Header className="site-layout-sub-header-background" style={{ paddingTop: 10 }}>
            <p>Taseat</p>
             
            </Header>
            
          <Content style={{ marginLeft: ' 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item></Breadcrumb.Item>
                <Breadcrumb.Item><Link to='/restaurants'>Restauracje</Link></Breadcrumb.Item>
                
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 30, height:"1100px", marginRight: 20 }}>
              {props.children}
            </div>
          </Content>

        </Layout>
      </Layout>)
}




export default CustomLayout;