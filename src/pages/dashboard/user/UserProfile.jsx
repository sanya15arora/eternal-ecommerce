import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEditprofileMutation } from '../../../redux/features/auth/authApi';
import { setUser } from '../../../redux/features/auth/authSlice';

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [editProfile, { isLoading, isError, error, isSuccess }] = useEditprofileMutation();

    const [formData, setFormData] = useState({
        username: '',
        profileImage: '',
        bio: '',
        profession: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            username: formData.username,
            profileImage: formData.profileImage,
            bio: formData.bio,
            profession: formData.profession,
            phone: formData.phone,
            address: formData.address,
        };
        try {
            const response = await editProfile({ id: user._id, userData }).unwrap();
            if (response) {
                const { user } = response;
                dispatch(setUser({ user }));
                localStorage.setItem('user', JSON.stringify(response.user));
                alert("Profile updated successfully!");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession,
                phone: user.phone,
                address: user.address,
                email: user.email,
            });
        }
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-4 p-6 bg-white rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Profile Image */}
                <div className="flex items-center gap-4">
                    <img
                        src={formData.profileImage || '/default-avatar.png'}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border"
                    />
                    <input
                        type="text"
                        name="profileImage"
                        value={formData.profileImage}
                        onChange={handleChange}
                        placeholder="Profile Image URL"
                        className="flex-1 px-3 py-2 border rounded-md w-full"
                    />
                </div>

                {/* Username */}
                <div>
                    <label className="block mb-1 font-medium">Username</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                {/* Email (readonly) */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        className="w-full px-3 py-2 border rounded-md bg-gray-100"
                        readOnly
                    />
                </div>
                {/* Phone */}
                <div>
                    <label className="block mb-1 font-medium">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {/* Profession */}
                <div>
                    <label className="block mb-1 font-medium">Profession</label>
                    <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                {/* Bio */}
                <div>
                    <label className="block mb-1 font-medium">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        rows="3"
                    />
                </div>



                {/* Address */}
                <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        rows="2"
                    />
                </div>



                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>

                {/* Feedback */}
                {isError && <p className="text-red-500 text-sm mt-2">{error?.data?.message || 'Failed to update profile'}</p>}
                {isSuccess && <p className="text-green-600 text-sm mt-2">Profile updated successfully!</p>}
            </form>
        </div>
    );
};

export default UserProfile;
