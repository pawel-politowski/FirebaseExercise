import React, { useState, useEffect } from 'react'

import { TextField, Button, List, ListItem, ListItemText } from '@material-ui/core'

import mapObjectToArray from './mapObjectToArray'

const API_URL = 'https://isajfdd14-pp.firebaseio.com/messages/.json'

const Chat = (props) => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])

  const sendMessage = () => {
    const newMessageObject = {
      text: newMessage,
      timestamp: Date.now(),
    }

    return fetch(
      API_URL,
      {
        method: 'POST',
        body: JSON.stringify(newMessageObject)
      }
    )
    .then(() => {
      setNewMessage('')
      
      return getMessages()
    })
  }

  const getMessages = () => {
    return fetch(API_URL)
      .then((response) => response.json())
      .then((messagesObject) => {
        const messagesArray = mapObjectToArray(messagesObject)

        setMessages(messagesArray)
      })
  }

  useEffect(() => {
    getMessages()
  }, [])

  return (
    <div>
      <List>
        {
          messages && messages.map((message) => {
            return (
              <ListItem key={message.key}>
                <ListItemText
                  primary={message.text}
                  secondary={message.timestamp}
                />
              </ListItem>
            )
          })
        }
      </List>
      <TextField
        fullWidth={true}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button
        fullWidth={true}
        onClick={sendMessage}
      >
        SEND
      </Button>
    </div>
  )
}

export default Chat