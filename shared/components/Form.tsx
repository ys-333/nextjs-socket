'use client'
import React, { useRef } from 'react'
interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const messageRef = useRef<any>('')
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(messageRef.current.value)
    messageRef.current.value = ''
  }
  return (
    <form className="flex flex-col justify-center items-center border-2 border-neutral-800">
      <input
        style={{
          border: '1px solid black',
          padding: '1rem',
          borderRadius: '8px',
        }}
        className="border-2"
        type="text"
        placeholder="Enter your message"
        ref={messageRef}
      />
      <button
        style={{
          border: '1px solid black',
          padding: '1rem',
          borderRadius: '8px',
          marginTop: '1rem',
        }}
        onClick={clickHandler}
      >
        Send Message
      </button>
    </form>
  )
}
export default Form
