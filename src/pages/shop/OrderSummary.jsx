import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import getBaseURL from '../../utils/baseURL';


const OrderSummary = () => {
    const products = useSelector((state) => state.cart.products)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((state) => state.cart)

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    const makePayment = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        if (!stripe) {
            console.error("Stripe not loaded");
            return;
        }
        const body = {
            products,
            userId: user?._id,
            email: user?.email,
            taxRate
        }
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const response = await fetch(`${getBaseURL()}/api/order/create-checkout-session`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            })

            const session = await response.json();
            console.log("Session from server:", session);
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error("Stripe checkout error:", result.error.message);
            } else {
                console.log("Checkout session created successfully", session);
            }
        } catch (error) {
            console.error("Error during payment process", error);
        }

    }


    return (
        <div className='bg-primary-light mt-5 rounded text-base'>
            <div className='px-6 py-4 space-y-5'>
                <h2 className='text-xl text-text-dark'>
                    Order Summary
                </h2>
                <p className='text-text-dark mt-2'> Selected Items : {selectedItems}</p>
                <p className='text-text-dark mt-2'> Total Price : ${totalPrice.toFixed(2)}</p>
                <p className='text-text-dark mt-2'> Tax ({taxRate * 100}%): ${tax.toFixed(2)}</p>
                <h3 className='font-bold'> Grand Total : ${grandTotal.toFixed(2)}</h3>
                <div className='flex justify-between items-center mb-4'>
                    <button className='bg-red-500 text-white px-3 py-1.5 mt-2 mb-4 
                    rounded-md flex justify-between items-center hover:bg-primary-dark'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClearCart();
                        }}>
                        <span className='mr-2'> Clear Cart</span>
                        <i className="ri-delete-bin-5-line"></i>
                    </button>
                    <button className='bg-green-500 text-white px-3 py-1.5 mt-2 mb-4 
                    rounded-md flex justify-between items-center hover:bg-green-700'
                        onClick={(e) => {
                            e.stopPropagation();
                            makePayment();
                        }}>
                        <span className='mr-2'>Proceed to Checkout</span>
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                </div>

            </div>
        </div >
    )
}

export default OrderSummary