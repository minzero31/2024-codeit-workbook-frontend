import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// 앱 시작 시 토큰 초기화
//localStorage.removeItem('token');

//ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <div className="min-h-screen bg-gray-100">
                <App />
            </div>
        </Router>
    </React.StrictMode>
)