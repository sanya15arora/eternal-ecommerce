import React from 'react'

const AdminStats = ({ stats }) => {
    return (
        <div className='my-5 space-y-4'>
            <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4'>
                <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:border-primary cursor-pointer scale-105 
                transition-all duration-200 '>
                    <h2 className='text-xl font-semibold mb-2'>Total Earnings</h2>
                    <p className='text-2xl font-bold'>${stats?.totalEarnings}</p>
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-primary cursor-pointer scale-105 
                transition-all duration-200 '>
                    <h2 className='text-xl font-semibold mb-2'>All Orders</h2>
                    <p className='text-2xl font-bold'>{stats?.totalOrders}</p>
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-primary cursor-pointer scale-105 
                transition-all duration-200 '>
                    <h2 className='text-xl font-semibold mb-2'>All Users</h2>
                    <p className='text-2xl font-bold'>{stats?.totalUsers}</p>
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-primary cursor-pointer scale-105 
                transition-all duration-200 '>
                    <h2 className='text-xl font-semibold mb-2'>Total Products</h2>
                    <p className='text-2xl font-bold'>{stats?.totalProducts}</p>
                </div>

            </div>
        </div>
    )
}

export default AdminStats