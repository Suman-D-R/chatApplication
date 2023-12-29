import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { login } from '../utils/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setData({ ...data, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setData({ ...data, password: event.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await login(data);
      const {user_id,token} = response.data.data;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user_id", user_id);

      navigate('/chat')
  
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <TextField
        id="outlined-email"
        label="Email"
        variant="outlined"
        value={data.email || ''}
        onChange={handleEmailChange}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <TextField
        id="outlined-password"
        label="Password"
        type="password"
        variant="outlined"
        value={data.password || ''}
        onChange={handlePasswordChange}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
