import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utility'
import { setCurrentUser } from './redux/User/user.actions'
import { connect } from 'react-redux'
// higher order component
import WithAuth from './hoc/WithAuth'
// layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';

import './default.scss'
// pages
import HomePage from './pages/homepage';
import Registration from './pages/registration';
import Login from './pages/Login'
import Recovery from './pages/recovery';
import Dashboard from './pages/Dashboard'


const App = (props) => {

  const { currentUser, setCurrentUser } = props
  useEffect(()=>{

    const authListener = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })

    return () => {
      authListener()
    }
  },[]) //as far as lifecycle is concerned, use effect and dependencies sub in for componentDidMount and the return element subs in for componentWillUnmount. make sure you unmount to prevent data leak
    
    return (
      <div className="App">
        <div className='main'>
            <Switch>
  
              <Route exact path='/' render={() => (
                <HomePageLayout >
                  <HomePage/>
                </HomePageLayout> 
                )} />
  
              <Route path='/registration' render={() =>  (
                <MainLayout >
                  <Registration/>
                </MainLayout> 
                )} />
  
              <Route path='/login' 
              render={() => (
                <MainLayout >
                  <Login/>
                </MainLayout> 
                )} />

              <Route path='/recovery' render={ () => (
                  <MainLayout>
                    <Recovery />
                  </MainLayout>
              )} />

              <Route path='/dashboard' render={ () => (
                <WithAuth>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </WithAuth>
              )} />
  
            </Switch>
            
        </div>
      </div>
    );
  }


const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
