import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars'

const SingleProduct = () => {
    const { id } = useParams()

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Product Details</h2>
                <div className='section__subheader space-x-2'>
                    <span className='hover:text-primary'> <Link to='/' > Home </Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'> <Link to='/shop' > Shop </Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'> <Link to='/shop' > Shop </Link></span>
                </div>
            </section>

            <section className='section__container mt-8'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                    <div className='md:w-1/2 w-full'>
                        <img
                            className='rounded-md w-full h-auto'
                            src="https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?q=80&w=1925&auto=format&
                        fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt='product' />
                    </div>

                    <div className='md:w-1/2 w-full'>
                        <h3 className='text-2xl font-semibold mb-4'> Product Name</h3>
                        <p className='text-xl text-primary mb-4'>$100 <s>$130</s></p>
                        <p className='text-gray-400 mb-4'>This is a product description</p>
                        <div>
                            <p> <strong>Category:</strong> Category Name</p>
                            <p> <strong>Color:</strong> Color Name</p>
                            <div className='flex items-center gap-1'>
                                <strong>Rating:</strong>
                                <RatingStars rating={4} />
                            </div>
                        </div>
                        <button className='bg-primary mt-6 px-6 py-3 text-white rounded-md'>Add to Cart</button>
                    </div>
                </div>
            </section>

            <section className='section__container mt-8'>
                Reviews Here.
            </section>

        </>
    )
}

export default SingleProduct