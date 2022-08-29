import React from 'react'
import './Screen.css'

const Screen = ({value}) => {
  return (
    <div className="screen">
        <span>{value}</span>
    </div>
  )
}

export default Screen