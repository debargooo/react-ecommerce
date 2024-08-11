import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "bc6a557ff7msh5b0a681171efefep1e79f4jsn394a48e57e5a";
const API_HOST = "real-time-amazon-data.p.rapidapi.com";

export const fetchBestSellers = createAsyncThunk(
    'best_sellers/fetchBestSellers',
    async () => {
      const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/best-sellers', 
        params: {
          category: 'electronics',
          type: 'BEST_SELLERS',
          page: '1',
          country: 'IN',
        },
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      };
  
      try {
        const response = await axios.request(options);
        return response.data.data.best_sellers;
      } catch (error) {
        throw Error(error);
      }
    }
  );
  

const bestSellerSlice = createSlice({
  name: "best_sellers",
  initialState: {
    bestSellers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestSellers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bestSellers = action.payload;
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bestSellerSlice.reducer;
