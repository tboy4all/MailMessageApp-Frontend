import { useState } from 'react'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'

const TogglePage = () => {
  const [index, setIndex] = useState(true)

  const handleToggle = () => {
    setIndex(!index)
  }

  return (
    <div className='displayBackgroung'>
      {index ? (
        <div>
          <LoginPage />
        </div>
      ) : (
        <div>
          <SignUpPage />
        </div>
      )}

      <button className='btn w-full mx-auto' onClick={handleToggle}>
        {index ? (
          <span>
            New to MailNotification?{' '}
            <span className='text-blue-500 hover:text-blue-400'>Join now</span>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <span className='text-blue-500 hover:text-blue-400'>
              Login here
            </span>
          </span>
        )}
      </button>
    </div>
  )
}

export default TogglePage
