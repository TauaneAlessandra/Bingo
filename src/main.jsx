import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Import only the Material Web components we actually use (not all.js)
import '@material/web/tabs/tabs.js'
import '@material/web/tabs/secondary-tab.js'
import '@material/web/textfield/outlined-text-field.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
