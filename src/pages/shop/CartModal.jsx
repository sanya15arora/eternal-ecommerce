import React from 'react'
import OrderSummary from './OrderSummary'
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';

const CartModal = ({ products, isOpen, onClose }) => {
    const dispatch = useDispatch();

    const handleQuantity = (type, _id) => {
        const payload = { type, _id };
        dispatch(updateQuantity(payload));
    };

    const handleRemoveFromCart = (e, _id) => {
        e.preventDefault();
        dispatch(removeFromCart({ _id }));
    }

    return (
        <div
            className={`fixed z-[1000] inset-0 bg-black bg-opacity-80 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            style={{ transition: 'opacity 300ms' }}
        >
            <div
                className={`fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-1/3 bg-white overflow-y-auto transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{ transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
                <div className='p-4 mt-4'>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className='text-xl font-semibold'>Your Cart</h4>
                        <button onClick={onClose} className='text-gray-600 hover:text-gray-900'>
                            <i className="ri-close-line bg-black p-1 text-white rounded-full text-lg"></i>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className='space-y-4'>
                        {products.length === 0 ? (
                            <div className="text-center text-gray-600">Your cart is empty</div>
                        ) : (
                            products.map((product, index) => (
                                <div
                                    key={index}
                                    className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md p-4 rounded-md'
                                >
                                    {/* Product Info */}
                                    <div className='flex items-center gap-4 flex-1 min-w-0'>
                                        <span className='px-2 py-1 bg-primary text-white rounded-full text-sm'>
                                            0{index + 1}
                                        </span>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='w-16 h-16 object-cover rounded-md flex-shrink-0'
                                        />
                                        <div className='truncate'>
                                            <h5 className='text-base md:text-lg font-medium truncate'>
                                                {product.name}
                                            </h5>
                                            <p className='text-gray-600 text-sm'>
                                                ${Number(product.price).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2 justify-between sm:justify-start'>
                                        <button className='w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'
                                            onClick={() => handleQuantity('decrement', product._id)}>
                                            -
                                        </button>
                                        <span className='w-6 text-center'>{product.quantity}</span>
                                        <button className='w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'
                                            onClick={() => handleQuantity('increment', product._id)}>
                                            +
                                        </button>
                                    </div>

                                    <div className='text-right sm:text-left'>
                                        <button className='text-red-500 hover:text-red-800'
                                            onClick={(e) => handleRemoveFromCart(e, product._id)}>
                                            <i className="ri-delete-bin-5-line text-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Order Summary */}
                    {products.length > 0 && (
                        <OrderSummary />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartModal
