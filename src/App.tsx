import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './scss/app.scss'
import Header from './components/Header'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Cart from './Pages/Cart/Cart'
import PizzaInfo from './Pages/PizzaInfo'


function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/pizza/:id' element={<PizzaInfo />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
