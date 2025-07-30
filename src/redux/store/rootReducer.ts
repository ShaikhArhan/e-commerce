import { combineReducers } from '@reduxjs/toolkit';
import productSlice from '../slice/product';
import favoriteProductSlice from '../slice/favoriteProduct';
import userSlice from '../slice/user';
import specificProduct from '../slice/specificProduct';
import cartProduct from '../slice/cart';
import orderProductSlice from '../slice/orderProduct';

const RootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [favoriteProductSlice.name]: favoriteProductSlice.reducer,
  [specificProduct.name]: specificProduct.reducer,
  [cartProduct.name]: cartProduct.reducer,
  [orderProductSlice.name]: orderProductSlice.reducer,
});

export default RootReducer;
