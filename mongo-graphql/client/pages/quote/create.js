import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { CREAT_QUOTE } from '../../graphql/mutation'

const create = () => {
    const [formdata, setFormdata] = useState({})
    const router = useRouter()

    if (typeof window !== 'undefined') {
        var authtoken = localStorage.getItem('token')
    }

    const [createQuote, { data, error, loading },] = useMutation(CREAT_QUOTE, {
        context: {
            headers: {
                auth: authtoken
            }
        },
        onCompleted(){
            router.push('/')
        }
    })

    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formdata)
        createQuote({
            variables: {
                quote: formdata
            }
        })
    }

    return (
        <>
            <section className="bg-gray-50 h-screen dark:bg-gray-900">
                <Navbar />
                <div className="flex items-center justify-center px-6 py-12">
                    <div className="w-full mx-32 bg-white rounded-lg shadow">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create your Quote
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Quote name</label>
                                    <textarea type="name" name="name" rows='3' id="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <button type="submit" className="w-2/4 text-black bg-sky-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default create