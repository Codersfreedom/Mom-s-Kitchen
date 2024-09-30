import { Skeleton, SkeletonText } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MainContent = () => {
    return (
        <div className='min-h-screen w-full lg:w-4/5 p-3 flex flex-col lg:flex-row gap-3 '>



            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='lg:h-60 h-48 w-full lg:w-72 flex lg:flex-col sm:w-full gap-2  p-2 ' >
                <Skeleton className='h-full w-full' isLoaded={false}>
                    <div className='lg:w-full w-1/2 h-full'>
                        <img src="Men jacket.avif" alt="jacket" className='w-full h-full' />

                    </div>
                </Skeleton>

                <SkeletonText
                className='h-full '
                isLoaded={false}
                
                >
                    <div className='p-3 h-full'>
                        <h2 className='text-xl font-bold text-center'>Men Jacket</h2>
                    </div>
                </SkeletonText>
            </motion.div>
      



        </div>
    )
}

export default MainContent
