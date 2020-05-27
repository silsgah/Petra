import React from 'react';
import { render } from 'react-dom';
import Planets from "./components/Planets";
import Details from "./components/Details";
import AddContact from "./components/AddContact";
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Switch, Route  } from 'react-router-dom';
import { Layout, Menu, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';
import { Typography } from 'antd';
import { Avatar } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://petracontact-app.herokuapp.com/v1/graphql',
  })
});

const App = () => (
  <BrowserRouter>
  <ApolloProvider client={client}>
    <Layout>
      <Header style={{padding:10}}>
        <Avatar style={{float:'right'}}  src= "./images.jpg" />
        <Title style={{color:'white'}} level={3}>Silas Kwabla Gah</Title></Header>
      <Layout>
      <Sider>
        <Menu>
        <Menu.Item onClick={() => window.location.href='/'}>
            <span>
              <UserOutlined />
              <span>Contact Listing</span>
            </span>
          </Menu.Item>
          <Menu.Item onClick={() => window.location.href='/addcontact'}>
            <span>
              <MailOutlined />
              <span>Add New Contact</span>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 480,
          }}
         >
          <div style={{background:'#fff', padding: 24, minHeigh:480}}>
            <Switch>
              <Route path="/contact/:id" component={Details}/>
              <Route path="/addcontact" component={AddContact}/>
              <Route path="/" component={Planets}/>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Silas Petra Contact App Design ©2020 Petra Assignments</Footer>
      </Layout>
      </Layout>
    </Layout>
  </ApolloProvider>
  </BrowserRouter>
);
render(<App />, document.getElementById('root'));
