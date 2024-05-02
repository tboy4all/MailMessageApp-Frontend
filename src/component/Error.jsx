import React from "react";

const Error = ({ message }) => {
  const style = {
    backgroundColor: "#c22929",
    color: "white",
    width: "600px",
    padding: "20px",
    margin: "10px auto",
    textAlign: "center",
    borderRadius: "20px",
    fontSize: "18px",
    lineHeight: "1.5",
  };

  return (
    <div style={style}>
      <h2 style={{ color: "white" }}>Error</h2>
      <p>{message}</p>
      <hr />
      <br />
    </div>
  );
};

export default Error;
