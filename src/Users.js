import {
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { makeReq, handleCatch } from './makeReq';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      //  * Fetch Users
      const resData = await makeReq('/users');
      setUsers(resData.users);
    })();
  }, [users]);

  return (
    <Container>
      <List>
        {users?.map((user) => (
          <ListItem>
            <ListItemText>{user.name}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Button
        component={Link}
        to='/logout'
        variant='contained'
        color='primary'
      >
        Logout
      </Button>
    </Container>
  );
};

export default Users;
