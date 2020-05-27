import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { Typography } from 'antd';
import { Avatar } from 'antd';
import { MailOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <div className="App">
      <Layout>
      <Header style={{padding:10}}>
        <Avatar style={{float:'right'}} size="small" src= "images.jpg" />
        <Title style={{color:'white'}} level={3}>Silas Kwabla Gah</Title></Header>
      <Layout>
      <Sider>
        <Menu>
          <Menu.Item>
            Contacts
          </Menu.Item>
          <SubMenu
          key="sub1"
          title={
            <span>
              <MailOutlined />
              <span>Navigation One</span>
            </span>
          }
        ></SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 480,
          }}
        >
          <div style={{background:'#fff', padding: 24, minHeigh:480}}>
             Content
             Content
             Content
             
          </div>
         
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
