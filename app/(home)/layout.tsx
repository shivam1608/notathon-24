import React from 'react'
import Navbar from '../_components/navbar';
import { Toaster } from 'react-hot-toast';

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className="flex flex-col container px-5">
        <Toaster />
        <Navbar />
        {children}
    </div>
  )
}

export default layout;