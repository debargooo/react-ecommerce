import { createSlice } from '@reduxjs/toolkit';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};


const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
   
  }
};

const initialState = loadState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.push({ ...item, quantity: 1 });
      saveState(state);
    },
    removeFromCart: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload.id);
      saveState(newState); 
      return newState;
    },
    clearCart: (state) => {
      const newState = [];
      saveState(newState); 
      return newState;
    },
    updateQuantity: (state, action) => {
      const { id, quantity, index } = action.payload;
      if (state[index]) {
        state[index].quantity += quantity;
        if (state[index].quantity <= 0) {
          state.splice(index, 1);
        }
      }
      saveState(state); 
    },
    resetCart: (state) => {
      const newState = [];
      saveState(newState); 
      return newState;
    }
  }
});

export const { addToCart, removeFromCart, clearCart, updateQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
