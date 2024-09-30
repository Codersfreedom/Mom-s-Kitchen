import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter,BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
