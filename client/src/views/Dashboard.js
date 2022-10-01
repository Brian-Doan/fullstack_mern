import { useContext, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Spinner,
  OverlayTrigger,
  Tooltip,
  Toast,
} from 'react-bootstrap';

import { AuthContext } from '../contexts/AuthContext';
import { PostContext } from '../contexts/PostContext';
import { SinglePost, AddPostModal, UpdatePostModal } from '../components';
import addIcon from '../assets/plus-circle-fill.svg';

const Dashboard = () => {
  // Get context from Auth and Post
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    post,
    postState: { posts, postLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Get all posts
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  let body = null;

  if (postLoading) {
    body = (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant='primary' onClick={() => setShowAddPostModal(true)}>
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map((post) => (
            <Col key={post._id} className='my-2'>
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* Open Add post modal */}
        <OverlayTrigger placement='top' overlay={<Tooltip>Add post</Tooltip>}>
          <Button
            className='btn-floating'
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt='add post' width='60' height='60' />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}

      {/* Show toast message after post has been added */}
      <Toast
        show={show}
        style={{ position: 'fixed', top: '15%', right: '10px' }}
        className={`bg-${type} text-white`}
        onClose={() => setShowToast({ show: false, message: '', type: null })}
        delay={3000}
        autohide={true}
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
