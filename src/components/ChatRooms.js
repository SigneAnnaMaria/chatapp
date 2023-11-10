import React, { useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { useChat } from './ChatContext'

const ChatRooms = () => {
  const ctx = useChat()

  useEffect(() => {
    ctx.socket.emit('get_rooms_list')
    ctx.socket.on('rooms_list', ctx.setRooms)

    const handleDeleteRoom = (deletedRoom) => {
      ctx.setRooms((prevRooms) =>
        prevRooms.filter((room) => room !== deletedRoom)
      )
      ctx.setMessages((prevMessages) => {
        const updatedMessages = { ...prevMessages }
        delete updatedMessages[deletedRoom]
        return updatedMessages
      })
    }
    ctx.socket.on('delete-room', handleDeleteRoom)
    return () => {
      ctx.socket.off('rooms_list', ctx.setRooms)
      ctx.socket.off('delete-room', handleDeleteRoom)
    }
    // eslint-disable-next-line
  }, [ctx.socket, ctx.setRooms, ctx.setMessages])

  const createNewRoom = () => {
    const roomName = prompt('Enter room name:')
    if (roomName) {
      if (ctx.currentRoom) {
        ctx.socket.emit('leave_room', {
          roomId: ctx.currentRoom,
          username: ctx.username,
        })
      }

      ctx.socket.emit('create_room', roomName, (response) => {
        if (response.roomCreated) {
          ctx.setCurrentRoom(response.roomName)
          ctx.socket.emit('join_room', {
            roomId: response.roomName,
            username: ctx.username,
          })
        } else {
          alert('Room could not be created. It might already exist.')
        }
      })
    }
  }

  const changeRoom = (newRoomId) => {
    if (ctx.currentRoom && ctx.currentRoom !== newRoomId) {
      ctx.socket.emit('leave_room', {
        roomId: ctx.currentRoom,
        username: ctx.username,
      })
    }
    ctx.setCurrentRoom(newRoomId)
    ctx.socket.emit('join_room', {
      roomId: newRoomId,
      username: ctx.username,
    })
  }

  return (
    <div>
      <h4>Rooms</h4>
      <ListGroup>
        {ctx.rooms.map((room, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => changeRoom(room)}
            className={ctx.currentRoom === room ? 'current-room' : ''}
          >
            {room}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button className="mt-3 custom-button" onClick={createNewRoom}>
        Create Room
      </Button>
    </div>
  )
}

export default ChatRooms
