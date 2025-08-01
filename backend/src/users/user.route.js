const express = require('express');
const router = express.Router();
const User = require('./user.model');
const generateAuthToken = require('../middleware/generateAuthToken');
// const verifyToken = require('../middleware/verifyToken');

// Registration Endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    }
    catch (err) {
        console.log("Error registering User", err);
        res.status(500).json({ message: 'Error registering User', });
    }
});

// Login Endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        // Generate auth token
        const token = await generateAuthToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });

        res.status(200).json({
            message: 'Logged in successfully.', token, user:
            {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                bio: user.bio,
                profileImage: user.profileImage,
                profession: user.profession,
                phone: user.phone,
                address: user.address,
            }
        });
    } catch (err) {
        console.log("Error logging in User", err);
        res.status(500).json({ message: 'Error logging in User' });
    }
});

// Logout Endpoint
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully.' });
});

// Delete User Endpoint
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
        console.log("Error deleting User", err);
        res.status(500).json({ message: 'Error deleting User' });
    }
});

// Get All Users Endpoint
router.get('/all', async (req, res) => {
    try {
        const users = await User.find({}, 'id username email role').sort({ createdAt: -1 });
        res.status(200).send(users);
    } catch (err) {
        console.log("Error fetching Users", err);
        res.status(500).json({ message: 'Error fetching Users' });
    }
});

// Update User Role Endpoint
router.put('/:id/role', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User role updated successfully.',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                bio: user.bio,
                profileImage: user.profileImage,
                profession: user.profession,
                phone: user.phone,
            },
        });
    } catch (err) {
        console.error('Error updating user role:', err);
        res.status(500).json({ message: 'Error updating user role' });
    }
});


// Update User Profile Endpoint
router.patch('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const {
            username,
            profileImage,
            bio,
            profession,
            phone,
            address,
        } = req.body;

        const updateFields = {};

        if (username !== undefined) updateFields.username = username;
        if (profileImage !== undefined) updateFields.profileImage = profileImage;
        if (bio !== undefined) updateFields.bio = bio;
        if (profession !== undefined) updateFields.profession = profession;
        if (phone !== undefined) updateFields.phone = phone;
        if (address !== undefined) updateFields.address = address;

        const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                bio: updatedUser.bio,
                profileImage: updatedUser.profileImage,
                profession: updatedUser.profession,
                phone: updatedUser.phone,
                address: updatedUser.address,
            },
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Error updating user profile' });
    }
});

module.exports = router;



module.exports = router;