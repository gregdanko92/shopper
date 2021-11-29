import React, { useEffect }from 'react'
import {fetchProductsStart} from './../../redux/Products/products.actions'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Product'
import './styles.scss'


const mapState = ({ productsData }) => ({
    products:productsData.products.data
})

const ProductsResults = ({}) => {
    const dispatch = useDispatch()
    const { products } = useSelector(mapState)

    useEffect(()=>{
        dispatch(
            fetchProductsStart()
        )
    }, [])

    if (!Array.isArray(products)) return null
    if (products.length < 1) {
        return (
            <div className='products'>
                <h4>
                    No items 
                </h4>
            </div>
        )
    }

    return (
        <div className='products'>
            
            <h1>
                All Products
            </h1>
            <div className='product-results'>
                {products.map((product, pos)=>{
                    console.log('found one prodcut')
                    const { productThumbnail, productName, productPrice } = product
                    
                    if (!productThumbnail || !productName || 
                        typeof productPrice === 'undefined') return null
                    const configProduct = {
                        productThumbnail, productName, productPrice
                    }
                    return (
                        <Product {...configProduct}/>
                    )
                })}
            </div>

        </div>
    )
}

export default ProductsResults