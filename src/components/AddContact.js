import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {useMutation, gql } from "@apollo/client";
import { Form, Input, Button } from 'antd';

const ADD_CONTACT = gql`
mutation insert_contact($email: String!, $fname: String!, $lname: String!, $twitter: String) {
  insert_contact(objects: {email: $email, fname: $fname, lname: $lname, twitter: $twitter}) {
    affected_rows
  }
}
`;

const AddContact = () => {
    const [setInputVal] = useState(true);
    const [addContact] = useMutation(ADD_CONTACT);
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };
     const onReset = () => {
        form.resetFields();
     };
    const onFinish = values => {
        addContact({ variables: {fname: values.user.fname, lname: values.user.lname, email: values.user.email }})
        .then(() =>
           <Redirect  to="/" />
        )
            .catch((e) => {
              // setInputVal(e.message);
               onReset();
            });
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
      
    return (
    <Form
       {...layout}
       name="basic"
       form={form}
       onFinish={onFinish}
       onFinishFailed={onFinishFailed}
       initialValues={{ remember: true }}
     >
       <Form.Item
         label="First Name"
         name={['user', 'fname']} 
         key={1}
         rules={[{ required: true, message: 'Please input your first name!' }]}
       ><Input placeholder="Contact First Name"/>
        </Form.Item>
       <Form.Item 
       label="Last Name"
       name={['user', 'lname']}
       rules={[{ required: true, message: 'Please input your last name!' }]}>
        <Input placeholder="Contact Last Name"/>
       </Form.Item>
       <Form.Item 
       name={['user', 'email']} 
       label="Email" 
       rules={[{ type: 'email',required: true, message: 'Please input your last email!' }]}>
        <Input />
       </Form.Item>
        <Form.Item
         label="Twitter"
         name={['user', 'twitter']} 
         key={4}
       ><Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
     </Form>
    )
};


export default AddContact;