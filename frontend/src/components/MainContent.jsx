import RecipeCard from './RecipeCard';

const MainContent = () => {
    return (
        <div className=' min-h-screen w-full relative  p-3 grid grid-cols-1 lg:grid-cols-5 gap-3 '>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      
        </div>
    )
}

export default MainContent
