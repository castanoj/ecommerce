import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const purchaseSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPruchase: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPruchase } = purchaseSlice.actions;

export const getPurchase = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      getConfig()
    )
    .then((res) => dispatch(setPruchase(res.data.data.purchases)))
    .finally(() => dispatch(setIsLoading(false)));
};

export default purchaseSlice.reducer;
