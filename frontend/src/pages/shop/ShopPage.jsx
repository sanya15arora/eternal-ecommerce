import React, { useState, useEffect } from 'react'
import productsData from '../../data/products.json'
import ProductCards from './ProductCards'
import ShopFiltering from './ShopFiltering'

const filters = {
  categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green',],
  priceRanges: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 and above', min: 200, max: Infinity },
  ]

}

const ShopPage = () => {

  const [products, setProducts] = useState(productsData)
  const [filtersState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: ''
  })

  const applyFilters = () => {
    console.log(filtersState)
    let filteredProducts = productsData

    if (filtersState.category && filtersState.category !== 'all') {
      filteredProducts = productsData.filter(product => product.category === filtersState.category)
    }

    if (filtersState.color && filtersState.color !== 'all') {
      filteredProducts = productsData.filter(product => product.color === filtersState.color)
    }

    if (filtersState.priceRange) {
      const [minPrice, maxPrice] = filtersState.priceRange.split('-').map(Number)
      filteredProducts = productsData.filter(product => product.price >= minPrice && product.price <= maxPrice)
    }

    console.log(filteredProducts)
    setProducts(filteredProducts)

  }

  useEffect(() => { applyFilters() }, [filtersState])

  const clearFilters = () => {
    setFiltersState({
      category: 'all',
      color: 'all',
      priceRange: ''
    })
  }


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
            <h3 className='text-xl font-medium mb-4'> </h3>
            <ProductCards products={products} />
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopPage