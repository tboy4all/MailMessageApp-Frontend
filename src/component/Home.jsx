import axios from 'axios'
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaSpinner } from 'react-icons/fa'

export const Home = () => {
  const [messageCount, setMessageCount] = useState(0)
  const [message, setMessage] = useState(0)
  const [loading, setLoading] = useState(false)

  const getData = () => {
    setLoading(true)
    const url = 'https://message-app-g2py.onrender.com/api/v1/messages'
    axios
      .get(url)
      .then((res) => {
        setMessageCount(res.data.results)
        setMessage(res.data.data.messages.filter((item) => !item.isRead).length)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        toast.error('Failed to fetch messages. Please try again later.')
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='w-full'>
      <ToastContainer />
      <main className='flex flex-col items-center justify-center p-5 gap-5 my-[70px] mx-auto'>
        <h1>Hello, {localStorage.getItem('userName').split(' ')[0]}</h1>
        {messageCount === 0 ? (
          <p>You have no messages here.</p>
        ) : (
          <p className='text-xl'>
            You have {message} unread messages out of {messageCount} total.
          </p>
        )}
        <Link to='/Dashboard/messages' className='link'>
          {loading ? (
            <span className='flex items-center'>
              <FaSpinner className='animate-spin mr-2' /> Loading...
            </span>
          ) : (
            'Read Messages Now'
          )}
        </Link>
      </main>
    </div>
  )
}
