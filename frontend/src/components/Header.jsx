import { Bookmark, LogIn, Menu, Search, SunDim, SunMoon, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input, useColorMode, useDisclosure } from '@chakra-ui/react';
import Sheet from './Sheet';
import { useRef, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import useEdamamStore from '../../store/useEdamamStore';


const Header = () => {
    const [isSearch, setIsSearch] = useState(false);
    const [input, setInput] = useState('');

    const { user } = useAuthStore()
    const { getAllRecipes, isLoading } = useEdamamStore()

    const btnRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()

    const handleSearch = (e) => {
        e.preventDefault();
        if (!isSearch) {
            setIsSearch(true);
        }
    }



    const handleSearchRecipe = (e) => {
        setInput(e.target.value);
        console.log(e)
        if (e.key === "Enter") {
            if (input === '') {
                toast.error("Please enter some recipe to search")
            } else {
                getAllRecipes(input)
            }

        }
    }



    return (
        <div className='w-full relative h-16 bg-yellow-400 flex justify-between px-4 text-gray-700'>
            {!isSearch && <div className=' h-full w-fit text-nowrap flex  items-center pl-6 '>
                <Link to={'/'} className='text-xl font-bold '>Mom's Kitchen </Link>
            </div>}

            {isSearch && <div className='relative w-11/12 h-full pl-10 pr-2   flex items-center'>
                <Input isDisabled={isLoading} defaultValue={input} variant={'filled'} bg={'dark'}  placeholder='Type here...' className=' px-3 py-2 rounded-sm w-full ' onKeyUp={(e)=>handleSearchRecipe(e)} />
                {!isLoading && <X className='absolute right-4 cursor-pointer' onClick={() => setIsSearch(false)} />}
               

                {isLoading && <div role="status" className='absolute right-4'>
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>}

            </div>}

            {!isSearch && <div className='w-3/4 h-full hidden lg:block px-4'>
                <ul className=' w-full h-full list-none flex justify-center items-center gap-10 text-base font-semibold    '>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out '> <Link to={'/posted-recipe'}> Posted Recipes</Link></li>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out '>Popular</li>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out ' >Healthy</li>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out '>Holidays</li>
                    <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out '>Seasonal</li>
                    {user && <li className='cursor-pointer hover:scale-110 duration-300 ease-in-out'> <Link to={'/post'}> Add Recipe</Link> </li>}
                </ul>


            </div>}

            <div className='flex h-full lg:pr-2 gap-4 justify-center items-center'>

                <Search className='cursor-pointer hover:scale-110 duration-300 ease-in-out '
                    onClick={handleSearch}
                />
                {!isSearch &&
                    <>


                        <Bookmark className='cursor-pointer hover:scale-110 duration-300 ease-in-out ' />
                        {user && <Link to={`/profile/${user?._id}`}> <User className='cursor-pointer hover:scale-110 duration-300 ease-in-out ' /></Link>}
                        {!user && <Link className='cursor-pointer hover:scale-110 duration-300 ease-in-out ' to={'/auth'}><LogIn /></Link>}

                        <div onClick={toggleColorMode} className='cursor-pointer hover:scale-110 duration-300 ease-in-out'>
                            {colorMode == "light" ? <SunMoon /> : <SunDim />}
                        </div>

                    </>}


            </div>

            <Menu ref={btnRef} onClick={onOpen} className=' lg:hidden md:hidden absolute left-2 top-[20px] cursor-pointer' size={30} />

            <Sheet btnRef={btnRef} isOpen={isOpen} onClose={onClose} />

        </div>
    )
}

export default Header
