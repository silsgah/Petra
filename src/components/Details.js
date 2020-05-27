import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Form, Input, Button } from 'antd';

const Detail = gql`
query Contact($id: Int!) {
    contact_by_pk(id: $id) {
      email
      fname
      id
      lname
      twitter
    }
  }
`;
const UPDATE_CONTACT = gql`
mutation update_contact_by_pk($id: Int!, $fname: String!, $lname: String!, $email: String!, $twitter: String) {
  update_contact(_set: {email: $email, fname: $fname, lname: $lname, twitter: $twitter}, where: {id: {_eq: $id}}) {
    returning {
      email
      fname
      lname
      twitter
      id
    }
    affected_rows
  }
}
`;
const Details = ({
    match:{
        params: { id },
    },
}) => {
    const [setInputVal] = useState({selectedI:""});
    const [addContact] = useMutation(UPDATE_CONTACT);
    const [form] = Form.useForm();
    const { loading, error, data } = useQuery(Detail, { variables: {id} });
    if(loading) return <p>fetching data...</p>
    if(error) return console.error();
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
        addContact({ variables: {id:id,fname: values.user.fname, lname: values.user.lname, email: values.user.email }})
        .then(() => setInputVal(""))
            .catch((e) => {
               onReset();
            });
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const { email, fname, lname, twitter } = data.contact_by_pk;
    return (
        <Form
        {...layout}
        name="basic"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true}}
      >
        <Form.Item
          label="First Name"
          name={['user', 'fname']} 
          initialValue={fname}
          rules={[{ required: true, message: 'Please input your first name!' }]}
        ><Input placeholder="Contact First Name" />
         </Form.Item>
        <Form.Item 
        label="Last Name"
        name={['user', 'lname']}
        initialValue={lname}
        rules={[{ required: true, message: 'Please input your last name!' }]}>
         <Input placeholder="Contact Last Name"/>
        </Form.Item>
        <Form.Item 
        name={['user', 'email']} 
        label="Email" 
        initialValue={email}
        rules={[{ type: 'email',required: true, message: 'Please input your last email!' }]}>
         <Input  placeholder="Contact Email"/>
        </Form.Item>
         <Form.Item
          label="Twitter"
          name={['user', 'twitter']} 
          initialValue={twitter}
        ><Input placeholder="Twitter"/>
         </Form.Item>
         <Form.Item {...tailLayout}>
         <Button type="primary" htmlType="submit">
           Submit
         </Button>
       </Form.Item>
      </Form>
    )
};

export default Details;