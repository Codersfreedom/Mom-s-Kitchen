import { useEffect } from 'react';

import RecipeCard from './RecipeCard';
import useEdamamStore from '../../store/useEdamamStore';
import Loader from './Loader';


const MainContent = () => {
    const { getAllRecipes, recipe, isLoading } = useEdamamStore()


    useEffect(() => {
        getAllRecipes("chicken");
    }, [getAllRecipes])



    if (isLoading) return <Loader />


    return (
        <div className="min-h-full w-full relative p-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {recipe.map(({recipe},index) => {

                return <RecipeCard key={index} recipe={recipe} isLoading={isLoading} />
            })}
           


        </div>


    )
}

export default MainContent
