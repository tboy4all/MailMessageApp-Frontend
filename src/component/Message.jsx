import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dot from './../assets/image/oval8.svg'

const Message = () => {
  const [data, setData] = useState();
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  //   get messages
  const getData = () => {
    const url = "https://message-app-g2py.onrender.com/api/v1/messages";
    axios
      .get(url)
      .then(res => {
        setData(res.data.data.messages);
      })
      .catch(error => {
        setShowError(true);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {
        <ul className='grid w-2/3 mt-5 gap-3 py-2 px-5 md:mx-auto md:px-10 '>
          <div>
            <p
              className='p-2 cursor-pointer w-fit bg-gray-400 inline rounded-lg'
              onClick={() => {
                handleGoBack();
              }}
            >
              back
            </p>
          </div>
          {data &&
            data.map(({ name, subject, id, isRead }, index) => {
              return (
                <Link
                  key={index}
                  to={`${id}`}
                  className='w-full p-4 rounded-lg flex justify-between items-center bg-gray-300'
                >
                  <div>
                    <h2 className='font-bold'>{name}</h2>
                    <small>{subject}</small>
                  </div>
                  {isRead === false ? <img src={dot} alt="" /> : ''}
                </Link>
              );
            })}
        </ul>
      }
    </>
  );
};

export default Message;
