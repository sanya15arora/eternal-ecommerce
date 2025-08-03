import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../../redux/features/order/orderApi';

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
    const [status, setStatus] = useState(order?.status);

    const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

    const handleUpdateOrderStatus = async () => {
        try {
            await updateOrderStatus({ id: order?._id, status }).unwrap()
            alert("Order Status updated successfully!!")
            onClose()
        }
        catch (error) {
            console.error("Failed to update order status", error);
        }

    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <div className='bg-white rounded p-4 shadow-lg w-1/3'>
                <h2 className='text-xl mb-4'>Update Order Status</h2>
                <div className='mb-4 space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Status</label>
                    <select value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md 
                            py-2.5 px-5 focus:outline-none'>
                        <option value='pending'>Pending</option>
                        <option value='processing'>Processing</option>
                        <option value='shipped'>Shipped</option>
                        <option value='completed'>Completed</option>

                    </select>
                </div>
                {error && <p className='text-red-500 mb-4'> Failed to update order status.</p>}
                <div className='flex justify-end pt-5'>
                    <button className='bg-primary text-white px-4 py-2 rounded mr-2'
                        onClick={onClose}>Cancel</button>
                    <button className='bg-indigo-500 text-white px-4 py-2 rounded mr-2'
                        onClick={handleUpdateOrderStatus}>{
                            isLoading ? "Updating..." :
                                "Update"}</button>

                </div>

            </div>
        </div>
    )
}

export default UpdateOrderModal