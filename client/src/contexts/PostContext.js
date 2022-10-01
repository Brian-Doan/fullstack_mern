import { createContext, useReducer, useState } from 'react';
import axios from 'axios';

import { postReducer } from '../reducers/postReducer';

import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from '../contexts/constants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // Reducer
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });

  // State
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);

      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
      }
    } catch (err) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // Add new post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);

      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : { success: false, message: 'Server error' };
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);

      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (err) {
      console.error('');
    }
  };

  // Find exact post when user click on update button
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);

    dispatch({ type: FIND_POST, payload: post });
  };

  // Update post
  const updatePost = async (updatePost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatePost._id}`,
        updatePost
      );

      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
        return response.data;
      }
    } catch (err) {
      return err.response.data
        ? err.response.data
        : { success: false, message: 'Server error' };
    }
  };

  // Post context data
  const postContextData = {
    postState,
    getPosts,
    addPost,
    deletePost,
    updatePost,
    findPost,
    showAddPostModal,
    setShowAddPostModal,
    showToast,
    setShowToast,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
