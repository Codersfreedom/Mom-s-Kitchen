import { Bird } from 'lucide-react'


const NoContentUI = ({authUser,user}) => {
    return (
        <div className='flex gap-4 py-4 w-full  '>
            <Bird size={'70px'} />
            <div className='flex flex-col gap-3 w-full '>
                <h1 className='text-3xl font-bold'>UH OH!</h1>
                <p>Looks like {authUser?.name || user?.name} has no recipes!</p>
            </div>
        </div>
    )
}

export default NoContentUI
