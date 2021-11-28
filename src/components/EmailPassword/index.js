import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions'
import './styles.scss'
import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import { useHistory } from 'react-router-dom'


const mapState = ({ user }) => ({
    resetPasswordSuccess:user.resetPasswordSuccess,
    userErr:user.userErr
})

const EmailPassword = (props)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const { resetPasswordSuccess, userErr } = useSelector(mapState)
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(()=>{
        if(resetPasswordSuccess){
            dispatch(resetUserState())
            history.push('/login')
        }
    },[resetPasswordSuccess])

    useEffect(()=>{
        if (Array.isArray(userErr)&& userErr.length > 0){
            setErrors(userErr)
        }

    },[userErr])
    
     const handleSubmit = async(e) => {
        e.preventDefault()
        dispatch(resetPasswordStart({ email }))
        
    }
    
        const configAuthWrapper= {
            headline:'Email Password'
        }
        return(
            <AuthWrapper {...configAuthWrapper}>

                <div className='form-wrap'>
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((e,idx)=>{
                                return (
                                    <li key={idx}>
                                        {e}
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    <form >
                        <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e=> setEmail(e.target.value)}/>

                        <Button 
                        type="submit"
                        onSubmit={handleSubmit}> Email Password
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        )
    }


export default EmailPassword