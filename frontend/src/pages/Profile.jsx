import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { Bird, ChevronDownIcon, Clock, LogOut } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import useAuthStore from '../../store/useAuthStore';
import { formatDate } from '../lib/utils';
import useUserStore from '../../store/useUserStore';
import { useEffect } from 'react';

const Profile = () => {
    const { user, logout } = useAuthStore();

    const { isLoading, favorites, fetchFavorites } = useUserStore();

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites])

    return (
        <div className='min-h-screen w-full'>
            <div className='w-full h-48 bg-gradient-to-t from-teal-400 to-yellow-200  ' >
                <div className='float-end lg:pr-10 pr-5 pt-2 flex items-center gap-2 justify-center '>
                    <Clock size={'20px'} /><p>{formatDate(user.createdAt)}</p>
                    <LogOut size={'20px'} className='cursor-pointer' onClick={logout} />
                </div>
                <div className='  flex gap-5 items-center  p-10  '>
                    <div className='flex flex-col items-center'>
                        <Avatar src='/Men jacket.avif' name='' size={'xl'} />
                        <h2 className='font-semibold text-md'>{user?.name}</h2>

                    </div>

                    <div className='flex flex-col gap-2 w-40'>
                        <Button colorScheme='orange' >Followers: {user?.followers.length} </Button>
                        <Button colorScheme='orange'>Following: {user?.following.length} </Button>
                    </div>


                </div>

            </div>

            <div className='w-full h-fit p-4 mx-auto'>
                <Menu>
                    <MenuButton className='ml-2' as={Button} rightIcon={<ChevronDownIcon />}>
                        Favorites
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Saved</MenuItem>
                        <MenuItem>My Posts</MenuItem>
                        <MenuItem>Following</MenuItem>
                        <MenuItem>Followers</MenuItem>
                    </MenuList>
                </Menu>

                <div className='grid grid-cols-1 gap-2 lg:grid-cols-5  py-3 w-full' >
                    {favorites.map((favorite) => {
                        return <RecipeCard key={favorite._id} recipe={favorite} isLoading={isLoading} />

                    })}



                </div>

                {/* No content UI */}
                {!isLoading && favorites && favorites?.length == 0 && <div className='flex gap-4 py-4 w-full  '>
                    <Bird size={'70px'} />
                    <div className='flex flex-col gap-3 w-full '>
                        <h1 className='text-3xl font-bold'>UH OH!</h1>
                        <p>Looks like rakesh762 has no recipes!</p>
                    </div>
                </div>}


            </div>

        </div>
    )
}

export default Profile
