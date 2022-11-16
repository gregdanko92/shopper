import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions'
import { Link, withRouter } from 'react-router-dom'
import './styles.scss'
import Button from './../forms/Button/'
import AuthWrapper from './../AuthWrapper'
import { useHistory } from 'react-router-dom'

import FormInput from './../forms/FormInput'
import Buttons from './../forms/Button/'

const mapState= ({ user }) => ({
    currentUser: user.currentUser
})

const SignIn = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { currentUser } = useSelector(mapState)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const resetForm = () => {
        setEmail('')
        setPassword('')
    }
    useEffect(()=>{
        if (currentUser){ //currentUser is coming from the redux store, whenever this changes, this useEffect body will run
            resetForm()
            history.push('/')
        }
    }, [currentUser])
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(emailSignInStart({email, password}))
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart())
    }
        const configAuthWrapper = {
            headline: 'LogIn'
        }

        return(
            <AuthWrapper {...configAuthWrapper}>
                <div className="form-wrap">
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type='email'
                            name='email'
                            value={email}
                            placeholder="Email"
                            handleChange={e=>setEmail(e.target.value)}
                            />
                        <FormInput
                            type='password'
                            name='password'
                            value={password}
                            placeholder="Password"
                            handleChange={e=>setPassword(e.target.value)}
                            />

                        <Button>LOGIN</Button>
                            
                        <div className='social-signin'>
                                <div className='row'>
                                    <Button onClick={handleGoogleSignIn}>
                                        Sign in with Google
                                    </Button>
                                </div>
                            </div>

                        <div className='links'>
                            <Link to='/recovery'>
                                Reset Password
                            </Link>

                        </div>
                        </form>

                    </div>
                
            </AuthWrapper>
        )

    }


export default withRouter(SignIn)