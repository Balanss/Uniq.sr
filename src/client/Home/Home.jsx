import React from 'react'
import Banner from '../banners/Banner'
import { motion } from 'framer-motion'
import { ImagesSliderDemo } from './ImageSliderDemo';
import { HoverBorderGradientGreen } from '../ui/HoverBorderGradientGreen';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export default function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>


<motion.section 
className=' relative z-[2]  '
initial={{width:0,opacity:0}}
 animate={{width:'100%',opacity:1}}
  exit={{x:0,transition:{duration:0.5}}} >
      <ImagesSliderDemo />
  
</motion.section>

<Banner />

<span className="flex items-center md:w-[85vw] m-auto py-10 md:py-20">
  <span className="h-px flex-1 bg-black"></span>
  <Link to='/vacatures' className="shrink-0 px-6"> <HoverBorderGradientGreen/> </Link >
  <span className="h-px flex-1 bg-black"></span>
</span>

    </>
  )
}
