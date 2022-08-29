import React from 'react'
import NumericLabel from 'react-pretty-numbers'
import './Screen.css'

const Screen = ({value}) => {

  let params = {
    commafy: true,
  }

  return (
    <div className="screen">
       <span><NumericLabel params={params}>{value}</NumericLabel></span>
    </div>
  )
}

export default Screen