import React, { useEffect,useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
    const [token, settoken] = useState('')
    useEffect(() => {
        settoken(localStorage.getItem('token'))
    }, [])
    return (
        <div className="bg-slate-300 h-12 mx-32 shadow-lg rounded-b-3xl font-Kreon">
            <div className="flex p-2 px-14 h-full">
                <ul className='flex gap-20 w-full'>
                    <li className='cursor-pointer hover:scale-110 duration-100'><Link href='/'>Home</Link></li>
                    <li className='cursor-pointer hover:scale-110 duration-100'><Link href='#'>New Quotes</Link></li>
                    <li className='cursor-pointer hover:scale-110 duration-100'><Link href='#'>About</Link></li>
                </ul>
                <div className='flex gap-14 w-full justify-end'>
                    {
                        token ?
                            <>
                                <div className='cursor-pointer hover:scale-110 duration-100'><Link href='/quote/create'>Create Quote</Link></div>
                                <div className='cursor-pointer hover:scale-110 duration-100'>User Profile</div>
                            </>
                            :
                            <>
                                <div className='cursor-pointer hover:scale-110 duration-100'><Link href='/auth/login'>Login</Link></div>
                                <div className='cursor-pointer hover:scale-110 duration-100'><Link href='/auth/signup'>Signup</Link></div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar