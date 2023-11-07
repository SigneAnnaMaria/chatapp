import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Chat from './Chat'
import ChatRooms from './ChatRooms'
import UserList from './UserList'

function Lobby() {
  const logOut = (username) => {
    console.log('log out' + username)
  }
  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1>Lobby</h1>
        </Col>
        <Col xs="auto">
          <Button className="custom-button" onClick={logOut}>
            Log out
          </Button>
        </Col>
      </Row>
      <Row>
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

export default Lobby
