import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { useMotionValue, useTransform } from 'framer-motion'


export default function AboutHeader() {


  const [textRef, inView] = useInView({
    triggerOnce: false, // Change this to false if you want the animation to trigger again whenever it comes in view
    });

    const animatedText = 'Compact yet powerful Webflow agency'.split('').map((letter, index) => {
        return (
          <motion.span
            initial={{ y: -100 ,opacity:0}}
            animate={{ y: 0 ,opacity:inView ? 1 : 0}}
            transition={{ delay: index * 0.02 }}
            key={index}
            className='hover-color-change relative z-20 text-4xl'
          >
            {letter}
          </motion.span>
        )
      })


      const scrollY = useMotionValue(window.scrollY);

      const scale = useTransform(scrollY, [0, 800], [1, 0.9]);
      const opacity = useTransform(scrollY, [0, 800], [1, 0.9]);
      

      

        React.useEffect(() => {
        scrollY.set(window.scrollY);
        const onScroll = () => {
            scrollY.set(window.scrollY);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
        }
        , [scrollY]);



  return (
    <motion.section ref={textRef}
        style={{ scale, opacity }}
    className="w-[85vw] pt-10 m-auto bg-black-- shadow-md bg-gray-200 text-gray-700 rounded-lg relative  py-4">
      {/* <div className='aboutgr w-[12.5vw] h-full absolute top-2 z opacity-20 blur-lg px-20  phone:hidden'/>
      <div className='aboutgr2 w-[25vw] h-full absolute top-2 z opacity-20 blur-lg px-20 phone:hidden'/>
      <div className='aboutgr3 w-full h-full absolute top-2 z opacity-40 blur-lg px-20'/> */}

        <div className="grid md:grid-cols-[40%,60%] bg-clip-text justify-between text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
        <div className="max-w-[50rem]  font-normal px-4  text-left  ">
         <motion.p className='text-gray-800'>{animatedText}</motion.p>
         </div>

          <div className="text-left mt-20 mr-0 px-4">
          <h1 className="text-3xl mt-10 font-bold text-gray-700">Over Ons</h1>
          <p className="leading-loose text-sm tracking-widest mt-5  text-gray-700">Bij UniqCX bieden we topklasse klantenservice vanuit Paramaribo, Suriname, met een focus op persoonlijke en innovatieve oplossingen. Ons toegewijde team zorgt ervoor dat elke klantinteractie efficiënt en effectief verloopt, zodat uw bedrijf kan groeien en bloeien.</p>
          </div>

        </div>
      </motion.section>
  )
}
