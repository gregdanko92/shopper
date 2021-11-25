import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import { auth } from './../../firebase/utility'



const Header = (props) => {
    const { currentUser } = props
    return(
        <header className='header'>
            <div className='wrap'>
                <div className='logo'>

                    <Link to='/'>
                        <h1>LOGO</h1>
                    </Link>
                    
                </div>
                <div className='call-to-actions'>

                    {currentUser && (
                        <ul>
                            <li>
                                <span onClick={() => auth.signOut()}>
                                    LogOut
                                </span>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul>
                            <li>
                                <Link to='/registration' >
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to='/login' >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    ) }
            </div>
            </div>

        </header>
    )
}

Header.defaultProps = {
    currentUser: null
}

export default Header