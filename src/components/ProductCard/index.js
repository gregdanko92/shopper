import React, { useEffect } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductStart, setProduct }  from './../../redux/Products/products.actions'
import './styles.scss'
import Button from '../forms/Button'
import {addProduct} from '../../redux/Cart/cart.actions'
import { handleAddToCart } from '../../redux/Cart/cart.utils'


const mapState = state => ({
    product:state.productsData.product
})
const ProductCard = ({}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { productID } = useParams()
    const { product } = useSelector(mapState)
     

    const { productThumbnail,
        productName,
        productPrice,
        productDesc } = product

    useEffect(()=>{
        dispatch(
          fetchProductStart(productID)  

        )
        return () => {
            dispatch(
                setProduct({})
            )
        }

    },[])

    const handleAddToCart = (product) => {
        if(!product) return
        dispatch(
            addProduct(product)
        )
        history.push('/cart')
    }

    const configAddToCartButton = {
        type:'button'
    }
    return(
        <div className='product-card'>
            <div className='hero'>
                <img src={productThumbnail} />
            </div>
            <div className='product-details'>
                <ul>
                    <li>
                        <h1>
                        {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                        ${productPrice}
                        </span>
                    </li>

                    <li>
                        <span
                        dangerouslySetInnerHTML={{__html:productDesc}}>
                        </span>
                    </li>
                    

                    <li>
                        <div className='add-to-cart'>
                            <Button {...configAddToCartButton} onClick={()=>handleAddToCart(product)} >
                                Add to Cart
                            </Button>
                        </div>
                    </li>

                </ul>
            </div>
            
            
        </div>
    )
}

export default ProductCard