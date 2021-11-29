import React, { useEffect }from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {fetchProductsStart} from './../../redux/Products/products.actions'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Product'
import './styles.scss'
import FormSelect from './../forms/FormSelect'


const mapState = ({ productsData }) => ({
    products:productsData.products.data
})

const ProductsResults = ({}) => {
    const dispatch = useDispatch()
    const history = useHistory() // for pushing to new route based on filter option
    const { filterType } = useParams() // for grabbing the filter from the url, pass into fetchProducts when dispatched
    const { products } = useSelector(mapState)

    useEffect(()=>{
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [filterType]) // if filter type changes, fetch is called again with filter in place

    const handleFilter = (e) => {
        const nextFilter = e.target.value
        history.push(`/search/${nextFilter}`)
    }

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

    const configFilters = {

        defaultValue: filterType,
        options: [{
            name:'Show all',
            value: ''
        },{
            name:'Mens',
            value: 'mens'
        },{
            name:'Womens',
            value: 'womens'
        }],
        handleChange: handleFilter
    }
    
   

    return (
        <div>
        <div className='products'>
            
            <h1>
                All Products
            </h1>

            <FormSelect {...configFilters}/>

            <div className='product-results'>
                {products.map((product, idx)=>{
                    console.log('found one prodcut')
                    const { productThumbnail, productName, productPrice } = product
                    
                    if (!productThumbnail || !productName || 
                        typeof productPrice === 'undefined') return null
                    const configProduct = {
                        ...product
                    }
                    return (
                        <Product {...configProduct}/>
                    )
                })}
            </div>
        </div>
    </div>
    )
}

export default ProductsResults