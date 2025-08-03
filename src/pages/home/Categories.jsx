import React from 'react'
import { Link } from 'react-router-dom'
import category4 from '../../assets/category4.jpeg'
import category1 from '../../assets/category1.jpeg'
import category2 from '../../assets/category2.jpeg'
import category5 from '../../assets/category3.jpeg'

const categories = [
    { name: "Accessories", path: 'accessories', image: category1 },
    { name: "Dress Collection", path: 'dress', image: category2 },
    { name: "Jewellery", path: 'jewellery', image: category5 },
    { name: "Cosmetics", path: 'cosmetics', image: category4 },
]


const Categories = () => {
    return (
        <div className="product__grid">
            {categories.map((category, index) => (
                <Link to={`/categories/${category.path}`} key={category.name} className='categories__card'>
                    <img src={category.image} alt={category.name} />
                    <h4>{category.name}</h4>
                </Link>
            ))}

        </div>
    )
}

export default Categories