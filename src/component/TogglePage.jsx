import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

const TogglePage = () => {
  const [index, setIndex] = useState(true);

  const handleToggle = () => {
    setIndex(!index);
  };

  return (
    <div className='displayBackgroung'>
      {index ? (
        <div>
          <LoginPage />
        </div>
      ) : (
        <div>
          <SignUpPage />
        </div>
      )}

      <button className='btn w-full mx-auto' onClick={handleToggle}>
        {index
          ? "New to MailNotification? Join now"
          : "Already have an account? Login here"}{" "}
      </button>
    </div>
  );
};

export default TogglePage;
