import React from 'react'

const TimelineStep = ({ step, order, isCompleted, isCurrent, isLastStep, icon, description }) => {
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-100';
    const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
    const connectorColor = isCompleted ? 'bg-blue-400' : 'bg-gray-200';
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-300';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-200';


    return (
        <li className='relative mb-6 sm:mb-0 sm:pl-10'>
            <div className='flex items-center'>
                <div className={`z-10 flex items-center justify-center w-6 h-6 ${iconBgColor} ${step?.status == 'completed' ? 'bg-green-700 text-green-100' :
                    step?.status == 'pending' ? 'bg-red-700 text-red-100' :
                        step?.status == 'processing' ? 'bg-yellow-500 text-yellow-100' :
                            'bg-indigo-700 text-indigo-100'}
               rounded-full ring-0 ring-white shrink-0 `}>
                    <i className={`ri-${icon.iconName} text-lg`}></i>
                </div>
                {!isLastStep && (
                    <div className={`hidden sm:flex w-full h-0.5 ${connectorColor}`}></div>
                )
                }
            </div >
            <div className='mt-3 sm:pe-8'>
                <h3 className={`text-base font-medium ${labelTextColor}`}>{step.label}</h3>
                {isCurrent && ( <time className='block mb-2 text-sm font-normal leading-none text-gray-500'>{order.updatedAt ? new Date(order.updatedAt).toLocaleString() : "Time"}</time>)}
                <p className={`text-base font-normal ${descriptionTextColor}`}>{description}</p>
            </div>
        </li >
    )
}

export default TimelineStep