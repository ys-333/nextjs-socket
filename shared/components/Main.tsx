'use client'
import React, { useState, useEffect } from 'react'
import { socket } from '@/shared/services/socket'
import { ConnectionState } from './Connectionstate'
import { ConnectionManager } from './ConnectionManager'
import { Events } from './Event'
import Form from './Form'

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [fooEvents, setFooEvents] = useState([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value])
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('foo', onFooEvent)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('foo', onFooEvent)
    }
  }, [])

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
    </div>
  )
}
