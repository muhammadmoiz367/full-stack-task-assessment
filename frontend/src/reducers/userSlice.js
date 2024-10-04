import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('/api/users');
  return response.data;
});

// Add user
export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  const response = await axios.post('/api/users', newUser);
  return response.data;
});

// Update user
export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const response = await axios.put(`/api/users/${user._id}`, user);
  return response.data;
});

// Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`/api/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState: { users: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users cases
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      // Add user cases
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload); 
      })
      // Update user cases
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        state.users[index] = action.payload;
      })
      // Delete user cases
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
