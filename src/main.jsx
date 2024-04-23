import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css';
import { DogProvider } from './Provider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <DogProvider>
      <App />
    </DogProvider>
  </React.StrictMode>,
)
