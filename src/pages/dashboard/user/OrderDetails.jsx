import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetOrdersByIdQuery } from '../../../redux/features/order/orderApi'
import TimelineStep from '../../../components/TimelineStep';

const OrderDetails = () => {
    const { user } = useSelector((state) => state.auth)
    const { orderId } = useParams();

    const { data: orders, isLoading, error } = useGetOrdersByIdQuery(orderId);
    const order = orders?.order || {};

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>No Order found!</div>;

    if (!order) {
        return <div>Loading...</div>;
    }

    const isCompleted = (status) => {
        const statuses = ['pending', 'processing', 'shipped', 'completed'];
        return statuses.indexOf(status) < statuses.indexOf(order.status);
    };

    const isCurrent = (status) => {
        return order.status === status;
    };

    const steps = [
        {
            status: 'pending',
            label: 'Pending',
            description: 'Your order has been created and is awaiting processing.',
            icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
        },
        {
            status: 'processing',
            label: 'Processing',
            description: 'Your order is currently being processed.',
            icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
        },
        {
            status: 'shipped',
            label: 'Shipped',
            description: 'Your order has been shipped.',
            icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
        },
        {
            status: 'completed',
            label: 'Completed',
            description: 'Your order has been successfully completed.',
            icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
        },
    ];


    const totalPrice = order.products?.reduce((acc, product) => {
        const price = product?.price || 0;
        const qty = product?.quantity || 0;
        return acc + price * qty;
    }, 0) || 0;

    const tax = totalPrice * (order?.taxRate || 0);

    return (
        <section className='section__container rounded p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Payment {order.status}</h2>
            <p className='mb-4'>Order Id: {order?._id}</p>
            <p className='mb-4'>Status: {order?.status}</p>
            <ol className='sm:flex items-center relative'>
                {
                    steps.map((step, index) => (
                        <TimelineStep
                            key={index}
                            step={step}
                            order={order}
                            isCompleted={isCompleted(step.status)}
                            isCurrent={isCurrent(step.status)}
                            isLastStep={index === steps.length - 1}
                            icon={step.icon}
                            description={step.description} />
                    ))
                }

            </ol>

            {/* Products Ordered */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Products Ordered</h3>

                <div className="grid gap-5">
                    {order.products?.map((product, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-6 p-5 bg-white border border-gray-200 rounded-xl shadow-sm"
                        >
                            <img
                                src={product?.image}
                                alt={product?.name}
                                className="w-24 h-24 object-cover rounded-lg border"
                            />

                            <div className="flex-1 space-y-1">
                                <h4 className="text-lg font-semibold text-gray-900">
                                    {product?.name || 'Product Name'}
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Quantity: <span className="font-medium text-gray-800">{product.quantity}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Unit Price: <span className="font-medium text-gray-800">${product?.price?.toFixed(2)}</span>
                                </p>
                            </div>

                            <div className="text-right font-semibold text-lg text-gray-900 min-w-[80px]">
                                ${(product?.price * product.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary */}
            <div className="mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Order Summary</h3>

                <div className="text-sm text-gray-700 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium text-gray-800">${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Tax ({(order.taxRate * 100).toFixed(2)}%):</span>
                        <span className="font-medium text-gray-800">${tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between border-t pt-4 font-semibold text-gray-900">
                        <span>Total Paid:</span>
                        <span>${order.amount.toFixed(2)}</span>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default OrderDetails