import React, { Component } from 'react'
import './styles.scss'
import Button from './../forms/Button/'
import  { signInWithGoogle, auth } from './../../firebase/utility'

import FormInput from './../forms/FormInput'
import Buttons from './../forms/Button/'

const initialState = {
    email:'',
    password: '',

}

class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this)

    }
    handleSubmit = async (e) =>{
        e.preventDefault()
        const {email, password} = this.state

        try {

            await auth.signInWithEmailAndPassword(email, password)
            this.setState({
                ...initialState
            })



        } catch(err) {
            console.log(err)
        }
    }
    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]:value
        })

    }



    render(){
        const {email, password} = this.state
        return(
            <div className='signin'>
                <div className='wrap'>
                    <h2>
                        Log In
                    </h2>
    
                    <div className="form-wrap">
                        <form onSubmit={this.handleSubmit}>
                            <FormInput
                            type='email'
                            name='email'
                            value={email}
                            placeholder="Email"
                            handleChange={this.handleChange}
                            />
                            <FormInput
                            type='password'
                            name='password'
                            value={password}
                            placeholder="Password"
                            handleChange={this.handleChange}
                            />

                            <Button>LOGIN</Button>
                            
                            <div className='social-signin'>
                                <div className='row'>
                                    <Button onClick={signInWithGoogle}>
                                        Sign in with Google
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
    
                </div>
    
            </div>
        )

    }
}

export default SignIn