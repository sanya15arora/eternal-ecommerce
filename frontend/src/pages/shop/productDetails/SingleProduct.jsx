import React from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars'
import { useDispatch } from "react-redux"
import { useGetProductByIdQuery } from '../../../redux/features/product/productApi'
import { addToCart } from '../../../redux/features/cart/cartSlice'

const SingleProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    console.log(id)

    const { data, error, isLoading } = useGetProductByIdQuery(id)
    const singleProduct = data?.product || {};
    const productReviews = data?.reviews || [];

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if (isLoading) return <p>Loading....</p>
    if (error) return <p>Error loading product details....</p>

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Product Details</h2>
                <div className='section__subheader space-x-2'>
                    <span className='hover:text-primary'> <Link to='/' > Home </Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'> <Link to='/shop' > Shop </Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-primary'> <Link to='/shop' >  {singleProduct?.name} </Link></span>
                </div>
            </section>

            <section className='section__container mt-8'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                    <div className='md:w-1/2 w-full'>
                        <img
                            className='rounded-md w-full h-auto'
                            src={singleProduct?.image}
                            alt='product' />
                    </div>

                    <div className='md:w-1/2 w-full'>
                        <h3 className='text-2xl font-semibold mb-4'> {singleProduct?.name}</h3>
                        <p className='text-xl text-primary mb-4 space-x-1'>${singleProduct?.price}
                            {singleProduct?.oldPrice && <s className='ml-1'>${singleProduct?.oldPrice}</s>}</p>
                        <p className='text-gray-400 mb-4'>{singleProduct?.description}</p>
                        <div className='flex flex-col space-y-2'>
                            <p> <strong className=''>Category: </strong> {singleProduct?.category}</p>
                            <p> <strong>Color: </strong> {singleProduct?.color}</p>
                            <div className='flex items-center gap-1'>
                                <strong>Rating:</strong>
                                <RatingStars rating={4} />
                            </div>
                        </div>
                        <button className='bg-primary mt-6 px-6 py-3 text-white rounded-md'
                        onClick={(e)=>{
                            e.stopPropagation();
                            handleAddToCart(singleProduct);
                        }}>Add to Cart</button>
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