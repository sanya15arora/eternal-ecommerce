import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCards from '../shop/ProductCards'
import { useGetProductsByCategoryQuery } from '../../redux/features/product/productApi'

const CategoryPage = () => {
    const { categoryName } = useParams()
    const { data: filteredProducts = [], isLoading, error } = useGetProductsByCategoryQuery(categoryName)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>{categoryName}</h2>
                <p className='section__subheader'>
                    Browse a diverse range of categories, from chic dresses to versatile accessories.
                    Elevate your style today!
                </p>
            </section>

            <div className='section__container'>
                {isLoading && <div className="text-center py-10">Loading products...</div>}
                {error && <div className="text-center py-10 text-red-500">Failed to load products.</div>}
                {!isLoading && !error && <ProductCards products={filteredProducts} />}
            </div>
        </>
    )
}

export default CategoryPage
