import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import MessageWindow from './MessageWindow'
import { useChat } from './ChatContext'

const Chat = () => {
  const ctx = useChat()
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    const handleReceiveMessage = (messageContent) => {
      ctx.setMessages((prevMessages) => {
        const newMessages = { ...prevMessages }
        if (newMessages[messageContent.room]) {
          newMessages[messageContent.room].push(messageContent)
        } else {
          newMessages[messageContent.room] = [messageContent]
        }
        return newMessages
      })
    }

    ctx.socket.on('receive_message', handleReceiveMessage)

    return () => {
      ctx.socket.off('receive_message', handleReceiveMessage)
    }
    // eslint-disable-next-line
  }, [ctx.socket, ctx.setMessages])

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
          name="message"
          autoComplete="off"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button className="custom-button" onClick={sendMessage} type="submit">
          Send
        </Button>
      </Form>
    </div>
  )
}

export default Chat
