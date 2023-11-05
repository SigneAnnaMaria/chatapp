import React, { useState } from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useChat } from './ChatContext'

const StartScreen = ({ onUsernameSubmit }) => {
  const [typedName, setTypedName] = useState('')
  const ctx = useChat()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (typedName.trim()) {
      onUsernameSubmit(typedName.trim())
      ctx.socket.emit('join_room', {
        roomId: 'Lobby',
        username: typedName.trim(),
      })
      ctx.setUsername(typedName.trim())
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4">Enter your username</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="custom-button" type="submit">
              Start Chatting
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default StartScreen
