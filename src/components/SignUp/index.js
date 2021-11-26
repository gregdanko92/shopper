import React, { useState } from 'react'
import  './styles.scss'
import FormInput from '../forms/FormInput'
import Buttons from '../forms/Button'
import { auth, handleUserProfile } from './../../firebase/utility'
import AuthWrapper from './../AuthWrapper'
import { withRouter } from 'react-router-dom'

const Signup  = (props) => {

    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])


    const reset = () => {
        setDisplayName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setErrors([])
    }


    const handleFormSubmit = async event =>{
        event.preventDefault()

        if(password !== confirmPassword){
            const err = ['Passwords do not match']
            setErrors(err)
            return
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            
            await handleUserProfile(user, { displayName })

            reset()
            
            props.history.push('/')
            
        } catch(err){

        }
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
