import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Footer from './components/Footer'
import Recipe from './pages/Recipe'
import Profile from './pages/Profile'
import PostRecipeForm from './pages/PostRecipeForm'
import useAuthStore from '../store/useAuthStore'
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader'
import './App.css'

function App() {

  const { user, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <Loader />;

  return (
    <div className='min-h-screen w-screen'>

      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to={'/'} />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/post' element={user ? <PostRecipeForm /> : <Navigate to={'/auth'} />} />
        <Route path='/recipe/:id' element={<Recipe />} />

      </Routes>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
