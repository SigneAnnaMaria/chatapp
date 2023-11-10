import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Chat from './Chat'
import ChatRooms from './ChatRooms'
import UserList from './UserList'

function MainChatView() {
  return (
    <Container className="mt-5">
      <Row>
        <h2>Chat App</h2>
      </Row>
      <Row className="mt-3">
        <Col sm={2}>
          <UserList style={{ backgroundColor: 'blue' }} />
        </Col>
        <Col sm={7}>
          <Chat />
        </Col>
        <Col sm={3}>
          <ChatRooms />
        </Col>
      </Row>
    </Container>
  )
}

export default MainChatView
