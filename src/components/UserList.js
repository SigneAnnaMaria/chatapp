import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useChat } from './ChatContext'

const UserList = () => {
  const ctx = useChat()

  useEffect(() => {
    const handleUsersList = (userList) => {
      console.log('userList')
      console.log(userList)
      ctx.setUsers(userList)
    }
    ctx.socket.on('users_list', handleUsersList)
    return () => {
      ctx.socket.off('users_list', handleUsersList)
    }
  }, [ctx.socket, ctx.setUsers])

  return (
    <ListGroup className="mb-4">
      <h6>Users</h6>
      {ctx.users.map((user, index) => (
        <ListGroup.Item className="py-1 px-3" key={index}>
          {user}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default UserList
