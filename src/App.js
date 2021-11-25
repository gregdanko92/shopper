import { Switch, Route } from 'react-router-dom'
// layouts
import MainLayout from './layouts/MainLayout';
import HomePageLayout from './layouts/HomePageLayout';

import './default.scss'
// pages
import HomePage from './pages/homepage';
import Registration from './pages/registration';

function App() {
  return (
    <div className="App">
      <div className='main'>
          <Switch>

            <Route exact path='/' render={() => (
              <HomePageLayout>
                <HomePage/>
              </HomePageLayout> 
              )} />

            <Route path='/registration' render={() => (
              <MainLayout>
                <Registration/>
              </MainLayout> 
              )} />

          </Switch>
          
      </div>
    </div>
  );
}

export default App;
