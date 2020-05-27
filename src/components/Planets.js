import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { List, Avatar, Skeleton } from 'antd';

const CONTACTS = gql`
{
  contact {
    email
    fname
    lname
    id
    twitter
  }
}
`;
const DELETCONTACT = gql`
mutation deleteContact($id: Int!) {
  delete_contacts_by_pk(id: $id) {
    id
  }
}
`;
export default function Planets(){
    const {loading, error, data } = useQuery(CONTACTS);
    const [deleteContact] = useMutation(DELETCONTACT);
    if(loading) return <p>fetching data...</p>
    if(error) return console.error();
    // const onFinish = values => {
    //   deleteContact({ variables: {id: values.user.fname }})
    //   .then(() =>
    //      <Redirect  to="/" />
    //   )
    //       .catch((e) => {
    //       });
    // };
    return (
    <List
    itemLayout="horizontal"
    dataSource={data.contact}
    key={data.contact.id}
    renderItem={item => (
        <List.Item
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            actions={[<a key={item.id} href={`/contact/${item.id}`}>details</a>,<a key={item.id} onClick={() => {}} >delete</a>]}
          >
            <Skeleton avatar title={true} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href={item.twitter}>{item.email}</a>}
                description={item.fname + " " + item.lname} 
              />
            </Skeleton>
          </List.Item>
    )}
   />
    );
}