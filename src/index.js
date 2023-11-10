import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChatProvider } from './components/ChatContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ChatProvider>
    <App />
  </ChatProvider>
)
