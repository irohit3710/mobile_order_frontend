import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  items: [],
  status: null,
  search:"",
};

// if(search.trim().length > 1){
//   console.log("first")
// }
// "https://eager-sable-airedale.glitch.me/products"
export const productFetching = createAsyncThunk(
  "products/productFetching",
  async () => {
    const res = await axios.get(
      // "https://tech-alpha-jj7a.onrender.com/api/products"
      "http://localhost:4000/api/products"
    );
    return res.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productFetching.pending, (state, action) => {
      state.status = "loading...";
    });

    builder.addCase(productFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
    });

    builder.addCase(productFetching.rejected, (state, action) => {
      state.status = "something went wrong!";
      state.items = action.payload; //rtk uses a packeg called "immer"
    });
  },
});
export const { updateSearch } = productsSlice.actions;
export default productsSlice.reducer;
