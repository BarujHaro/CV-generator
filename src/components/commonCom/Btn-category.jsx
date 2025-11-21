import React from 'react'

import { useState } from 'react'

const BtnCategory = ({title, onClick}) => {
 
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {title}
    </button>
  )
} 

export default BtnCategory
