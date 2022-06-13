import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const ProductsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProducts } = ProductsSlice.actions;

export const getProducts = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const fiterProductId = (query) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${query}`
    )
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterCategory = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`
    )
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export default ProductsSlice.reducer;
