import React, { useState, useEffect } from 'react';
import { uploadImageFile } from '../../../../utils/uploadImageLogic';

const UploadImage = ({ name, value, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (value) {
            setUrl(value);
            setImage(value);
        }
    }, [value, setImage]);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const imageUrl = await uploadImageFile(file);
            setUrl(imageUrl);
            setImage(imageUrl);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
            </label>

            <input
                type="file"
                name={name}
                id={name}
                accept="image/*"
                onChange={handleFileUpload}
                className="add-product-InputCSS"
            />

            {loading && <p className="mt-2 text-sm text-blue-500">Uploading image...</p>}

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

