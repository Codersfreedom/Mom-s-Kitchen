import { Skeleton, SkeletonText } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe, isLoading }) => {
  console.log(recipe)
let uri = encodeURIComponent(recipe?.uri)
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
             >
            <Link to={recipe.uri ? `/fetched-recipe/${uri}`:`/posted-recipe/${recipe?._id}`} >

            <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
      <div className="relative group">
        {isLoading ? (
          <Skeleton height={'12rem'} /> // Skeleton Loader
        ) : (
          <img
            className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            src={recipe?.image}
            alt={recipe?.label}
            
          />
        )}
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-lg font-semibold p-2 text-center transition-opacity duration-300 ease-in-out group-hover:bg-opacity-80">
          {
            isLoading ? <SkeletonText noOfLines={2} /> :<p className=' text-base'> {recipe?.label || recipe?.title}</p>
          }
          
        </div>
      </div>
      
    </div>
            </Link>
        </motion.div>
    )
}

export default RecipeCard
