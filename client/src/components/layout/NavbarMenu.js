import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

import { AuthContext } from '../../contexts/AuthContext';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';

const NavbarMenu = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  // Handle log out
  const handleLogout = () => logoutUser();

  return (
    <Navbar expand='lg' bg='success' variant='dark' className='shadow px-4'>
      <Navbar.Brand className='font-weight-bolder text-light'>
        <img
          src={learnItLogo}
          alt='learnIt-logo'
          width='32'
          height='32'
          className='me-2'
        />
        LearnIt
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='basic-navbar-nav' />

      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link
            className='font-weight-bolder text-white'
            to='/dashboard'
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className='font-weight-bolder text-white'
            to='/about'
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className='font-weight-bolder text-white' disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant='danger'
            className='font-weight-bolder text-white'
            onClick={handleLogout}
          >
            <img
              src={logoutIcon}
              alt='logout-icon'
              width='32'
              height='32'
              className='me-2'
            />
            Log out
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
