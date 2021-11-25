import React, { Component } from 'react'
import  './styles.scss'
import FormInput from '../forms/FormInput'
import Buttons from '../forms/Button'
import { auth, handleUserProfile } from './../../firebase/utility'

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors:[]

}

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this)
        
    }

    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
    }

    handleFormSubmit = async event =>{
        event.preventDefault()
        const {displayName, email, password, confirmPassword, errors } = this.state

        if(password !== confirmPassword){
            const err = ['Passwords do not match']
            this.setState({
                errors:err
            })
            return
        }

        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            
            await handleUserProfile(user, { displayName })

            this.setState({...initialState})

        } catch(err){

        }
    }
    render(){
        const {displayName, email, password, confirmPassword, errors} = this.state
        return(
            <div className='signup'>
                <div className='wrap'>
                    <h2>
                        Sign Up
                    </h2>

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

                    <div className='form-wrap'>
                        <form
                        onSubmit={this.handleFormSubmit}>

                            <FormInput
                            type="text"
                            name="displayName"
                            value={displayName}
                            onChange = {this.handleChange}
                            placeholder="Full Name"
                            />
                            <FormInput
                            type="email"
                            name="email"
                            value={email}
                            onChange = {this.handleChange}
                            placeholder="Email"
                            />
                            <FormInput
                            type="password"
                            name="password"
                            value={password}
                            onChange = {this.handleChange}
                            placeholder="Password"
                            />
                            <FormInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange = {this.handleChange}
                            placeholder="Confirm Password"
                            />

                            <Buttons>
                                Register
                            </Buttons>


                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
export default Signup