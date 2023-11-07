import React, { useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { useChat } from './ChatContext'

const ChatRooms = () => {
  const ctx = useChat()

  useEffect(() => {
    ctx.socket.emit('get_rooms_list')
    ctx.socket.on('rooms_list', ctx.setRooms)

    return () => {
      ctx.socket.off('rooms_list', ctx.setRooms)
    }
  }, [ctx.setRooms, ctx.socket])

  const createNewRoom = () => {
    const roomName = prompt('Enter room name:')
    if (roomName) {
      ctx.socket.emit('create_room', roomName)
    }
  }

  const changeRoom = (newRoomId) => {
    if (ctx.currentRoom && ctx.currentRoom !== newRoomId) {
      ctx.socket.emit('leave_room', {
        roomId: ctx.currentRoom,
        username: ctx.username,
      })
    }

    if (ctx.currentRoom !== newRoomId) {
      ctx.setCurrentRoom(newRoomId)

      ctx.setVisitedRooms((prevVisited) => {
        const newVisited = new Set(prevVisited)
        newVisited.add(newRoomId)
        return newVisited
      })

      ctx.setMessages((prevMessages) => ({
        ...prevMessages,
        [newRoomId]: prevMessages[newRoomId] || [],
      }))

      ctx.socket.emit('join_room', {
        roomId: newRoomId,
        username: ctx.username,
      })
    }
  }

  return (
    <div>
      <h4>Rooms</h4>
      <ListGroup>
        {ctx.rooms.map((room, index) => (
          <ListGroup.Item key={index} onClick={() => changeRoom(room)}>
            {room}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button className="custom-button" onClick={createNewRoom}>
        Create Room
      </Button>
    </div>
  )
}

export default ChatRooms
