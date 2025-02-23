import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CoinProvider from './Context/CoinContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CoinProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </CoinProvider>
  </React.StrictMode>,
)
