import React from 'react'
import { Pie, Line } from 'react-chartjs-2'
import 'chart.js/auto'

const AdminStatsChart = ({ stats }) => {
    const pieData = {
        labels: ['Total Users', 'Total Orders', 'Total Reviews', 'Total Products'],
        datasets: [{
            label: 'Admin Statistics',
            data: [stats?.totalUsers, stats?.totalOrders, stats?.totalReviews, stats?.totalProducts],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }],
    };
    const data = new Array(12).fill(0);
    stats?.monthlyEarnings.forEach(entry => {
        const monthIndex = entry.month - 1; // Adjust month to 0-indexed
        data[monthIndex] = parseFloat(entry.earnings);
    });
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Earnings',
            data: data,
            fill: false,
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            tension: 0.1
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className='mt-12 space-y-12'>
            <h2 className='text-2xl font-semibold mb-4'>Admin Statistics Overview</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='max-h-96 md:h-96 w-full'>
                    <Pie data={pieData} options={options} />
                </div>
                <div className='max-h-96 md:h-96 w-full'>
                    <Line data={lineData} options={options} />
                </div>
            </div>
        </div>
    )
}

export default AdminStatsChart