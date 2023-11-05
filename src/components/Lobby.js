import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Chat from './Chat'
import ChatRooms from './ChatRooms'

function Lobby() {
  return (
    <Container>
      <Row>
        <Col sm={9}>
          <Chat />
        </Col>
        <Col sm={3}>
          <ChatRooms />
        </Col>
      </Row>
    </Container>
  )
}

export default Lobby
