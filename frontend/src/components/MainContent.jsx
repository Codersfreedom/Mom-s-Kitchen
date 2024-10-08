import { useEffect } from 'react';
import useRecipeStore from '../../store/useRecipeStore';
import RecipeCard from './RecipeCard';


const MainContent = () => {
    const { getAllRecipes, recipe, isLoading } = useRecipeStore()
   

    useEffect(() => {
        getAllRecipes();
    }, [getAllRecipes])




    return (
        <div className=' min-h-screen w-full relative p-2  lg:p-10 grid grid-cols-1 grid-rows-5 lg:grid-cols-3 gap-1 '>
            {recipe.map((recipe) => {

                return <RecipeCard key={recipe._id} recipe={recipe} isLoading={isLoading} />
            })}


        </div>
    )
}

export default MainContent
