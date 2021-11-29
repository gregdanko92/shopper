import React from 'react'
import {Link} from 'react-router-dom'
import Buttons from './../../forms/Button'

const Product = ({
    documentID,
    productThumbnail,
    productName,
    productPrice
}) => {

    if (!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined') return null
    const configAddToCartBtn = {
        type:"button"
    }
    return(
        <div className='product'>
            <div className='thumb'>
                <Link to={`/product/${documentID}`}>
                    <img src={productThumbnail} alt={productName} />
                </Link>
            </div>            
            
            <div className='details'>
                <ul>
                    <li>
                        <span className='name'>
                        <Link to={`/product/${documentID}`}>
                            {productName}
                        </Link>
                            </span>
                    </li>
                    <li>
                        <span
                        className='price'
                        >${productPrice}</span>
                    </li>
                    <li>
                        <div className="add-to-cart-button">
                            <Buttons {...configAddToCartBtn} >
                                Add to Cart
                            </Buttons>
                        </div>
                    </li>


                </ul>
            </div>

            
        </div>
    )
} 

export default Product