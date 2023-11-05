import { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const useChat = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return ctx
}

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [username, setUsername] = useState(null)
  const [currentRoom, setCurrentRoom] = useState('Lobby')
  const [messages, setMessages] = useState({})
  const [rooms, setRooms] = useState([])

  return (
    <ChatContext.Provider
      value={{
        currentRoom,
        setCurrentRoom,
        messages,
        setMessages,
        rooms,
        setRooms,
        socket,
        setSocket,
        username,
        setUsername,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
