import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const Header = (props) => {
    return(
        <header className='header'>
            <div className='wrap'>
                <div className='logo'>

                    <Link to='/'>
                        <h1>LOGO</h1>
                    </Link>
                    
                </div>
                <div className='call-to-actions'>
                <ul>
                    <li>
                        <Link to='/registration' >
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
            </div>

        </header>
    )
}

export default Header