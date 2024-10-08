import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

const Sheet = ({ btnRef, isOpen, onClose }) => {
    const { user } = useAuthStore();

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
                                {user &&
                                    <>


                                        <li>
                                            <Link to={`/profile/${user?._id}`}>
                                                Favorites

                                            </Link>

                                        </li>
                                        <li><Link to={'/post'}>Post Recipe </Link></li>
                                        <li>
                                            <Link to={`/profile${user?._id}`}>

                                                Profile
                                            </Link>
                                        </li>
                                    </>}

                            </ul>
                        </div>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Sheet
