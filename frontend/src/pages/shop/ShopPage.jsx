import React, { useState, useEffect } from 'react'
import ProductCards from './ProductCards'
import ShopFiltering from './ShopFiltering'
import { useGetAllProductsQuery } from '../../redux/features/product/productApi'

const filters = {
  categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green', 'white'],
  priceRanges: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 and above', min: 200, max: Infinity },
  ]
}

const ShopPage = () => {

  const [filtersState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: ''
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number)


  const { data, error, isLoading } = useGetAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: !isNaN(minPrice) ? minPrice : '',
    maxPrice: !isNaN(maxPrice) ? maxPrice : '',
    page: currentPage,
    limit: productsPerPage
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 0;
  const totalProducts = data?.totalProducts || 0;


  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }


  const clearFilters = () => {
    setFiltersState({
      category: 'all',
      color: 'all',
      priceRange: ''
    })
  }

  if (isLoading) return <div> Loading...</div>
  if (error) return <div> Error Loading Products...</div>

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;


  return (
    <>
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Shop Page</h2>
        <p className='section__subheader'> Discover the Hottest Picks: Elevate Your Style
          with Our Curated Collection of Trending Women's Fashion Products.
        </p>
      </section>
      <section className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters} />
          <div>
            <h3 className='text-xl font-medium mb-4'> Showing Products {startProduct} to {endProduct} of {totalProducts} products</h3>
            <ProductCards products={products} />
            <div className='mt-6 flex justify-center '>
              <button
                className={`px-4 py-2 rounded-md mr-2 
    ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 ${currentPage === index + 1
                    ? 'bg-red-400 text-white'
                    : 'bg-gray-300 text-gray-700'
                    } rounded-md mx-1`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`px-4 py-2 rounded-md ml-2 
    ${currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopPage