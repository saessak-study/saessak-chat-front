import React from 'react'

const Register_input = ({ message }) => {
  return (
    <div>
      <div className='register_IDBox'>
        <input className='register_inputForm'></input>
      </div>
      <div className='register_warningMSG'>
        { message }
      </div>
    </div>
  )
}

export default Register_input;