import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './pages/Header';
import Home from './pages/Home';
import Buscar from './pages/Buscar';
export default function Rotas() {
 return (
<BrowserRouter>
<Header/>
<Routes>
  <Route path='/' element={<Home/>} />  
  <Route path='/buscar/:s' element={<Buscar/>} />  
</Routes>
</BrowserRouter>
 );
}