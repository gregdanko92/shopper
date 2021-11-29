import React from 'react'
import { useSelector, useDispatch } from 'react-redux' //creates mapStateToProps
import { Link } from 'react-router-dom'
import './styles.scss'
import { signOutUserStart } from './../../redux/User/user.actions'
import {selectCartItemsCount} from './../../redux/Cart/cart.selectors'

const mapState = (state) =>({
    currentUser: state.user.currentUser, 
    // totalNumCartItems: cartData.cartItems.length eschewed becuase it doesn't account for cart multiples, want to display the unique cart items
    totalNumCartItems:selectCartItemsCount(state)
})

const Header = (props) => {
const dispatch = useDispatch()
const signOut = () => {
    dispatch(signOutUserStart())
}

    const { currentUser, totalNumCartItems } = useSelector(mapState)
    return(
        <header className='header'>
            <div className='wrap'>
                <div className='logo'>

                    <Link to='/'>
                        <h1>SURFSHOP</h1>
                    </Link>
                    
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/search'>
                                Search
                            </Link>
                        </li>
                        <li>
                            <Link to='/'>
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className='call-to-actions'>

        

                    <ul>

                        <li>
                            <Link to='/cart'>
                                Cart [ {totalNumCartItems} ]
                            </Link>
                        </li>

                    {currentUser && [
                            <li>
                                <span onClick={() => signOut()}>
                                    LogOut
                                </span>
                            </li>
                            ,
                            <li>
                                <Link to='/dashboard' >
                                    My Account
                                </Link>
                            </li>
                    ]}
                    

                
                    {!currentUser && [
                            <li>
                                <Link to='/registration' >
                                    Register
                                </Link>
                            </li>
                            ,
                            <li>
                                <Link to='/login' >
                                    Login
                                </Link>
                            </li>
                     ] }
                    </ul>
            </div>
            
            </div>

        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}


export default Header