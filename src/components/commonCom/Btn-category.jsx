import React from 'react'

import { useState } from 'react'

const BtnCategory = ({title, onClick, style}) => {
 
  return (
    <button
      onClick={onClick}
      className={style}
    >
      {title}
    </button>
  )
} 

export default BtnCategory
