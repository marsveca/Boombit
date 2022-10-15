import logo from './logo.svg';
import './App.css';
import { Menu } from './navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dialog-polyfill.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Usuario } from './Usuario';
import { Actividad } from './Actividad';

function App() {
  return (
    <>
      <Menu></Menu>  
      <BrowserRouter>
        <Routes>
          <Route path='/usuarios/' element={ <Usuario></Usuario> }></Route>
          <Route path='/actividades/' element={ <Actividad></Actividad>}></Route>
        </Routes>
      </BrowserRouter>
    </>
    );
}

export default App;
