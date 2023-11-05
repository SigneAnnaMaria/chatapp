import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChat } from './ChatContext'

const MessageWindow = () => {
  const ctx = useChat()

  return (
    <ListGroup className="message-window">
      {ctx.messages[ctx.currentRoom]?.map((msg, index) => (
        <div
          key={index}
          className={
            msg.username === ctx.username
              ? 'my-message-container'
              : 'other-message-container'
          }
        >
          {msg.username !== ctx.username && (
            <span className="message-sender">{msg.username}</span>
          )}
          <ListGroup.Item
            className={
              msg.username === ctx.username ? 'my-message' : 'other-message'
            }
          >
            {msg.text}
          </ListGroup.Item>
        </div>
      ))}
    </ListGroup>
  )
}

export default MessageWindow
