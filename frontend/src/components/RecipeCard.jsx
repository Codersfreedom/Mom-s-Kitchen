import { Skeleton, SkeletonText } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe, isLoading }) => {

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='lg:h-56 max-h-44 w-full lg:w-72  sm:w-full  py-5' >
            <Link to={`/recipe/${recipe?._id}`} className='max-h-full w-full flex lg:flex-col gap-2  lg:overflow-visible overflow-hidden'>

                <Skeleton className='h-full lg:max-h-4/6 lg:w-full w-11/12 md:w-1/2 ' isLoaded={!isLoading}>
                    <div className=' w-full h-full'>
                        <img src={recipe?.image} alt={recipe?.title} className='w-full h-full' />

                    </div>
                </Skeleton>

                <SkeletonText
                    className='h-full w-full  '
                    isLoaded={!isLoading}

                >
                    <div className=' max-h-full flex flex-col flex-1 overflow-hidden  '>
                        <p className='lg:text-xl text-start  font-bold h-fit  w-full text-base'>{recipe?.title}</p>
                        <p className='w-full text-start max-h-[95px]  lg:py-1  text-wrap  '>{recipe?.description.substring(0, 130) + "..."}</p>
                    </div>
                </SkeletonText>
            </Link>
        </motion.div>
    )
}

export default RecipeCard
