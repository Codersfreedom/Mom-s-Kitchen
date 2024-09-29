import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import './App.css'

function App() {


  return (
    <div className='min-h-screen w-screen'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />


      </Routes>
      
    </div>
  )
}

export default App
