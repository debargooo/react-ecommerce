
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'e7926fad4cmsh5a807f85936203ap172de1jsnf7314eaa913a';
const API_HOST = 'real-time-flipkart-api.p.rapidapi.com';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId) => {
    const options = {
      method: 'GET',
      url: `https://real-time-flipkart-api.p.rapidapi.com/products-by-category`,
      params: {
        category_id: categoryId,
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

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;
