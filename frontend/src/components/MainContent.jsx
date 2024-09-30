import { Skeleton, SkeletonText } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom';

const MainContent = () => {
    return (
        <div className='min-h-screen w-full lg:w-4/5 p-3 flex flex-col lg:flex-row gap-3 '>



            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='lg:h-60 h-48 w-full lg:w-72  sm:w-full    ' >
                    <Link to={'/recipe/chicken'} className='h-full w-full flex lg:flex-col gap-2 p-2'>
                    
                <Skeleton className='h-full lg:w-full w-2/3 md:w-1/2' isLoaded={true}>
                    <div className=' w-full h-full'>
                        <img src="Men jacket.avif" alt="jacket" className='w-full h-full' />

                    </div>
                </Skeleton>

                <SkeletonText
                className='h-full pl-5 '
                isLoaded={true}
                
                >
                    <div className='p-3 h-full w-full'>
                        <h2 className='text-xl font-bold text-center'>Men Jacket</h2>
                    </div>
                </SkeletonText>
                </Link>
            </motion.div>
      



        </div>
    )
}

export default MainContent
