import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddEditUser from './pages/AddEditUser'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/add' element={<AddEditUser></AddEditUser>}></Route>
          <Route
            path='/update/:id'
            element={<AddEditUser></AddEditUser>}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
