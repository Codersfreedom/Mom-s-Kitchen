import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
} from '@chakra-ui/react'
import { Bookmark, Menu, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header = () => {

    const btnRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div className='w-full relative h-20 bg-yellow-400 flex justify-between px-4 '>
            <div className=' h-full w-36 p-5 pl-6 '>
                <Link to={'/'} className='text-xl  font-bold'>Let's Cook </Link>
            </div>

            <div className='flex gap-4 justify-center items-center'>

                <Search className='cursor-pointer hover:scale-125 duration-300 ease-in-out ' />
                <Bookmark className='cursor-pointer hover:scale-125 duration-300 ease-in-out ' />
                <User className='cursor-pointer hover:scale-125 duration-300 ease-in-out ' />
            </div>

            <Menu ref={btnRef} onClick={onOpen} className=' lg:hidden md:hidden absolute left-2 top-5 cursor-pointer' size={30} />
            <>

                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Create your account</DrawerHeader>

                        <DrawerBody>
                            <Input placeholder='Type here...' />
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue'>Save</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>

        </div>
    )
}

export default Header
