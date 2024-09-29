import { motion } from 'framer-motion'

const MainContent = () => {
    return (
        <div className='min-h-screen w-full lg:w-4/5 p-3 flex flex-col gap-3 '>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='lg:h-60 h-48 w-full lg:w-72 flex lg:flex-col sm:w-full gap-2  p-2 ' >
                <div className='lg:w-full w-1/2 h-full'>
                    <img src="Men jacket.avif" alt="jacket" className='w-full h-full' />

                </div>
                <div className='p-3'>
                    <h2 className='text-xl font-bold text-center'>Men Jacket</h2>

                </div>
            </motion.div>



        </div>
    )
}

export default MainContent
