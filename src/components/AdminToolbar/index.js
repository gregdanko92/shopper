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
    const { currentUser }  = useSelector(mapState) // useSelector explained: equivalent of mapStateToProps

    const isAdmin = checkUserIsAdmin(currentUser)// this line checks if the user if an admin 
    if (!isAdmin) return null // this line then operates to cancel the rendering of the component based on the result of the above, this protecting our admin route, hooray

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