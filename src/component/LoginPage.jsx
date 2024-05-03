import axios from 'axios'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Error from './Error'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const trackEmail = (e) => {
    setEmail(e.target.value)
  }

  const trackPassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        'https://message-app-g2py.onrender.com/api/v1/users/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
          },
          method: 'POST',
        }
      )

      const { name } = response.data.data.user
      const token = response.data.token
      localStorage.setItem('SavedToken', token)
      localStorage.setItem('userName', name)
      toast.success('Login successful')
      setTimeout(() => {
        navigate('/Dashboard')
      }, 2000)
    } catch (error) {
      toast.error('Oops, Wrong Email or Password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
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
              value={email}
              onChange={trackEmail}
              required
            />
            <input
              className='input'
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={trackPassword}
              required
            />
            <button
              className='login-btn outline-none py-2 px-[30px] bg-[#0fa2cc] w-full text-white mt-5 mx-auto mb-0 '
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <div className='flex items-center'>
                  <FaSpinner className='animate-spin mr-2' />
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
