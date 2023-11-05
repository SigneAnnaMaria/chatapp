import React, { useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import StartScreen from './components/StartScreen'
import Lobby from './components/Lobby'
import './App.css'
import { useChat } from './components/ChatContext'

const ENDPOINT = 'http://localhost:3001/'

function App() {
  const ctx = useChat()

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT)
    ctx.setSocket(newSocket)

    return () => newSocket.disconnect()
    // eslint-disable-next-line
  }, [])

  const handleUsernameSubmit = (name) => {
    ctx.setUsername(name)
  }

  if (!ctx.username) {
    return <StartScreen onUsernameSubmit={handleUsernameSubmit} />
  }

  return (
    <div className="App">
      <Lobby />
    </div>
  )
}

export default App
