import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import {  ChevronDownIcon, Clock, LogOut } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import useAuthStore from '../../store/useAuthStore';
import { formatDate } from '../lib/utils';
import useUserStore from '../../store/useUserStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import NoContentUI from '../components/NoContentUI';
import useRecipeStore from '../../store/useRecipeStore';

const Profile = ({slug="posts"}) => {

    const [recipes, setRecipes] = useState(null);
    const [option, setOption] = useState(slug);

    const { id } = useParams();


    const { user: authUser, logout } = useAuthStore();
    const { isLoading, getProfile, favorites, fetchFavorites } = useUserStore();
    const { getRecipeByUserId } = useRecipeStore()

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setUser(await getProfile(id));
        }
        fetchProfile()
    }, [id])

    useEffect(() => {
        if (authUser) {

            fetchFavorites()
        }
    }, [])
   
    useEffect(() => {
        const fetchUserRecipes = async () => {

            setRecipes(await getRecipeByUserId(id))
        }
        fetchUserRecipes();
    }, [id])

    console.log(option)
    if (isLoading) return <Loader />

    return (
        <div className='min-h-screen w-full '>
            <div className='w-full h-48 bg-gradient-to-t from-teal-400 to-yellow-200 text-gray-700  ' >
                <div className='float-end lg:pr-10 pr-5 pt-2 flex items-center gap-2 justify-center '>
                    <Clock size={'20px'} /><p>{formatDate(user?.createdAt)}</p>
                    {authUser && <LogOut size={'20px'} className='cursor-pointer' onClick={logout} />}
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
                    <MenuButton className='ml-2' as={Button} rightIcon={<ChevronDownIcon />}

                    >
                        {option.charAt(0).toUpperCase()+option.substring(1)}
                    </MenuButton>
                    <MenuList  >
                        <MenuItem  onClick={() => setOption('posts')}>Posts</MenuItem>
                        {authUser &&
                            <>
                                <MenuItem  onClick={() => setOption('saved')}>Saved</MenuItem>

                            </>
                        }
                    </MenuList>
                </Menu>

                <div className='min-h-full w-full relative py-5 px-2 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' >
                    {!isLoading && authUser && option === 'saved' && favorites.map((favorite) => {
                        return <RecipeCard key={favorite._id} recipe={favorite} isLoading={isLoading} />

                    })}

                    {!isLoading && option==='posts' && recipes && recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} isLoading={isLoading} />
                    ))}


                </div>

                {/* No content UI */}

                {!isLoading && option==='saved' && favorites && favorites?.length == 0 && <NoContentUI  message={`Looks like ${authUser?.name || user?.name}  has no favorites`} />}
                {!isLoading && option==='posts'  && !recipes && <NoContentUI message={`Looks like ${authUser?.name || user?.name}  has no public posts`} />}
                

            </div>

        </div>
    )
}

export default Profile
