const express = require('express');
const router = express.Router();
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

//Create a new product
router.post('/create-product', async (req, res) => {
    try {
        const newProduct = new Products({ ...req.body });
        const savedProduct = await newProduct.save();
        const reviews = await Reviews.find({ product: savedProduct._id });
        if (reviews.length > 0) {
            const totalrating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = (totalrating / reviews.length).toFixed(1)

            savedProduct.rating = averageRating;
            await savedProduct.save();
        }
        res.status(201).send(savedProduct);
    } catch (err) {
        console.error("Error creating new product", err);
        res.status(500).json({ message: 'Error creating new product' });
    }
});

// Get all products     
router.get('/all', async (req, res) => {
    try {
        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
        const filter = {};
        if (category && category !== 'all') {
            filter.category = category;
        }
        if (color && color !== 'all') {
            filter.color = color;
        }
        if (minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max };
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Products.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));
        const products = await Products.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .populate('author', 'email')
            .sort({ createdAt: -1 });

        res.status(200).send({ products, totalProducts, totalPages });
    } catch (err) {
        console.error("Error fetching products", err);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Get Trending products 
router.get('/trending', async (req, res) => {
    try {
        const trendingProducts = await Products.find()
            .sort({ rating: -1 })
            .limit(10);
        res.status(200).send(trendingProducts);
    } catch (error) {
        console.error('Trending API Error:', error);
        res.status(500).send({ message: 'Server error while fetching trending products.' });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id: productId } = req.params;

        const product = await Products.findById(productId)
            .populate('author', 'email username');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const reviews = await Reviews.find({ productId: productId })
            .populate('userId', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json({ product, reviews });
    } catch (error) {
        console.error('Error fetching product by ID', error);
        res.status(500).json({ message: 'Error fetching product' });
    }
});


// Update a product by ID
router.patch('/update/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Products.findByIdAndUpdate(
            productId,
            { ...req.body },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).send({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    }
    catch (error) {
        console.error("Error updating product", error);
        res.status(500).json({ message: 'Error updating product' });
    }
});

// Delete a product by ID
router.delete('/delete/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Products.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Reviews.deleteMany({ productId: productId });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product", error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});

// Get related products
router.get('/related/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const titleRegex = new RegExp(
            product.name
                .split('')
                .filter((word) => word.length > 0)
                .join("|"),
            'i');
        const relatedProducts = await Products.find({
            _id: { $ne: product._id },
            $or: [
                { name: { $regex: titleRegex } },
                { category: product.category },
            ]
        })

        res.status(200).send(relatedProducts);
    }
    catch (error) {
        console.error("Error fetching the related products", error);
        res.status(500).json({ message: 'Error fetching the related products' });
    }
});



module.exports = router;
