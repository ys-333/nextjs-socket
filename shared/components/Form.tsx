'use client'
import React, { useRef, useEffect, useState } from 'react'
import { socket } from '../services/socket'

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const messageRef = useRef<HTMLInputElement>(null) // Correctly typed useRef
  const [messages, setMessages] = useState<string[]>([]) // Renamed "message" to "messages" for clarity

  useEffect(() => {
    socket.connect()
    // Function to handle incoming messages from the server
    const handleMessage = (message: string) => {
      setMessages((prevMessages) => [message, ...prevMessages])
    }

    // Subscribe to 'message' event from the server when component mounts
    socket.on('message', handleMessage)

    // Unsubscribe from 'message' event when component unmounts
    return () => {
      socket.off('message', handleMessage)
    }
  }, []) // Empty dependency array ensures this effect runs only once on component mount

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newMessage = messageRef.current?.value.trim()
    if (newMessage) {
      // Emit 'message' event to the server with the new message
      socket.emit('message', newMessage)
      // Clear input field after sending message
      messageRef.current!.value = ''
    }
  }

  return (
    <div>
      <ul>
        {/* Render list of messages */}
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      {/* Form to enter and submit new message */}
      <form onSubmit={sendMessage}>
        <input type="text" placeholder="Enter your message" ref={messageRef} />
        <button type="submit">Send Message</button>
      </form>
    </div>
  )
}

export default Form
