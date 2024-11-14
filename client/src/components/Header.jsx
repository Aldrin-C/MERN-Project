import React from 'react'
import {Link} from "react-router-dom"

const Header = (props) => {
  return (
    <div>
        <h1 className="text-5xl font-bold text-center text-blue-400 font" style={{fontFamily: "cursive"}}>{props.newHeader}</h1> 
    </div>
  )
}

export default Header