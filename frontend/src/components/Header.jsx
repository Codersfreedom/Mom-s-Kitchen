import React from 'react'
import { Bookmark, Menu, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='w-full relative h-20 bg-yellow-400 flex justify-between px-4 '>
            <div className=' h-full w-36 p-5 pl-6 '>
                <Link to={'/'} className='text-xl  font-bold'>Let's Cook </Link>
            </div>

            <div className='flex gap-4 justify-center items-center'>

                <Search className='cursor-pointer hover:scale-125 duration-300 ease-in-out ' />
                <Bookmark className='cursor-pointer hover:scale-125 duration-300 ease-in-out '/>
                <User className='cursor-pointer hover:scale-125 duration-300 ease-in-out ' />
            </div>

            <Menu className=' lg:hidden md:hidden absolute left-2 top-5 cursor-pointer' size={30} />


        </div>
    )
}

export default Header
