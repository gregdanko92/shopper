import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { checkUserIsAdmin } from './../Utils'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const useAdminAuth = props => {
    const { currentUser } = useSelector(mapState)
    const history = useHistory()
    
    useEffect(()=>{
        if (!checkUserIsAdmin(currentUser)) {      // take currentUSer and see if it is an admin
            history.push('/login') //not admin, push to login page
        }

    }, [currentUser])
    return currentUser
}

export default useAdminAuth