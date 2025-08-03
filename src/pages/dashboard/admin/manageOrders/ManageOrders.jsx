import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/order/orderApi'
import formatdate from '../../../../utils/formatdate';
import UpdateOrderModal from './UpdateOrderModal';


const ManageOrders = () => {
    const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
    const [selectedOrder, setSelectedOrder] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteOrder] = useDeleteOrderMutation();

    const handleEditOrder = (order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedOrder(null)
        refetch();
    }

    const handleDeleteOrder = async (orderId) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${orderId}" order?`);
        if (!confirmDelete) return;
        try {
            await deleteOrder({ id: orderId }).unwrap();
            alert('Order has been deleted!')
            await refetch()
        } catch (error) {
            console.error("Error deleting order:", error)

        }

    }
    if (isLoading) return <div>Loading....</div>
    if (error) return <div>Failed to load orders...</div>


    return (
        <div className='conatiner p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Manage Orders</h2>
            <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                <thead className='bg-gray-100 '>
                    <tr>
                        <th className='py-3 px-4 border-b'> Order Id</th>
                        <th className='py-3 px-4 border-b'> Customer</th>
                        <th className='py-3 px-4 border-b'> Status</th>
                        <th className='py-3 px-4 border-b'> Date</th>
                        <th className='py-3 px-4 border-b'> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map((order, index) => (
                            < tr key={index} >
                                <td className='py-3 px-4 border-b'>{order?.orderId}</td>
                                <td className='py-3 px-4 border-b'>{order?.email}</td>
                                <td className='py-3 px-4 border-b'>
                                    <span className={` inline-block px-3 py-1 text-xs text-white rounded-full 
                                        ${getStatusColor(order?.status)}`}>
                                        {order?.status}
                                    </span>
                                </td>
                                <td className='py-3 px-4 border-b'>{formatdate(order?.createdAt)}</td>
                                <td className='py-5 px-4 border-b flex items-center space-x-4'>
                                    <Link to={`/order/${order?._id}`} className='text-indigo-500 hover:underline'>View </Link>
                                    <button className='text-green-500 hover:underline'
                                        onClick={() => handleEditOrder(order)}>Edit</button>
                                    <button className='text-red-500 hover:underline'
                                        onClick={() => handleDeleteOrder(order?._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                selectedOrder && (
                    <UpdateOrderModal order={selectedOrder} isOpen={isModalOpen} onClose={handleCloseModal} />

                )
            }
        </div >
    )
}

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500'
        case 'processing':
            return 'bg-blue-500'
        case 'shipped':
            return 'bg-green-500'
        case 'completed':
            return 'bg-gray-500'
        default:
            return 'bg-gray-300'

    }

}

export default ManageOrders