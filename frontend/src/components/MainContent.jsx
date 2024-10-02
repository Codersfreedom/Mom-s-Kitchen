import { useEffect } from 'react';
import useRecipeStore from '../../store/useRecipeStore';
import RecipeCard from './RecipeCard';

const MainContent = () => {
    const { getAllRecipes,recipe,isLoading } = useRecipeStore()

    useEffect(() => {
        getAllRecipes();
    }, [getAllRecipes])

    if(isLoading) return;
console.log(recipe)
    return (
        <div className=' min-h-screen w-full relative  p-3 grid grid-cols-1 lg:grid-cols-5 gap-3 '>
            {recipe.map((recipe)=>{
                
               return <RecipeCard key={recipe._id} recipe={recipe} />
            })}
           

        </div>
    )
}

export default MainContent
