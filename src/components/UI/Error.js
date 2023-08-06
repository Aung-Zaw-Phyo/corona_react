import React from "react";

const Error = (props) => {
  return (
    <>
        { props.error && <div className={`${props.className} p-2 text-center text-[red]`}>{props.error}</div> }
    </>
  );
};

export default Error;
