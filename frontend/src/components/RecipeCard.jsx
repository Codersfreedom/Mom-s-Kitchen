import { Skeleton, SkeletonText } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'

const RecipeCard = ({recipe}) => {
    
  return (
    <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className='lg:h-56 h-44 w-full lg:w-72  sm:w-full    ' >
        <Link to={`/recipe/${recipe._id}`} className='h-full w-full flex lg:flex-col gap-2 p-2'>
        
    <Skeleton className='h-full lg:w-full w-11/12 md:w-1/2' isLoaded={true}>
        <div className=' w-full h-full'>
            <img src={recipe?.image} alt={recipe?.name} className='w-full h-full' />

        </div>
    </Skeleton>

    <SkeletonText
    className='h-full w-full  '
    isLoaded={true}
    
    >
        <div className=' h-full flex flex-col '>
            <div className='text-xl text-start  font-bold  w-full'>{recipe?.title}</div>
            <div className='w-full text-start text-wrap '>{recipe?.description.substring(0,34)+"..."}</div>
        </div>
    </SkeletonText>
    </Link>
</motion.div>
  )
}

export default RecipeCard
