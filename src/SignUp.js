import React, { useState } from 'react';

import useStyles from './Styles';
import img1 from './authbg.png';
import { Box } from '@material-ui/core';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { API_BASE_URL } from './constants';
import { toast } from 'react-toastify';

const SignUp = () => {
  const classes = useStyles();

  const initialState = {
    name: '',
    firstName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [state, setState] = useState(initialState);

  const handleTextChange = (e) => {
    setState((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
        ...state,
        role: 'visitor',
      });
      console.log(`res`, res);
      toast.success('SignUp Success');
      toast.success(`Activation Send to your email ${state.email}`);
      // setState(initialState)
    } catch (err) {
      console.log(
        `err.response.data.message`,
        err.response.data.message
      );
      let errMsg = 'Something Went Wrong';
      if (err.response?.data?.message)
        errMsg = err.response.data.message;
      else if (err.message) errMsg = err.message;
      toast.error(errMsg);
    }
  };

  return (
    <div className={classes.Wrapper}>
      <img
        src={img1}
        alt='plane img'
        className={classes.backgroundImg}
      />

      <Box className={classes.Main}>
        <Box className={classes.Header}>
          <Typography variant='h4' color='primary' align='center'>
            GOODFLY
          </Typography>
        </Box>
        <form className={classes.Form} onSubmit={handleSubmit}>
          <Typography variant='h5' color='textSecondary' gutterBottom>
            SignUp
          </Typography>

          <input
            className={classes.textInput}
            type='text'
            placeholder='Name'
            value={state.name}
            onChange={handleTextChange}
            name='name'
            id='name'
          />
          <input
            className={classes.textInput}
            type='text'
            placeholder='First Name'
            value={state.firstName}
            onChange={handleTextChange}
            name='firstName'
            id='firstName'
          />
          <input
            className={classes.textInput}
            type='email'
            placeholder='Email'
            value={state.email}
            onChange={handleTextChange}
            name='email'
            id='email'
          />

          <input
            className={classes.textInput}
            type='password'
            placeholder='Password'
            value={state.password}
            name='password'
            id='password'
            onChange={handleTextChange}
          />

          <input
            className={classes.textInput}
            type='password'
            placeholder='Password Confirm'
            value={state.passwordConfirm}
            name='passwordConfirm'
            id='passwordConfirm'
            onChange={handleTextChange}
          />

          <Button
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
            style={{ marginTop: 20, marginBottom: '1rem' }}
          >
            Sign Up
          </Button>

          <Box sx={{ my: 2 }}></Box>
          <Link to='/auth/login'>
            <Typography variant='p' color='textSecondary'>
              Already Have an Account ? Login
            </Typography>
          </Link>
        </form>
      </Box>
    </div>
  );
};

export default SignUp;
