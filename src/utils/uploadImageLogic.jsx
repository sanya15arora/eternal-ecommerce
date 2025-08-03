import axios from 'axios';
import getBaseURL from './baseURL';

export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
};

export const uploadImageFile = async (file) => {
    try {
        const base64 = await convertBase64(file);
        const { data } = await axios.post(`${getBaseURL()}/uploadImage`, { image: base64 });
        return data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image.");
    }
};
