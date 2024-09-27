import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/login/Login';

function App() {
  return (
   
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
