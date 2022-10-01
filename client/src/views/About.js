import { Row, Col, Button } from 'react-bootstrap';

const About = () => {
  return (
    <Row className='mt-5'>
      <Col className='text-center'>
        <Button variant='primary' href='https://google.com' size='lg'>
          Google.com
        </Button>
      </Col>
    </Row>
  );
};

export default About;
