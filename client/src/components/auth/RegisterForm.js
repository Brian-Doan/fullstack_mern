import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  // Local states
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  // Two-way binding for inputs
  const onChangeLoginForm = (e) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  // Handle submit login form
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not matched' });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);

      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message });
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
      <Form className='my-4' onSubmit={handleRegister}>
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
        <Form.Group className='my-4'>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Button variant='success' type='submit' className='mb-2'>
          Login
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to='/login'>
          <Button variant='info' size='sm' style={{ marginLeft: '0.5rem' }}>
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
