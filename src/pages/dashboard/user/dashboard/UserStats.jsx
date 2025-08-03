import React from 'react'

const UserStats = ({ stats }) => {
    return (
        <div className='my-5 space-y-4'>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
                <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-primary cursor-pointer scale-105 
                transition-all duration-200 '>
                    <h2 className='text-xl font-semibold mb-2'>Total Payments</h2>
                    <p className='text-2xl font-bold'>${stats?.totalPayments}</p>
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-primary cursor-pointer scale-105 
                transition-all duration-200 '>
                    <h2 className='text-xl font-semibold mb-2'>Total Reviews</h2>
                    <p className='text-2xl font-bold'>{stats?.totalReviews}</p>
                </div>
                <div className='bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-primary cursor-pointer scale-105 
                transition-all duration-200 '>
                    <h2 className='text-xl font-semibold mb-2'>Total Purchased Products</h2>
                    <p className='text-2xl font-bold'>{stats?.totalPurchasedProducts}</p>
                </div>

            </div>
        </div>
    )
}

export default UserStats