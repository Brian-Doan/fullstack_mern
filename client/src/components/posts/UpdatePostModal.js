import { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { PostContext } from '../../contexts/PostContext';

const UpdatePostModal = () => {
  // Get Context
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  // State
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => setUpdatedPost(post), [post]);

  //   const { title, description, url, status } = updatedPost;

  // Two-way binding for updatedPost form
  const onChangeUpdatedPostForm = (e) => {
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value,
    });
  };

  // Handle close dialog and reset the input
  const resetUpdatedPostData = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  // Handle submit add post form
  const onSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await updatePost(updatedPost);

    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={resetUpdatedPostData}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Title'
              name='title'
              required
              aria-describedby='title-help'
              value={updatedPost?.title}
              onChange={onChangeUpdatedPostForm}
            ></Form.Control>
            <Form.Text id='title-help' muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control
              placeholder='Description'
              as='textarea'
              name='description'
              rows={3}
              value={updatedPost?.description}
              onChange={onChangeUpdatedPostForm}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Tutorial URL'
              name='url'
              value={updatedPost?.url}
              onChange={onChangeUpdatedPostForm}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control
              as='select'
              value={updatedPost?.status}
              name='status'
              onChange={onChangeUpdatedPostForm}
            >
              <option value='To learn'>To learn</option>
              <option value='Learning'>Learning</option>
              <option value='Learned'>Learned</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={resetUpdatedPostData}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
