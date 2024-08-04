import React from 'react'
import {useState} from 'react'
import Ui from './Ui'
import { useEffect } from 'react'

export default function Vacatures() {

  const [filter, setFilter] = useState([])
  const [inputFilter, setInputFilter] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <section className='vaca'>

   
    <div className='min-h-screen md:w-[85vw] m-auto py-10  text-sm'>
        <section className='grid md:grid-cols-2 justify-center items-start p-10'>
            <div className='bg-gray-200 md:w-[30vw]  p-8 text-left border-gray-400/20 border-2'>
                <div className='pb-12'>
                    <p className='text-3xl'><strong>Filter</strong></p>
                    <input type="text" placeholder='Zoek op vacature' className='w-full p-2 mt-4 border-gray-400/20 border-2' onChange={(e)=> setInputFilter(e.target.value)}/>
                    </div>  
                    <div className='flex flex-col gap-4 justify-center'>
                        <label className='flex gap-3'>
                          Frontend Developer
                          <input
                            type="checkbox"
                            onClick={() => setFilter((prevFilters) => {
                              if (prevFilters.includes('frontend developer')) {
                                return prevFilters.filter(filter => filter !== 'frontend developer');
                              } else {
                                return [...prevFilters, 'frontend developer'];
                              }
                            })}
                          />
                        </label>
                        <label className='flex gap-3'>
                          Backend Developer
                          <input
                            type="checkbox"
                            onClick={() => setFilter((prevFilters) => {
                              if (prevFilters.includes('backend developer')) {
                                return prevFilters.filter(filter => filter !== 'backend developer');
                              } else {
                                return [...prevFilters, 'backend developer'];
                              }
                            })}
                          />
                        </label>
                       
                        </div>             
            </div>

            <div>
   <div className='flex-1'>
    <Ui filter={filter} inputFilter={inputFilter}/>
   
   </div>
            </div>
        </section>
    </div> 
    </section>
  )
}
