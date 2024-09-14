// src/features/posts/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  posts: [],
  comment: [], // Ensure this is defined
  subcomment: {}, // Ensure this is defined as an object to store nested comments by parent ID
  status: 'idle',
  error: null,
};

const baseUrl = process.env.REACT_APP_API_URL

// Define the async thunk for creating a post
export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await axios.post(`${baseUrl}/post/create`, postData, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

// Define the async thunk for fetching posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (userId) => {
  const user_id = userId;
  const pageNo = 1;
  const pageSize = 15;
  const response = await axios.get(`${baseUrl}/post/get/${user_id}/${pageNo}/${pageSize}`, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

export const fetchUserPosts = createAsyncThunk('posts/fetchPosts', async (userId) => {
  const user_id = userId;
  const pageNo = 1;
  const pageSize = 15;
  const response = await axios.get(`${baseUrl}/post/get/user/${user_id}/${pageNo}/${pageSize}`, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

// Define the async thunk for liking a post
export const likePost = createAsyncThunk('posts/likePost', async (data) => {
  const response = await axios.post(`${baseUrl}/like/create`, data, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

export const unLikePost = createAsyncThunk('posts/unLikePost', async (data) => {
  const response = await axios.delete(`${baseUrl}/like/delete/${data.userId}?commentId&postId=${data.postId}`, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

// Define the async thunk for fetching comments
export const fetchComment = createAsyncThunk('posts/fetchComment', async (postId) => {
  const pageNo = 1;
  const pageSize = 10;
  const response = await axios.get(`${baseUrl}/comment/get${pageNo}/${pageSize}?parentCommentId&postId=${postId}`, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  });
  return response.data.body; // Ensure this returns the correct data format
});


// Define the async thunk for creating a comment
export const createComment = createAsyncThunk('posts/createComment', async (commentData) => {
  const response = await axios.post(`${baseUrl}/comment/crete`, commentData, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  });

  return response.data;
});

// Define the async thunk for fetching subcomments (replies)
export const fetchSubComment = createAsyncThunk('posts/fetchSubComment', async ({ parentCommentId, postId }) => {
  const pageNo = 1;
  const pageSize = 10;
  const response = await axios.get(`${baseUrl}/comment/get${pageNo}/${pageSize}?parentCommentId=${parentCommentId}&postId=`, {
    headers: {
      'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
      'Content-Type': 'application/json'
    }
  });
  return { parentCommentId, comments: response.data.body }; // Return parentCommentId and comments
});


// Create the slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create post cases
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch posts cases
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.body;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch comments cases
      .addCase(fetchComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comment = action.payload.body;
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create comment cases
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming the API returns the full updated comment tree, including the new comment
        state.comment.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Fetch subcomments (replies) cases
      .addCase(fetchSubComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { parentCommentId, comments } = action.payload;
        state.subcomment[parentCommentId] = comments; // Store sub-comments by parent ID
      })
      .addCase(fetchSubComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Like post cases
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const existingPost = state.posts.find(post => post.id === updatedPost.id);
        if (existingPost) {
          existingPost.likes = updatedPost.likes;
        }
      });
  }
});

export default postsSlice.reducer;
