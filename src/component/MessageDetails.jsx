import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const MessageDetails = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://message-app-g2py.onrender.com/api/v1/messages/${id}`
        )
        setData(response.data.data.message)
        setLoading(false)
      } catch (error) {
        toast.error('Oops, something went wrong. Please refresh.')
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleGoBack = () => {
    navigate(-1)
  }

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `https://message-app-g2py.onrender.com/api/v1/messages/${id}`,
        { isRead: true }
      )
    } catch (error) {
      toast.error('Oops, something went wrong while marking as read.')
    }
  }

  useEffect(() => {
    if (data) {
      markAsRead(data.id)
    }
  }, [data])

  if (loading) {
    return (
      <div className='flex justify-center items-center text-4xl h-screen'>
        <FaSpinner className='animate-spin mr-2' />
        Loading...
      </div>
    )
  }

  return (
    <>
      <div className='w-fit mt-5 ml-8'>
        <p
          className='p-2 cursor-pointer bg-gray-400 inline rounded-lg'
          onClick={handleGoBack}
        >
          Back
        </p>
      </div>
      {data && (
        <div className='flex flex-col mt-10'>
          <div className='flex justify-between w-2/3 items-center mx-auto px-5'>
            <p className='font-bold'>{data.name}</p>
            <time>Message time: {data.sentDates}</time>
          </div>
          <div className='flex justify-center items-center w-full'>
            <div className='p-5 bg-gray-300 w-2/3 rounded-md grid gap-3'>
              <h2 className='font-[500]'>{data.subject}</h2>
              <p>{data.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MessageDetails
