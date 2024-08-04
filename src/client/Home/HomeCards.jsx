import React,{useState,useEffect} from 'react'
import vacature from './Cards'
import { useInView } from 'react-intersection-observer'
import { useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import job from "../assets/icons/job.png"
import time from "../assets/icons/time.png"
import pay from "../assets/icons/pay.png"
import {HoverBorderGradient} from '../ui/HoverBorderGradient'
import { Illustration } from '../ui/GlowingStars'



export default function HomeCards() {

  const [hoverTarget, setHoverTarget] = useState(null);



      const scrollY = useMotionValue(window.scrollY);

      const desktopScale =  useTransform(scrollY, [0, 1800], [1, 0.8]);
      const desktopY =  useTransform(scrollY, [0, 800], [0, 0]);
      const desktopOpacity = useTransform(scrollY, [600, 1000], [1, 0.6]);

      const [textRef, inView] = useInView({
        triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
      });
    

        React.useEffect(() => {
        scrollY.set(window.scrollY);
        const onScroll = () => {
          scrollY.set(window.scrollY);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
        }
        , [scrollY]);

        const vaca = vacature.slice(0, 2)
      
  return (
    <> 
    {vaca.map((vacature, index) => (
        <motion.div 
        style={{opacity: desktopOpacity, scale: desktopScale}}
        ref={textRef}
        custom={index}
        onMouseEnter={() => setHoverTarget(vacature.id)}
        onMouseLeave={() => setHoverTarget(null)}
        // variants={cardVariants} 
        initial={{y:1000}}
        animate={{y:0}}
        transition={{duration: 1.5, delay: index * 0.1, easeIn: 0.5}}
        key={index}
        className={`block rounded-lg phone:p-2 p-4 shadow-sm  shadow-indigo-100 bg-[#1f2937]/20 space-x-4 glass text-gray-300 ${vacature.id === hoverTarget && 'glass2 text-gray-800'} `}
      >
      
        <section>
  
            <div className=" text-xs grid phone:flex phone:mb-4 md:grid-cols-1 2xl:grid-cols-1 items-center gap-4">        
                <dd className="text-sm flex gap-2">    <img src={job} alt="job" className="w-6 h-6" /> {vacature.title}</dd>
                {/* <dd className="text-sm flex gap-2"> <img src={time} alt='time' className='size-6'/> {vacature.workingHours}</dd> */}
                <dd  className="text-sm inline-flex gap-2"> <img src={pay} alt='pay' className='size-6'/> {vacature.pay}</dd>
                {/* <dd className="text-s flex gap-2 "> <span className='rounded-full w-[1rem] h-[1rem] bg-green-600' /> {vacature.status}</dd> */}
                
                <Link to={'/vacatures'}>
  <HoverBorderGradient />
</Link>

            </div>
   
          
        </section>

      
          
        </motion.div>
      ))}


</>  )
}
