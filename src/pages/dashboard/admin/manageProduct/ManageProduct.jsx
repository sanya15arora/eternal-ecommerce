import React, { useState } from 'react'
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../../redux/features/product/productApi'
import formatdate from "../../../../utils/formatdate"
import { Link } from 'react-router-dom'


const ManageProduct = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(12)
    const { data: { products = [], totalPages, totalProducts } = {}, isLoading, isError, error, refetch } = useGetAllProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: productsPerPage
    })

    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }


    }

    const [deleteProduct] = useDeleteProductMutation()
    const handleDeleteProduct = async (id, productName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${productName}" product?`);
        if (!confirmDelete) return;

        try {
            await deleteProduct(id).unwrap();
            alert("Product deleted successfully.");
            await refetch();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Something went wrong while deleting the product.");
        }
    };


    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error Loading Product</div>}
            <section className="py-1 bg-blueGray-50">
                <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">All Products</h3>
                            </div>

                            <h3 className='my-4 px-4 text-sm'>Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            No.
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Product Name
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Publishing Date
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Edit Or Manage
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products && products.map((product, index) => (<tr key={index}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index + 1}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {product.name}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {formatdate(product.createdAt)}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer">
                                            <Link to={`/dashboard/update-product/${product._id}`}
                                                className="px-3 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition"
                                            >
                                                <i className='ri-edit-2-line' />
                                                Edit
                                            </Link>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <button className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={() => handleDeleteProduct(product._id, product.name)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                {/* Pagination */}
                {totalProducts > 0 && <div className='mt-6 flex justify-center '>
                    <button
                        className={`px-4 py-2 rounded-md mr-2 ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
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
                        className={`px-4 py-2 rounded-md ml-2 ${currentPage === totalPages
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>}
            </section>
        </>
    )
}

export default ManageProduct