import React, { useState, useEffect } from 'react'
import  './styles.scss'
import FormInput from '../forms/FormInput'
import Buttons from '../forms/Button'
import AuthWrapper from './../AuthWrapper'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {signUpUserStart, resetAllAuthForms} from './../../redux/User/user.actions'
import { useHistory } from 'react-router-dom'
const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr:user.userErr
})

const Signup  = (props) => {
    const {currentUser, userErr} = useSelector(mapState)
    const dispatch = useDispatch()
    const history = useHistory()
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(()=>{
        if (currentUser){
            reset()
            history.push('/')
        }
    }, [currentUser])

    useEffect(()=>{
        if (Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr)
        }


    }, [userErr])

    const reset = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setErrors([])
    }


    const handleFormSubmit = (event) =>{
        event.preventDefault()
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }))

       

        
    }
        const configAuthWrapper = {
            headline:'Registration'
        }
        return(
            <AuthWrapper {...configAuthWrapper} >
                    <h2>
                        
                    </h2>


                    <div className='form-wrap'>
                        {errors.length > 0 && (
                            <ul>
                                {errors.map((err, idx)=>{
                                    return(
                                        <li key={idx}>
                                            {err}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                        <form
                        onSubmit={handleFormSubmit}>

                            <FormInput
                            type="text"
                            name="displayName"
                            value={displayName}
                            handleChange = {e=>setDisplayName(e.target.value)}
                            placeholder="Full Name"
                            />
                            <FormInput
                            type="email"
                            name="email"
                            value={email}
                            handleChange = {e=>setEmail(e.target.value)}
                            placeholder="Email"
                            />
                            <FormInput
                            type="password"
                            name="password"
                            value={password}
                            handleChange = {e=>setPassword(e.target.value)}
                            placeholder="Password"
                            />
                            <FormInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            handleChange = {e=>setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            />
                            <Buttons>
                                Register
                            </Buttons>


                        </form>

                    </div>
            </AuthWrapper>
        )
    }

export default withRouter(Signup)
