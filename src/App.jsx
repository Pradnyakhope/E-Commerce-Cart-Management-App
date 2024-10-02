/* eslint-disable no-unused-vars */
import React, { useReducer } from 'react';
import './App.css';

// Define initial state
const initialState = [
  { id: 1, name: "Samsung Galaxy S8", price: 399.99, quantity: 2 },
  { id: 2, name: "Google Pixel", price: 499.99, quantity: 1 },
  { id: 3, name: "Xiaomi Redmi Note 2", price: 699.99, quantity: 1 },
  { id: 4, name: "Samsung Galaxy S7", price: 599.99, quantity: 1 },
];

// Reducer function to manage cart state
function cartReducer(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case 'DECREASE':
      return state.map(item =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    case 'REMOVE':
      return state.filter(item => item.id !== action.payload.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

const App = () => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Calculate total price
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="App">
      <h1>Your Bag</h1>
      
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={`https://img.freepik.com/free-photo/modern-smartphone-with-live-abstract-wallpaper-coming-out-screen_23-2151033608.jpg?ga=GA1.1.1180801401.1705684181&semt=ais_hybrid/100x100?text=${item.name}`} alt={item.name} />
              <div>
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
                <button onClick={() => dispatch({ type: 'REMOVE', payload: { id: item.id } })}>Remove</button>
              </div>
              <div className="quantity-controls">
                <button onClick={() => dispatch({ type: 'INCREASE', payload: { id: item.id } })}>▲</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch({ type: 'DECREASE', payload: { id: item.id } })}>▼</button>
              </div>
            </div>
          ))}
          <div className="total">
            <h2>Total: ${getTotal()}</h2>
          </div>
          <button className="clear-cart" onClick={() => dispatch({ type: 'CLEAR' })}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default App;