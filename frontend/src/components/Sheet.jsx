import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

const Sheet = forwardRef(({ btnRef, isOpen, onClose }) => {
    return (
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
                    <DrawerHeader>Let's cook</DrawerHeader>

                    <DrawerBody>
                       
                        <div className=' mt-7'>
                            <ul className='list-none text-xl font-semibold flex flex-col gap-4'>

                           
                            <li>
                                <Link to={'/'}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={'/favorites'}>
                                    Favorites

                                </Link>

                            </li>
                            <li><Link to={'/post'}>Post Recipe </Link></li>
                            <li>
                                <Link to={'/profile'}>

                                    Profile
                                </Link>
                            </li>
                            <li>About</li>
                            </ul>
                        </div>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    )
})

export default Sheet
