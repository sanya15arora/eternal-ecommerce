const cloudinary = require('cloudinary').v2;

const cloud_name = process.env.CLOUNDINARY_CLOUD_NAME
const api_key = process.env.CLOUNDINARY_API_KEY
const api_secret = process.env.CLOUNDINARY_API_SECRET

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
}

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (result && result.secure_url) {
                return resolve(result.secure_url);
            }
            return reject({ message: error?.message || "Upload failed" });
        });
    });
};

module.exports = uploadImage;