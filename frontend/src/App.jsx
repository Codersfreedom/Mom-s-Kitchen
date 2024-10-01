import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import Recipe from './pages/Recipe'
import Profile from './pages/Profile'
import PostRecipeForm from './pages/PostRecipeForm'

function App() {


  return (
    <div className='min-h-screen w-screen'>
        <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/post' element={<PostRecipeForm />} />
        <Route path='/recipe/:name' element={<Recipe />} />

      </Routes>
      <Footer />
      
    </div>
  )
}

export default App
