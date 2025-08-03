import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getBaseURL from '../../../../utils/baseURL';

const UploadImage = ({ name, value, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (value) {
            setUrl(value);
            setImage(value);
        }
    }, [value, setImage]);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });
    };

    const uploadImage = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const base64 = await convertBase64(file);
            const { data } = await axios.post(`${getBaseURL()}/uploadImage`, { image: base64 });
            setUrl(data);
            setImage(data);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input
                type="file"
                name={name}
                id={name}
                accept="image/*"
                onChange={uploadImage}
                className="add-product-InputCSS"
            />

            {loading && (
                <p className="mt-2 text-sm text-blue-500">Uploading image...</p>
            )}

            {(url && !loading) && (
                <div className="mt-3">
                    <p className="text-sm text-green-600">Image uploaded:</p>
                    <img
                        src={url}
                        alt="Uploaded"
                        className="mt-2 h-40 w-40 object-cover rounded shadow"
                    />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
