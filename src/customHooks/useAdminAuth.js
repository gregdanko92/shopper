import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { checkUserIsAdmin } from './../Utils'

const mapState = ({ user }) => ({ // this acquires the user information from the redux store, by destructuring it from the massive state object
    currentUser: user.currentUser
})

const useAdminAuth = props => {
    const { currentUser } = useSelector(mapState) //bring that down from the store into the componment
    const history = useHistory() 
    
    useEffect(()=>{
        if (!checkUserIsAdmin(currentUser)) {      // take currentUSer and see if it is an admin, do this via a helper function in the Utils folder
            history.push('/login') //not admin, push to login page
        }

    }, [currentUser])
    return currentUser
}

export default useAdminAuth