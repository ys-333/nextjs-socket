import React from 'react'
interface ConnectionStateProps {
  isConnected: string
}
export function ConnectionState({ isConnected }: ConnectionStateProps) {
  return <p>State: {'' + isConnected}</p>
}
