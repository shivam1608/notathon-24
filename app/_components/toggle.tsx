"use client"

import React, { useState } from 'react'

const Toggle = ({metadata, onClick} : {metadata : Toggle , onClick : Function}) => {


  return (
    <button onClick={()=>onClick()} className={`text-white bg-[#5dbfbf] px-5 py-3 font-semibold rounded-full ${!metadata.value ? "hover:bg-transparent" : "bg-[#397d7d] border-[#397d7d]"} transition-all duration-300 border border-[#5dbfbf] cursor-pointer hover:scale-105 `}>{metadata.name}</button>
  )
}

export default Toggle;