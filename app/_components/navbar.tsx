import Link from 'next/link';
import React from 'react'
import Logo from './logo';

const Navbar = () => {
  return (
    <div className="flex flex-col p-5">

        <div className="flex justify-between items-center">
            {/* LOGO */}
            <Logo />
            <div className="flex space-x-4">
              <Link className='hover:text-[#5dbfbf]' href={"/"}>Home</Link>
              <Link className='hover:text-[#5dbfbf]' href={"/plan"}>Plan</Link>
              <Link className='hover:text-[#5dbfbf]' href={"/history"}>History</Link>
            </div>
        </div>

    </div>
  )
}

export default Navbar;