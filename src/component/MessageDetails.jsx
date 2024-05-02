import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MessageDetails = () => {
  const [data, setData] = useState();
  const [showError, setShowError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getInfo = () => {
    const url = `https://message-app-g2py.onrender.com/api/v1/messages/${id}`;
    axios
      .get(url)
      .then(res => {
        setData(res.data.data.message);
      })
      .catch(() => {
        setShowError(true);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const markAsRead = id => {
    const url = `https://message-app-g2py.onrender.com/api/v1/messages/${id}`;
    axios
      .put(url, {
        isRead: true,
      })
      .then(res => {
        setData(res.data.data.messages);
      })
      .catch(error => {
        setShowError(true);
      });
  };

  getInfo();

  useEffect(() => {
    markAsRead(id);
  }, []);

  return (
    <>
      {showError ? (
        <p>Oops, something went wrong. please refresh</p>
      ) : (
        <>
          <div className='w-fit'>
            <p
              className='p-2 cursor-pointer bg-gray-400 inline rounded-lg'
              onClick={() => {
                handleGoBack();
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
  );
};

export default MessageDetails;
