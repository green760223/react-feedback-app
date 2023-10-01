import React from "react"
import spinner from "../assests/spinner.gif"

function Spinner() {
  return (
    <img
      src={spinner}
      alt='Loding...'
      style={{ width: "100px", margin: "auto", display: "block" }}
    />
  )
}

export default Spinner
