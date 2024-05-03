import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dot from './../assets/image/oval8.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaSpinner } from 'react-icons/fa'

const Message = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  //   get messages
  const getData = () => {
    setLoading(true)
    const url = 'https://message-app-g2py.onrender.com/api/v1/messages'
    axios
      .get(url)
      .then((res) => {
        setData(res.data.data.messages)
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

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <>
      <ToastContainer />
      <ul className='grid w-2/3 mt-5 gap-3 py-2 px-5 md:mx-auto md:px-10'>
        <div>
          <p
            className='p-2 cursor-pointer w-fit bg-gray-400 inline rounded-lg'
            onClick={handleGoBack}
          >
            back
          </p>
        </div>
        {loading ? (
          <li className='w-full p-4 mt-8 rounded-lg flex justify-center items-center text-3xl bg-gray-300 '>
            <FaSpinner className='animate-spin mr-2 ' /> Loading...
          </li>
        ) : (
          data.map(({ name, subject, id, isRead }) => (
            <Link
              key={id}
              to={`${id}`}
              className='w-full p-4 rounded-lg flex justify-between items-center bg-gray-300'
            >
              <div>
                <h2 className='font-bold'>{name}</h2>
                <small>{subject}</small>
              </div>
              {!isRead && <img src={dot} alt='unread message' />}
            </Link>
          ))
        )}
      </ul>
    </>
  )
}

export default Message
