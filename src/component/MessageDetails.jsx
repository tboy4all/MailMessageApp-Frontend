import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const MessageDetails = () => {
  const [data, setData] = useState()
  const [showError, setShowError] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(
          `https://message-app-g2py.onrender.com/api/v1/messages/${id}`
        )
        setData(response.data.data.message)
      } catch (error) {
        setShowError(true)
      }
    }

    getInfo()
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
      setShowError(true)
    }
  }

  useEffect(() => {
    if (data) {
      markAsRead(data.id)
    }
  }, [data])

  return (
    <>
      {showError ? (
        <p>Oops, something went wrong. please refresh</p>
      ) : (
        <>
          <div className='w-fit mt-5 ml-8'>
            <p
              className='p-2 cursor-pointer bg-gray-400 inline rounded-lg'
              onClick={() => {
                handleGoBack()
              }}
            >
              back
            </p>
          </div>
          {data && (
            <div className='flex flex-col mt-10'>
              <div className='flex justify-between w-2/3 items-center mx-auto px-5'>
                <p className='font-bold'>{data.name}</p>
                <time>message time: {data.sentDates}</time>
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
      )}
    </>
  )
}

export default MessageDetails
