import React from 'react'
import { motion } from 'framer-motion'


export default function Cookies({cookies,setCookies}) {

    const a = 'UniqCX gebruikt functionele en analytische cookies. Deze cookies zorgen ervoor dat de website naar behoren werkt en dat bijvoorbeeld jouw voorkeursinstellingen onthouden worden. Deze cookies worden ook gebruikt om de website goed te laten werken en deze te kunnen optimaliseren. Bij jouw eerste bezoek aan onze website hebben wij je al geïnformeerd over deze cookies en hebben we je toestemming gevraagd voor het plaatsen ervan. Je kunt je afmelden voor cookies door je internetbrowser zo in te stellen dat deze geen cookies meer opslaat. Daarnaast kun je ook alle informatie die eerder is opgeslagen via de instellingen van je browser verwijderen.'

  return (
    <>
    {cookies && (
        <motion.div 
        initial={{y: '100%'}}
        animate={{y: 0}}
        transition={{duration: 0.5}}
        className='fixed bottom-0 left-0 z-[10000] w-screen  phone:overflow-auto text-white'>
            <div className='absolute bg-gray-200 w-screen h-screen'/>
           <section className='relative px-10 mt-5  text-left  text-black flex  flex-col gap-4 items-start justify-center '> 
           <button className=' top-5 left-5 bg-red-700 text-white' onClick={()=> setCookies(false)}>X</button>
           <p className='!text-[16px] leading-[20px]'>{a}</p>
           <div className='flex mx-auto pb-4 gap-4'>
           <button className='text-white' onClick={() => {localStorage.setItem('cookies',true); setCookies(false)}}>Accept</button>
           <button className='text-white' onClick={() => {localStorage.setItem('cookies',false); setCookies(false)}}>Decline</button>
           </div>
       
           </section>
           <div>

           </div>
          
        </motion.div>
    )}
    </>
  )
}
