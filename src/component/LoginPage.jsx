import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Error from './Error'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const trackEmail = (e) => {
    setEmail(e.target.value)
  }

  const trackPassword = (e) => {
    setPassword(e.target.value)
  }

  const requestInfo = {
    url: 'https://message-app-g2py.onrender.com/api/v1/users/login',
    method: 'POST',
    data: {
      email,
      password,
    },
    headers: {
      'Content-type': 'Application/json',
      withCredentials: true,
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email.trim().length === 0 || password.trim().length === 0) {
      setError({
        title: ' Invalid input',
        message: 'Please enter a valid email & password (non-empty values)',
      })
      return
    }

    axios(requestInfo)
      .then((response) => {
        const name = response.data.data.user.name
        let token = response.data.token
        localStorage.setItem('SavedToken', token)
        localStorage.setItem('userName', name)
        toast.success(`login succssfully`)
        setTimeout(() => {
          navigate('/Dashboard')
        }, 2000)
      })
      .catch((e) => {
        setError(true)
      })
  }

  return (
    <>
      <ToastContainer />
      {error ? (
        <Error
          message={
            'Oops, Wrong Email or Password. Please try refreshing the page again or login again'
          }
        />
      ) : (
        <div className='login w-1/3 h-max bg-white p-[30px] rounded-sm mt-10 mx-auto mb-2 '>
          <div className='signin'>
            <h1>Login </h1>
            <hr />
            <form onSubmit={handleSubmit}>
              <input
                className='input'
                type='email'
                name='email'
                placeholder='Email'
                onChange={trackEmail}
                required
              />
              <input
                className='input'
                type='password'
                name='password'
                placeholder='Password'
                onChange={trackPassword}
                required
              />
              <button
                className='login-btn outline-none py-2 px-[30px] bg-[#0fa2cc] w-full text-white mt-5 mx-auto mb-0 '
                type='submit'
              >
                login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginPage
