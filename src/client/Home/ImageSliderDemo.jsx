
import React from "react";
import { ImagesSlider } from "../ui/ImagesSlider";
import { TypewriterEffect } from "./TypewritterEffect";
import HomeCards from "./HomeCards";
import { AnimatePresence, delay, motion } from "framer-motion";
import { useInView } from 'react-intersection-observer'
import { useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function ImagesSliderDemo() {
  const images = [
    "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661573644696-d670a189244b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1664910133119-688df047c801?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];


  
  const scrollY = useMotionValue(window.scrollY);

  const desktopScale =  useTransform(scrollY, [0, 1200], [1, 0.95]);
  const desktopY =  useTransform(scrollY, [0, 3000], [0, -1000]);


  const [textRef, inView] = useInView({
    triggerOnce: false, // Change this to false if you want the animation to trigger again whenever it comes in view
  });


    useEffect(() => {
    scrollY.set(window.scrollY);
    const onScroll = () => {
      scrollY.set(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    }
    , [scrollY]);



    const welkom= 'Welcome Bij'.split('').map((letter, index) => {
      return (
        <motion.span
          initial={{ y: -100 ,opacity:0}}
          animate={{ y: inView?0:-100 ,opacity:inView ? 1 : 0}}
          transition={{ delay: index * .07 }}
          key={index}
          className="hover:text-gray-400/20 relative z-20 text-4xl"
        >
          {letter}
        </motion.span>
      )
    })

    const Uniq = 'Uniq'.split('').map((letter, index) => {
      return (
        <motion.span
          initial={{ y: -100 ,opacity:0}}
          animate={{ y: 0 ,opacity:inView ? 1 : 0}}
          transition={{ delay: 0.7 }}
          key={index}
          className="hover:text-gray-200/60 relative z-20 text-white textsize"
        >
          {letter}
        </motion.span>
    )})

    const CX = 'CX'.split('').map((letter, index) => {
      return (
        <motion.span
          ref={textRef}
          initial={{ y: -100 ,opacity:0}}
          animate={{ y: 0 ,opacity:inView ? 1 : 0}}
          transition={{ delay: 0.8 }}
          key={index}
          className={`hover-color-change relative z-20 text-7xl `}
        >
          {letter}
        </motion.span>)
    })
  

  return (
    <ImagesSlider className="p md:h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.div ref={textRef} style={{ scale: desktopScale, y: desktopY  }}>
        <motion.div className=" md:tracking-widest font-bold  text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 ">
        {/* <TypewriterEffect /> */}
        <h1 className="md:tracking-[1rem] text-left relative z-10 hover-color-change  font-bold text-gray-300 uniq ">
      {welkom}
      <br />
        </h1>

        <h1 className="text-left">
        {Uniq}
        <span className="text-orange-500">{CX[0]}</span>
        <span className="text-green-700">{CX[1]}</span>
        </h1>


        </motion.div>

        <p className= " !leading-snug tracking-widest font-semibold text-xl md:text-[18px] text-left md:text-center  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4 w-[90vw] m-auto lg:w-[35vw] ">
        Nederlandstalig Contact center in Suriname. Wij zijn gespecialiseerd in het verlenen van klantenservice, technische ondersteuning, verkoop en backoffice diensten.
        </p>

        <div className="pt-8 phone:pb-3 grid phone:w-[95vw] m-auto md:grid-cols-1 gap-2 ">
      <HomeCards />
    </div>

        </motion.div>
      
      </motion.div>
    </ImagesSlider>
  );
}
