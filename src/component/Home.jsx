import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [messageCount, setMessageCount] = useState(0);
  const [message, setMessage] = useState(0);

  const getData = () => {
    const url = "https://message-app-g2py.onrender.com/api/v1/messages";
    axios.get(url).then(res => {
      setMessageCount(res.data.results);
      setMessage(
        res.data.data.messages.filter(item => {
          return item.isRead === false;
        }).length
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='w-full '>
      <main className='flex flex-col items-center justify-center p-5 gap-5 my-[70px] mx-auto  '>
        <h1>Hello, {localStorage.getItem("userName").split(" ")[0]}</h1>
        {messageCount === 0 ? (
          <p>you have no message here</p>
        ) : (
          <p className='text-xl'>
            you have {message} unread meassages out of {messageCount} total
          </p>
        )}
        <Link to='/Dashboard/messages' className='link'>
          Read Messages Now
        </Link>
      </main>
    </div>
  );
};
