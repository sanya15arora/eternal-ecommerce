import React, { useState } from 'react'
import axios from 'axios'
import getBaseURL from '../../../../utils/baseURL';

const UploadImage = ({ name, value, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('')

    const convertBase64 = (file) => {

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const uploadImage = async (event) => {
        const files = event.target.files
        if (files.length == 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
        const base64s = [];
        for (let i = 0; i < files.length; i++) {
            const base = await convertBase64(files[i])
            base64s.push(base);
        }
    }

    const uploadSingleImage = (base64) => {
        setLoading(true)
        axios.post(`${getBaseURL()}/uploadImage`, { image: base64 })
            .then((response) => {
                const imageUrl = response.data
                setUrl(imageUrl)
                setImage(imageUrl)
                alert('Image uploaded successfully!')
            })
            .then(() => setLoading(false))
            .catch((error) => {
                console.error("Error uplading Image", error)
                setLoading(false)
            })


    }

    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700 '>Upload Image</label>
            <input type='file'
                name={name}
                id={name}
                onChange={uploadImage}
                className='add-product-InputCSS' />
            {
                loading && (<div className='mt-2 text-sm text-blue-600'> Uploading Image..... </div>)
            }
            {
                url && (<div className='mt-2 text-sm text-gray-600'>
                    <p>Image Uploaded Successfully!</p>
                    <img src={url} alt="uploaded-image" className="mt-3 h-40 w-40 object-cover rounded shadow" />
                </div>)
            }
        </div>
    )
}

export default UploadImage