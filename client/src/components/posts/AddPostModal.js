import { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { PostContext } from '../../contexts/PostContext';

const AddPostModal = () => {
  // Get Context
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  // State
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'To learn',
  });

  const { title, description, url } = newPost;

  // Two-way binding for newPost form
  const onChangeNewPostForm = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  // Handle close dialog and reset the input
  const resetAddPostData = () => {
    setNewPost({ title: '', description: '', url: '', status: 'To learn' });
    setShowAddPostModal(false);
  };

  // Handle submit add post form
  const onSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await addPost(newPost);

    resetAddPostData();
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
  };

  return (
    <Modal show={showAddPostModal} onHide={resetAddPostData}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn</Modal.Title>
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
              value={title}
              onChange={onChangeNewPostForm}
            ></Form.Control>
            <Form.Text id='title-help' muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control
              as='textarea'
              placeholder='Description'
              name='description'
              rows={3}
              value={description}
              onChange={onChangeNewPostForm}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Tutorial URL'
              name='url'
              value={url}
              onChange={onChangeNewPostForm}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={resetAddPostData}>
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

export default AddPostModal;
