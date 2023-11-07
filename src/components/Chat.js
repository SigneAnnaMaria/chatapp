import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

import MessageWindow from './MessageWindow'
import { useChat } from './ChatContext'

const Chat = () => {
  const ctx = useChat()
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    console.log('received message; ctx.visitedRooms', ctx.visitedRooms)
    const handleReceiveMessage = (messageContent) => {
      if (ctx.visitedRooms.has(messageContent.room)) {
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
  }, [ctx.socket, ctx.visitedRooms])

  const sendMessage = () => {
    console.log('currentRoom')
    console.log(ctx.currentRoom)
    console.log('username')
    console.log(ctx.username)
    console.log('messages')
    console.log(ctx.messages)
    console.log('inputMessage')
    console.log(inputMessage)
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
        <Button className="custom-button" type="submit" onClick={sendMessage}>
          Send
        </Button>
      </Form>
    </div>
  )
}

export default Chat
