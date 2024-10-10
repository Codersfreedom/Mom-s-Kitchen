import { useEffect } from 'react';

import RecipeCard from './RecipeCard';
import useEdamamStore from '../../store/useEdamamStore';
import Loader from './Loader';
import NoContentUI from './NoContentUI';


const MainContent = () => {
    const {recipe, getAllRecipes,  isLoading } = useEdamamStore()


    useEffect(() => {
        if (recipe.length === 0) {
            getAllRecipes("chicken");

        }
    }, [getAllRecipes])



    if (isLoading) return <Loader />


    return (
        <div className="min-h-full w-full relative p-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {recipe.length !== 0 && recipe.map(({ recipe }, index) => {

                return <RecipeCard key={index} recipe={recipe} isLoading={isLoading} />
            })}

            {!isLoading && recipe.length === 0 &&

                <NoContentUI message={"Looks like there's no recipe available for right now"} />
            }



        </div>


    )
}

export default MainContent
