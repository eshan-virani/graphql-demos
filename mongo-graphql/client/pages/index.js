import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_QUOTES } from "../graphql/query"
import Navbar from '../components/Navbar'

const Home = () => {

  // const { data, loading, error } = useQuery(ALL_QUOTES);
  const [data, setData] = useState([])

  //QUERY WITHOUT Apollo client
  useEffect(() => {
    fetch('http://localhost:8085', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
        query{
          quotesdata{
            _id
            by{
              email
              firstName
              lastName
            }
            name
          }
        }
        `
      })
    }).then(res => res.json()).then(data => setData(data.data))
  }, [])
console.log(data)
  return (
    <>
      <Navbar />
      <div className='grid grid-cols-3 gap-4 justify-center items-center mx-32 py-8'>
        {data?.quotesdata?.map((value, i) => {
          return (
            <div className="flex items-center rounded-lg shadow bg-gray-200 h-24" key={i}>
              <div className='relative' >
                <div className="p-3 space-y-4">
                  {value.name}
                  <div className='absolute right-3 bottom-3'>
                    ~{value.by.firstName}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home