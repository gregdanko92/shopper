import { useEffect } from 'react'
import { useSelector } from 'react-redux' //map state from redux store
import { useHistory } from 'react-router-dom';


const  mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const useAuth = (props) => {
    const { currentUser } = useSelector(mapState)
    const history = useHistory()
    
    useEffect(()=>{
        if (!currentUser){
            history.push('/login') //grabs the current user from redux store and redirects based on whether or not that's true
        }
    }, [currentUser])

    return currentUser
}

export default useAuth