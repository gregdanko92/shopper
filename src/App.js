import logo from './logo.svg';
import Header from './components/header'
import './default.scss'
import HomePage from './pages/homepage';
function App() {
  return (
    <div className="App">
        <Header />
      <div className='main'>
        <HomePage />

      </div>
    </div>
  );
}

export default App;
