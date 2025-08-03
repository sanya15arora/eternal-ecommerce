import React, { useState } from 'react'
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user.role);

    const [updateUserRole] = useUpdateUserRoleMutation();

    const handleUpdateRole = async () => {
        try {
            await updateUserRole({ id: user?._id, role }).unwrap()
            alert("User role updated successfully!!")
            onRoleUpdate()
            onClose()
        }
        catch (error) {
            console.error("Failed to update user role", error);
        }

    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
            <div className='bg-white rounded p-4 shadow-lg w-1/3'>
                <h2 className='text-xl mb-4'>Edit User Role</h2>

                <div className='mb-4 space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input type='email'
                        value={user?.email}
                        readOnly
                        className='mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md 
                    py-2.5 px-5 focus:outline-none'/>
                </div>
                <div className='mb-4 space-y-4'>
                    <label className='block text-sm font-medium text-gray-700'>Role</label>
                    <select value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='mt-1 bg-gray-100 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md 
                        py-2.5 px-5 focus:outline-none'>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>

                    </select>
                </div>
                {error && <p className='text-red-500 mb-4'> Failed to update user role.</p>}

                <div className='flex justify-end pt-5'>
                    <button className='bg-primary text-white px-4 py-2 rounded mr-2'
                        onClick={onClose}>Cancel</button>
                    <button className='bg-indigo-500 text-white px-4 py-2 rounded mr-2'
                        onClick={handleUpdateRole}>Save</button>

                </div>

            </div>
        </div>
    )
}

export default UpdateUserModal