import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Spinner from './Spinner'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)

  const trackName = (e) => {
    setName(e.target.value)
  }

  const trackEmail = (e) => {
    setEmail(e.target.value)
  }

  const trackPassword = (e) => {
    setPassword(e.target.value)
  }

  const trackPasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        'https://message-app-g2py.onrender.com/api/v1/users/signup',
        {
          name,
          email,
          password,
          passwordConfirm,
        }
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     withCredentials: true,
        //   },
        //   method: 'POST',
        // }
      )

      const { name: userName, token } = response.data.data.user
      localStorage.setItem('SavedToken', `Bearer ${token}`)
      localStorage.setItem('userName', userName)
      toast.success(
        `Welcome ${userName}, your account was created successfully`
      )
      setTimeout(() => {
        navigate('/Dashboard')
      }, 2000)
    } catch (error) {
      console.error(error)
      toast.error(
        'Oops, network or server issue. Please try refreshing the page or login again.'
      )
    }

    setLoading(false)
  }

  return (
    <>
      <ToastContainer />
      <div className='w-1/3 h-max p-[30px] rounded-lg mt-10 mx-auto mb-2 bg-white '>
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account!</p>
        <hr className='mt-2' />
        <form onSubmit={handleSubmit}>
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
            onChange={trackPasswordConfirm}
            required
          />

          <button
            type='submit'
            className='signUp-btn bg-blue-500 mt-5 text-white py-2 px-[30px] '
            disabled={loading}
          >
            {loading ? 'Signing...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </>
  )
}

export default SignUpPage
