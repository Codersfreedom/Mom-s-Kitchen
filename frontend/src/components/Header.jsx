import { Bookmark, Menu, Search, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input, useDisclosure } from '@chakra-ui/react';
import Sheet from './Sheet';
import { useRef, useState } from 'react';


const Header = () => {
    const [isSearch, setIsSearch] = useState(false);

    const btnRef = useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSearch =(e)=>{
        e.preventDefault();
        if(!isSearch){
            setIsSearch(true);
        }

    }

    return (
        <div className='w-full relative h-20 bg-yellow-400 flex justify-between px-4 '>
            {!isSearch && <div className=' h-full w-fit p-5 pl-6 '>
                <Link to={'/'} className='text-xl  font-bold'>Mom's Kitchen </Link>
            </div>}

            {isSearch && <div className='relative w-5/6 h-full pl-10 pr-2  flex items-center'>
                <input placeholder='Type here...' className='px-3 py-2 rounded-sm w-full ' />
                <X className='absolute right-3 cursor-pointer' onClick={() => setIsSearch(false)} />
            </div>}

             <div className='flex gap-4 justify-center items-center'>

                <Search className='cursor-pointer hover:scale-125 duration-300 ease-in-out ' 
                onClick={handleSearch}
                />
                <Bookmark className='cursor-pointer hover:scale-125 duration-300 ease-in-out ' />
                <User className='cursor-pointer hover:scale-125 duration-300 ease-in-out ' />
            </div>

            <Menu ref={btnRef} onClick={onOpen} className=' lg:hidden md:hidden absolute left-2 top-5 cursor-pointer' size={30} />

            <Sheet btnRef={btnRef} isOpen={isOpen} onClose={onClose} />

        </div>
    )
}

export default Header
