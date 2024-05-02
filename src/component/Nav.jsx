import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className='flex justify-between items-center  py-2 px-5 w-full md:px-10 bg-[#949697] '>
      <div className='rounded-full w-15 block h-15 text-center bg-gray-500 p-3 text-white text-sm align-middle '>
        Logo
      </div>

      <div className='flex items-center justify-between gap-2 text-center '>
        <span className=' rounded-full bg-gray-500 px-2 py-1 w-10 h-10 text-xl text-white font-semi-bold text-center'>
          {localStorage.getItem("userName").slice(" ")[0]}
        </span>
        <span
          className='cursor-pointer hover:bg-blue-500 hover:text-white p-1'
          onClick={logOut}
        >
          Logout
        </span>
      </div>
    </nav>
  );
};

export default Nav;
