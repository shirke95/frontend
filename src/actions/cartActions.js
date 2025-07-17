import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  // CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

// Add item to cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  console.log(data);
  

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove item from cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Clear all items from cart
// export const clearCart = () => (dispatch) => {
//   dispatch({ type: CART_CLEAR_ITEMS });
//   localStorage.removeItem("cartItems");
// };
