import { Bookmark, Menu, Search, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input, useDisclosure } from '@chakra-ui/react';
import Sheet from './Sheet';
import { useRef, useState } from 'react';


const Header = () => {
    const [isSearch, setIsSearch] = useState(false);

    const btnRef = useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSearch = (e) => {
        e.preventDefault();
        if (!isSearch) {
            setIsSearch(true);
        }

    }

    return (
        <div className='w-full relative h-20 bg-yellow-400 flex justify-between px-4 '>
            {!isSearch && <div className=' h-full w-fit text-nowrap flex  items-center pl-6 '>
                <Link to={'/'} className='text-xl font-bold'>Mom's Kitchen </Link>
            </div>}

            {isSearch && <div className='relative w-4/5 h-full pl-10 pr-2  flex items-center'>
                <input placeholder='Type here...' className='px-3 py-2 rounded-sm w-full ' />
                <X className='absolute right-3 cursor-pointer' onClick={() => setIsSearch(false)} />
            </div>}

            <div className='w-2/5 h-full hidden lg:block px-4'>
                <ul className=' w-full h-full list-none flex justify-center items-center gap-10 text-xl font-semibold    '>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out '>Recipes</li>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out '>Popular</li>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out ' >Healthy</li>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out '>Holidays</li>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out '>Seasonal</li>
                </ul>


            </div>

            <div className='flex h-full pr-4 gap-4 justify-center items-center'>

                <Search className='cursor-pointer hover:scale-110 duration-300 ease-in-out '
                    onClick={handleSearch}
                />
                <Bookmark className='cursor-pointer hover:scale-110 duration-300 ease-in-out ' />
                <Link to={'/profile/rakesh762'}> <User className='cursor-pointer hover:scale-110 duration-300 ease-in-out ' /></Link>
            </div>

            <Menu ref={btnRef} onClick={onOpen} className=' lg:hidden md:hidden absolute left-2 top-[26px] cursor-pointer' size={30} />

            <Sheet btnRef={btnRef} isOpen={isOpen} onClose={onClose} />

        </div>
    )
}

export default Header
