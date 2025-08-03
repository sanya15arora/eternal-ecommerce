import React, { useState } from 'react';
import { useSearchProductsQuery } from '../../redux/features/product/productApi';
import ProductCards from '../shop/ProductCards';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [queryToSearch, setQueryToSearch] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: products = [],
    isLoading,
    error,
  } = useSearchProductsQuery(queryToSearch, {
    skip: !queryToSearch,
  });

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      setQueryToSearch(trimmedQuery);
      setHasSearched(true);
    }
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
        </p>
      </section>

      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="search-bar w-full max-w-4xl p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search for products..."
          />
          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-3 px-8 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            Search
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-10 text-gray-500">Loading products...</div>
        )}

        {error && (
          <div className="text-center py-10 text-red-500">Failed to load products</div>
        )}

        {!isLoading && !error && products?.length > 0 && (
          <ProductCards products={products} />
        )}

        {hasSearched && !isLoading && products?.length === 0 && (
          <div className="text-center py-12 text-gray-500">No products found.</div>
        )}
      </section>
    </>
  );
};

export default Search;
