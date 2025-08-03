import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useCreateProductMutation } from '../../../../redux/features/product/productApi';
import { useNavigate } from 'react-router-dom';

const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Dress', value: 'dress' },
    { label: 'Jewellery', value: 'jewellery' },
    { label: 'Cosmetics', value: 'cosmetics' },
];

const colors = [
    { label: 'Select Color', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Gold', value: 'gold' },
    { label: 'Blue', value: 'blue' },
    { label: 'Silver', value: 'silver' },
    { label: 'Beige', value: 'beige' },
    { label: 'Green', value: 'green' },
    { label: 'White', value: 'white' },
];

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        color: '',
    });
    const [image, setImage] = useState('');
    const [formErrors, setFormErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const validateForm = () => {
        const errors = [];

        if (!product.name) errors.push("Product name is required");
        if (!product.category) errors.push("Category is required");
        if (!product.color) errors.push("Color is required");
        if (!product.price) errors.push("Price is required");
        if (!product.description) errors.push("Description is required");
        if (!image) errors.push("Image is required");

        setFormErrors(errors);
        return errors.length === 0;
    };

    useEffect(() => {
        if (hasSubmitted) {
            validateForm();
        }
    }, [product, image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (!validateForm()) return;

        try {
            await createProduct({ ...product, image, author: user?._id }).unwrap();
            alert('Product added successfully!');
            setProduct({ name: '', category: '', description: '', price: '', color: '' });
            setImage('');
            setFormErrors([]);
            setHasSubmitted(false);
            navigate('/shop');
        } catch (err) {
            console.error('Failed to add product:', err);
            setFormErrors(["Something went wrong. Please try again."]);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white  rounded mt-10">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1  gap-4">
                    <TextInput
                        label="Product Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Ex. Diamond Earrings"
                    />
                    <SelectInput
                        label="Category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        options={categories}
                    />
                    <SelectInput
                        label="Color"
                        name="color"
                        value={product.color}
                        onChange={handleChange}
                        options={colors}
                    />
                    <TextInput
                        label="Price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        type="number"
                        placeholder="50"
                    />
                </div>

                <UploadImage  name='image'
                value={image} 
                setImage={setImage} />

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={product.description}
                        placeholder="Write a product description"
                        className="mt-1 p-3 w-full border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={handleChange}
                        rows={4}
                    />
                </div>

                {hasSubmitted && formErrors.length > 0 && (
                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                        <ul className="list-disc pl-5">
                            {formErrors.map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isLoading || (hasSubmitted && formErrors.length > 0)}
                        className={`px-6 py-3 rounded-md text-white font-semibold transition ${
                            isLoading || (hasSubmitted && formErrors.length > 0)
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {isLoading ? 'Adding...' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
