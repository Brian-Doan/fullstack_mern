import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);

  // Route
  const navigate = useNavigate();

  // Local states
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  // Two-way binding for inputs
  const onChangeLoginForm = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  // Handle submit login form
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = await loginUser(loginForm);

      if (loginData.success) {
        navigate('/dashboard');
      } else {
        setAlert({ type: 'danger', message: loginData.message });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Form className='my-4' onSubmit={handleLogin}>
        <AlertMessage info={alert} />
        
        <Form.Group className='my-4'>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Form.Group className='my-4'>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Button variant='success' type='submit' className='mb-2'>
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to='/register'>
          <Button variant='info' size='sm' style={{ marginLeft: '0.5rem' }}>
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
