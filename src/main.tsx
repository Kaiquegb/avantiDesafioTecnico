import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SearchHistoryProvider } from './context/SearchHistoryContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchHistoryProvider>
      <App />
    </SearchHistoryProvider>
  </React.StrictMode>,
)