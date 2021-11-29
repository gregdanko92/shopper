import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './styles.scss'
import {checkUserIsAdmin} from './../../Utils'

//mapstate takes state from the redux store, here we destructure the user state
const mapState = ({ user }) =>({
    currentUser: user.currentUser
})

const AdminToolbar = (props) => {
    const { currentUser }  = useSelector(mapState)

    const isAdmin = checkUserIsAdmin(currentUser)
    if (!isAdmin) return null

    return (
        <div className='admin-toolbar'>
            <ul>
                <li>
                    < Link to='/admin'>
                        Admin
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminToolbar