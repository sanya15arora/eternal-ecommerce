import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useSelector } from 'react-redux'
import CartModal from '../pages/shop/CartModal'
import { useDispatch } from 'react-redux'
import avatarImg from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/auth/authApi'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/auth/authSlice'

const Navbar = () => {

    const products = useSelector((state) => state.cart.products)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen)
    }

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();

    const [isDropDownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropDownOpen);
    };

    const adminDropdownItems = [
        { label: 'Dashboard', path: '/dashboard/admin' },
        { label: 'Manage Products', path: '/dashboard/manage-products' },
        { label: 'All Orders', path: '/dashboard/manage-orders' },
        { label: 'Add New Post', path: '/dashboard/add-new-post' },
    ];
    const userDropdownItems = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Profile', path: '/dashboard/profile' },
        { label: 'Payments', path: '/dashboard/payments' },
        { label: 'Orders', path: '/dashboard/orders' },
    ];

    const dropdownItems = user?.role === 'admin' ? [...adminDropdownItems] : [...userDropdownItems];

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/');
        }
        catch (error) {
            console.error('Failed to logout.', error);
        }
    };

    return (
        <div className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl max-auto px-4 flex justify-between items-center'>
                <ul className='nav__links'>
                    <li className='link'> <Link to="/">Home</Link></li>
                    <li className='link'> <Link to="/shop">Shop</Link></li>
                    <li className='link'> <Link to="/">Page</Link></li>
                    <li className='link'> <Link to="/contact">Contact</Link></li>
                </ul>
                <div>
                    <Link to='/'>
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                <div className='nav__icons relative'>
                    <span>
                        <Link to="/search">
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span>
                        <button className='hover:text-primary' onClick={handleCartToggle}>
                            <i className="ri-shopping-bag-line"></i>
                            <sup className='text-sm inline-block px-1.5 text-white 
                                rounded-full bg-primary text-center'>{products.length}</sup>
                        </button>
                    </span>
                    <span>
                        {
                            user && user ? (<>
                                <img src={user?.profileImage || avatarImg} alt="" className="size-6 rounded-full cursor-pointer"
                                    onClick={handleDropdownToggle} />
                                {
                                    isDropDownOpen && (
                                        <div className='absolute right-0 mt-3 p-4 w-50 bg-white border border-gray-200 shadow-lg rounded-lg z-50'>
                                            <ul className=' font-medium space-y-4 p-2 cursor-pointer'>
                                                {dropdownItems.map((item, index) => (
                                                    <li key={index} className='py-2 px-4 hover:bg-gray-100'>
                                                        <Link onClick={() => setIsDropdownOpen(false)}
                                                            className="dropdown-items "
                                                            to={item.path}>
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li className='py-2 px-4 hover:bg-gray-100'>
                                                    <Link onClick={handleLogout} className="dropdown-items ">Logout</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </>) : (<Link to="/login">
                                <i className="ri-user-line"></i>
                            </Link>)
                        }

                    </span>

                </div>
            </nav>
            {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
        </div>
    )
}

export default Navbar