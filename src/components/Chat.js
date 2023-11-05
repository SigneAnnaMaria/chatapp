import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import MessageWindow from './MessageWindow'
import { useChat } from './ChatContext'

const Chat = () => {
  const ctx = useChat()
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    const handleReceiveMessage = (messageContent) => {
      console.log('messageContent', messageContent)
      if (messageContent.room === ctx.currentRoom) {
        ctx.setMessages((prevMessages) => {
          const roomMessages = prevMessages[messageContent.room] || []
          return {
            ...prevMessages,
            [messageContent.room]: [...roomMessages, messageContent],
          }
        })
      }
    }

    ctx.socket.on('receive_message', handleReceiveMessage)

    return () => {
      ctx.socket.off('receive_message', handleReceiveMessage)
    }
  }, [ctx.socket])

  const sendMessage = () => {
    if (inputMessage.trim()) {
      ctx.socket.emit('send_message', {
        room: ctx.currentRoom,
        username: ctx.username,
        message: inputMessage.trim(),
      })
      setInputMessage('')
    }
  }

  return (
    <div className="chat-container">
      <div>
        <strong>User: {ctx.username}</strong>
      </div>

      <MessageWindow
        messages={ctx.messages[ctx.currentRoom] || []}
        username={ctx.username}
      />
      <Form className="chat-form" onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button className="custom-button" onClick={sendMessage}>
          Send
        </Button>
      </Form>
    </div>
  )
}

export default Chat
