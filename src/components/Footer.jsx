import React from 'react'
import instaImg1 from "../assets/instagram-1.jpg"
import instaImg2 from "../assets/instagram-2.jpg"
import instaImg3 from "../assets/instagram-3.jpg"
import instaImg4 from "../assets/instagram-4.jpg"
import instaImg5 from "../assets/instagram-5.jpg"
import instaImg6 from "../assets/instagram-6.jpg"

const Footer = () => {
    return (
        <>
            <footer className='section__container footer__container'>
                <div className='footer__col'>
                    <h4> CONTACT INFO</h4>
                    <p><span><i className="ri-map-pin-2-fill"></i></span>
                        123, London Bridge Street, London
                    </p>
                    <p><span><i className="ri-mail-fill"></i></span>
                        support@eternal.com
                    </p>
                    <p><span><i className="ri-phone-fill"></i></span>
                        (+012) 3456 789
                    </p>
                </div>
                <div className='footer__col'>
                    <h4> COMPANY</h4>
                    <a href='/'>Home </a>
                    <a href='/shop'>Shop </a>
                    <a href='/search'>Search</a>
                    <a href='/contact'>Contact Us </a>
                </div>
                <div className='footer__col'>
                    <h4> USEFUL LINKS</h4>

                    <a href={'/categories/accessories'}>Accessories</a>
                    <a href={'/categories/dress'}>Dress</a>
                    <a href={'/categories/jewellery'}>Jewellery</a>
                    <a href={'/categories/cosmetics'}>Cosmetics</a>
                </div>
                <div className='footer__col'>
                    <h4> Instagram</h4>
                    <div className='instagram__grid'>
                        <img src={instaImg1} alt='instagram-1' />
                        <img src={instaImg2} alt='instagram-2' />
                        <img src={instaImg3} alt='instagram-3' />
                        <img src={instaImg4} alt='instagram-4' />
                        <img src={instaImg5} alt='instagram-5' />
                        <img src={instaImg6} alt='instagram-6' />

                    </div>

                </div>
            </footer>
            <div className='footer__bar'> Copyright © 2025 by Eternal. All rights reserved. </div>
        </>
    )
}

export default Footer