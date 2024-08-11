import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../redux/cartSlice';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart({ id: cart[index].id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (index) => {
    dispatch(updateQuantity({ id: cart[index].id, quantity: 1, index }));
  };

  const handleDecreaseQuantity = (index) => {
    dispatch(updateQuantity({ id: cart[index].id, quantity: -1, index }));
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center uppercase">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-5 gap-4 font-semibold border-b">
              <div>Item</div>
              <div className="hidden md:block">Price</div>
              <div>Quantity</div>
              <div className="col-span-2 md:col-span-1 px-4">Subtotal</div>
              <div>Remove</div>
            </div>
            {cart.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 items-center border-b py-4">
                <div className="flex items-center space-x-4 md:col-span-1">
                  <img
                    src={item.images[0] || 'default-image-url'}
                    alt={item.title}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="hidden md:block">
                    <h2 className="text-sm font-semibold">{item.title}</h2>
                    <p className="text-gray-600">Color: {item.color || 'N/A'}</p>
                  </div>
                </div>
                <div className="hidden md:block">₹{item.price}</div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(index)}
                    className="text-black px-2 py-4 rounded-md "
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-0 sm:mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(index)}
                    className="text-black px-2 py-4 rounded-md "
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="col-span-2 md:col-span-1 px-8">₹{item.price * item.quantity}</div>
                <div>
                  <button
                    onClick={() => handleRemoveFromCart(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 mt-8">
            <Link
              to="/"
              className="bg-blue-500 text-white h-11 px-4 py-2 rounded-md hover:bg-blue-600 mb-4 md:mb-0 m-auto sm:m-0"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="bg-blue-500 text-white h-11 px-4 py-2 rounded-md hover:bg-blue-600 mb-4 md:mb-0 m-auto sm:m-0"
            >
              Buy Now 
            </Link>
            <div className="text-right bg-gray-100 p-8 rounded-sm w-full md:w-[20rem] xl:ml-[55rem]">
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Subtotal:</p>
                <p className="text-lg font-semibold">₹{calculateSubtotal()}</p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="text-lg font-semibold">Shipping Fee:</p>
                <p className="text-lg font-semibold">₹5.00</p>
              </div>
              <div className="flex justify-between mt-4">
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-lg font-semibold">₹{calculateSubtotal() + 5.00}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
