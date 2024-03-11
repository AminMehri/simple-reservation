import { Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView';
import Navbar from './components/Navbar'
import './css/App.css';

function App() {
  return (
    <div className="App mt-0">
      <Navbar/>

      <Routes>
        <Route path='/login' element={<LoginView />} />
        <Route path='/register' element={<RegisterView />} />
      </Routes>
    </div>
  );
}

export default App;
