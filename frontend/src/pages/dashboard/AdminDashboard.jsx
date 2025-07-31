import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { logout } from '../../redux/features/auth/authSlice';

const navItems = [

    { label: 'Dashboard', path: '/dashboard/admin' },
    { label: 'Add New Product', path: '/dashboard/add-new-product' },
    { label: 'Manage Products', path: '/dashboard/manage-products' },
    { label: 'Users', path: '/dashboard/users' },
    { label: 'Manage Orders', path: '/dashboard/manage-orders' }
]

const AdminDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/');
        }
        catch (error) {
            console.error("Logout failed:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    }

    return (
        <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
            <div>
                <div className='nav__logo'>
                    <Link to='/'>Eternal <span>.</span></Link>
                    <p className='text-xs italic'>Admin Dashboard</p>
                </div>
                <hr className='mt-5' />
                <ul className='space-y-5 pt-5'>
                    {navItems.map((item) => (<li>
                        <NavLink
                            key={item.path}
                            className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-black'}
                            end
                            to={item.path}>
                            {item.label}
                        </NavLink>
                    </li>))}
                </ul>
            </div>
            <div className='mb-3'>
                <hr className='mb-3' />
                <button className='text-white bg-primary font-medium px-5 py-1 rounded-sm'
                    onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </div>
    )
}


export default AdminDashboard