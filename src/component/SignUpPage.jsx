import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Error from './Error'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const trackName = (e) => {
    setName(e.target.value)
  }

  const trackEmail = (e) => {
    setEmail(e.target.value)
  }

  const trackPassword = (e) => {
    setPassword(e.target.value)
  }

  const trackpasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const requestInfo = {
    url: 'https://message-app-g2py.onrender.com/api/v1/users/signup',
    method: 'POST',
    data: {
      name,
      email,
      password,
      passwordConfirm,
    },
    headers: {
      'Content-type': 'Application/json',
      withCredentials: true,
    },
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios(requestInfo)
      .then((response) => {
        const name = response.data.data.user.name
        let token = response.data.token
        localStorage.setItem('SavedToken', 'Bearer ' + token)
        localStorage.setItem('userName', name)
        toast.success(`Welcome ${name}, your account was created succssfully`)
        setTimeout(() => {
          navigate('/Dashboard')
        }, 2000)
      })
      .catch((e) => {
        console.log(e)
        setError(true)
      })
  }

  return (
    <>
      <ToastContainer />
      {error ? (
        <Error
          message={
            'Oops, network or server issue. Please try refreshing the page again or login again'
          }
        />
      ) : (
        <div className='w-1/3 h-max p-[30px] rounded-lg mt-10 mx-auto mb-2 bg-white '>
          <h1>Sign Up </h1>
          <p>Please fill in this form to create an account!</p>
          <hr className='mt-2' />
          <form onSubmit={handleSubmit}>
            <label htmlFor='text' style={{ display: 'none' }}></label>

            <input
              className='input'
              type='text'
              placeholder='Name'
              onChange={trackName}
              required
            />

            <input
              className='input'
              type='email'
              placeholder='Email'
              onChange={trackEmail}
              required
            />
            <input
              className='input'
              type='password'
              placeholder='Password'
              onChange={trackPassword}
              minLength={8}
              required
            />
            <input
              className='input'
              type='password'
              placeholder='Confirm Password'
              onChange={trackpasswordConfirm}
              required
            />
            <button
              type='submit'
              className='signUp-btn bg-blue-500 mt-5 text-white py-2 px-[30px] '
            >
              Sign Up
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default SignUpPage
