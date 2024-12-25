
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'ed1681fe95msh9d2b1e3ee71a658p177e6bjsnf0f432030805';
const API_HOST = 'real-time-flipkart-api.p.rapidapi.com';

export const fetchProductById = createAsyncThunk(
  'productDetails/fetchProductById',
  async (id, { rejectWithValue }) => {
    const options = {
      method: 'GET',
      url: 'https://real-time-flipkart-api.p.rapidapi.com/product-details',
      params: { pid: id },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue('Request failed');
      }
    }
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    product: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;
