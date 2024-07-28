import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '14b08180b3msh47dc1a6efbb2b30p15d669jsn1b4cfe19f533';
const API_HOST = 'real-time-flipkart-api.p.rapidapi.com';

export const fetchProductsBySearch = createAsyncThunk(
  'search/fetchProductsBySearch',
  async (query) => {
    const options = {
      method: 'GET',
      url: 'https://real-time-flipkart-api.p.rapidapi.com/product-search',
      params: {
        q: query,
        page: '1',
        sort_by: 'popularity'
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    };

    try {
      const response = await axios.request(options);
      return response.data.products;
    } catch (error) {
      throw Error(error);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsBySearch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default searchSlice.reducer;
