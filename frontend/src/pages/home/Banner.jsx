import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from "../../assets/bannerImage.png"

const Banner = () => {
    return (
        <div className='section__container header__container'>
            <div className='header__content z-30'>
                <h1>Style Queens</h1>
                <p>Discover a world of fashion that's as unique and bold as you are! From chic outfits to stylish accessories, we've got the perfect pieces. Our collection celebrates your individuality and confidence.
                    {/* Whether you're turning heads at a party or creating your everyday look, we've got the perfect pieces to help you express your most authentic self. */}
                </p>
                <button className='btn uppercase'>
                    <Link to='/shop'>Explore Now</Link>
                </button>
            </div>
            <div className='header__image'>
                <img src={bannerImg} alt='bannerImg' />
            </div>
        </div>
    )
}

export default Banner