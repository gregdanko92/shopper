import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utility'
// layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';

import './default.scss'
// pages
import HomePage from './pages/homepage';
import Registration from './pages/registration';
import Login from './pages/Login'
import Recovery from './pages/recovery';

const initialState = {
  currentUser: null
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      ...initialState
    }
  }
  
  authListener = null
  
  componentDidMount() {
  this.authListener = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await handleUserProfile(userAuth)
      userRef.onSnapshot(snapshot => {
        this.setState({
          currentUser: {
            id:snapshot.id,
            ...snapshot.data()
          }
        })
      })
    }
    this.setState({
      ...initialState
    })
      })
    }

  componentWillUnmount() {
    this.authListener()
  }
  
  render(){
    const { currentUser } = this.state
    
    return (
      <div className="App">
        <div className='main'>
            <Switch>
  
              <Route exact path='/' render={() => (
                <HomePageLayout >
                  <HomePage/>
                </HomePageLayout> 
                )} />
  
              <Route path='/registration' render={() => currentUser ? <Redirect to ='/'/> : (
                <MainLayout >
                  <Registration/>
                </MainLayout> 
                )} />
  
              <Route path='/login' 
              render={() => currentUser? <Redirect to='/' /> : (
                <MainLayout >
                  <Login/>
                </MainLayout> 
                )} />

              <Route path='/recovery' render={ () => (
                  <MainLayout>
                    <Recovery />
                  </MainLayout>
              )} />
  
            </Switch>
            
        </div>
      </div>
    );
  }
}

export default App;
