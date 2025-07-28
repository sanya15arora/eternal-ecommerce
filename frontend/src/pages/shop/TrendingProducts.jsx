import React, { useState } from 'react';
import ProductCards from './ProductCards';
import { useGetTrendingProductsQuery } from '../../redux/features/product/productApi';

const TrendingProducts = () => {
    const { data: products = [], isLoading, isError } = useGetTrendingProductsQuery();
    const [visibleProducts, setVisibleProducts] = useState(8);

    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 4);
    };

    if (isLoading) return <p className='text-center mt-10'>Loading trending products...</p>;
    if (isError) return <p className='text-center mt-10 text-red-500'>Failed to load trending products.</p>;

    return (
        <section className='section__container product__container'>
            <h2 className="section__header">Trending Products</h2>
            <p className='section__subheader'>
                Explore our curated selection of fashion-forward finds that fashionistas can't stop talking about.
            </p>

            <div className='mt-12'>
                <ProductCards products={products.slice(0, visibleProducts)} />
            </div>

            <div className='product__btn'>
                {visibleProducts < products.length && (
                    <button onClick={loadMoreProducts} className='btn'>
                        Load More
                    </button>
                )}
            </div>
        </section>
    );
};

export default TrendingProducts;
