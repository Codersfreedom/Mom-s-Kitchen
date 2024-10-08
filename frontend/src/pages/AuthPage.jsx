import { useState } from 'react'
import useAuthStore from '../../store/useAuthStore';

const AuthPage = () => {
    const [isSignUp, setSignUp] = useState(false);

    const [authData, setAuthData] = useState({
        email: "",
        name:"",
        password: ""
    })
    const { signup,login } = useAuthStore();

    const handleAuthenticate = () => {
        if (isSignUp) {
            signup(authData);
        }else{
            login(authData)
        }
    }
    return (
        <div className='min-h-screen mx-auto w-full lg:w-1/3 md:w-1/2 flex mt-20 items-center flex-col px-5  '>
            <h1 className='text-3xl font-bold text-center mb-4'>{isSignUp ? 'Create An Account' : 'Login to your account'}</h1>
            {isSignUp && <p className='text-xl text-wrap text-center'>Save recipes across devices,write reviews,and share your own photos</p>}

            <div className='flex flex-col gap-2 w-full px-5 mt-4'>
                <div className='flex flex-col gap-2 '>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='your@gmail.com'
                        className='p-3 rounded-md border-none bg-gray-200'
                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                    />

                </div>
               {isSignUp && <div className='flex flex-col gap-2 '>
                    <label htmlFor="email">Name</label>
                    <input type="text" name="name" id="email" placeholder='rakesh'
                        className='p-3 rounded-md border-none bg-gray-200'
                        onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                    />

                </div>}
                <div className='flex flex-col gap-2 relative '>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='Password'
                        className='p-3 rounded-md border-none bg-gray-200'
                        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                    />
                    <p className='absolute right-3 top-11 cursor-pointer'>show</p>
                </div>

                <div className='mx-auto w-full text-center  mt-10 bg-yellow-400 p-4 rounded-xl'>

                    <button className='text-xl font-semibold  '
                        onClick={handleAuthenticate}
                    >{isSignUp ? 'Create an account' : 'Login'}</button>
                </div>
                <p className='text-center font-semibold'>{isSignUp ? 'Already have an account?' : 'Don\'t have an account?'} <span className='cursor-pointer underline' onClick={() => setSignUp(!isSignUp)}>{isSignUp ? 'Login' : 'Signup'}</span></p>
            </div>

        </div>
    )
}

export default AuthPage
