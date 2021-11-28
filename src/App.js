import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utility'
import { setCurrentUser } from './redux/User/user.actions'
import { useSelector, useDispatch } from 'react-redux'
import { checkUserSession } from './redux/User/user.actions'


// components

import AdminToolbar from './components/AdminToolbar'

// higher order component
import WithAuth from './hoc/WithAuth'
import WithAdminAuth from './hoc/WithAdminAuth'

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
import Admin from './pages/admin'


const App = (props) => {
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(checkUserSession())
    // moved to user.saga
  },[]) //as far as lifecycle is concerned, use effect and dependencies sub in for componentDidMount and the return element subs in for componentWillUnmount. make sure you unmount to prevent data leak
    
    return (
      <div className="App">
        <div className='main'>
            <AdminToolbar />
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

              <Route path='/admin' render={ () => (
                <WithAdminAuth>
                  <MainLayout>
                    <Admin />
                  </MainLayout>
                </WithAdminAuth>
              )} />
  
            </Switch>
            
        </div>
      </div>
    );
  }


export default App;
