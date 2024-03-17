import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ProfileView from './views/ProfileView';
import HomeView from './views/HomeView';
import Navbar from './components/Navbar';
import './css/App.css';


function App() {
  if(localStorage.getItem('access')){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
  }
  return (
    <div className="App mt-0">
      <Navbar/>

      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/profile' element={<ProfileView />} />
      </Routes>
    </div>
  );
}

export default App;
