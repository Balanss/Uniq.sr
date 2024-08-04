import React,{useRef} from 'react'
import { Link } from 'react-router-dom'
import { HoverBorderGradientGreen } from '../ui/HoverBorderGradientGreen'
import { AnimatePresence, delay, easeIn, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useMotionValue, useTransform } from 'framer-motion'


export default function AboutFooter() {


  const scrollY = useMotionValue(window.scrollY);

  const scale = useTransform(scrollY, [0, 2000], [0.8, 1]);
  const opacity = useTransform(scrollY, [0, 2000], [0.9, 1]);
  

      
  const [textRef, inView] = useInView({
    triggerOnce: false, // Change this to false if you want the animation to trigger again whenever it comes in view
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


    const animatedText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit'.split('').map((letter, index) => {
      return (
        <motion.span
          initial={{ y: -100 ,opacity:0}}
          animate={{ y: 0 ,opacity:inView ? 1 : 0}}
          transition={{ delay: index * 0.02 }}
          key={index}
        >
          {letter}
        </motion.span>
      )
    })





    const staggerContainer = {
      hidden: { opacity: 0 },
      show: {
        opacity: inView ? 1 : 0,
        transition: {
          staggerChildren: 1,
          delayChildren: 0.8,
          easeIn: easeIn,
        },
      },
    };

    const childVariants = {
      hidden: { opacity: 0 },
      show: { opacity: inView ? 1 : 0 },
    };
    


    

  return (
    <section>
        <AnimatePresence>
  <motion.div
 
    style={{ scale: scale ,opacity:opacity }}
    ref={textRef}
    variants={staggerContainer}
       initial="hidden"
       animate={inView ? "show" : "hidden"}
  className=" md:w-[85vw] m-auto px-4 py-8 sm:px-6 lg:px-8 ">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="bg-gray-200 shadow-xl p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-gray-700 md:text-3xl">
            {animatedText}
          </h2>
  
          <motion.p
            variants={childVariants}
          className="hidden text-gray-600/90 sm:mt-4 sm:block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam
            sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet
            volutpat quisque ut interdum tincidunt duis.
          </motion.p>

   

          <div className="mt-4 md:mt-8">
            <Link
              to={`/vacatures`}
              className="inline-block "
            >
               <HoverBorderGradientGreen />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
          className="h-40 w-full object-cover sm:h-56 md:h-full"
        />

        <img
          alt=""
          src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="h-40 w-full object-cover sm:h-56 md:h-full"
        />
      </div>
    </div>
  </motion.div>
  </AnimatePresence>
</section>
  )
}
