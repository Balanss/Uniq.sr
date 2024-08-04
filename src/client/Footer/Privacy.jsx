import React,{useEffect,useState} from 'react'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer'
import { useMotionValue, useTransform } from 'framer-motion'

export default function Privacy({privacy, setPrivacy, }) {
 


const handleClose = () => {
    setPrivacy(false)
}


 // animations below 
 const scrollY = useMotionValue(window.scrollY);
 const opacity = useTransform(scrollY, [900, 2000], [0.0, 1]);
 const scale = useTransform(scrollY, [700, 2000], [0.7, 1]);
 const y = useTransform(scrollY, [600, 800], [100, -100]);

 useEffect(() => {
   const handleScroll = () => {
     scrollY.set(window.scrollY);
   };

   window.addEventListener('scroll', handleScroll);
   // Cleanup the event listener on component unmount
   return () => {
     window.removeEventListener('scroll', handleScroll);

   };
 }, []);

 const [textRef, inView] = useInView({
   triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
 });


  return (
<>
{privacy && <> 

    <motion.div className='fixed h-screen w-screen inset-0 flex justify-center items-center  backdrop-blur-sm [perspective:800px] [transform-style:preserve-3d] z-50' 
     initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
      backdropFilter: "blur(10px)",
    }}
    exit={{
      opacity: 0,
      backdropFilter: "blur(0px)",

    }}
    transition={{duration:0.5}}
   >
    <div className='fixed  bg-black bg-opacity-50' onClick={() => setShow(false)}></div>
 <motion.div className='bg-white px-4 relative z-1 border-[1px] border-gray-500 rounded-md py-4 md:w-[75vw] md:m-auto 3xl:w-1/2'
    initial={{
      opacity: 0,
      scale: 0.5,
      rotateX: 40,
      y: 40,
    }}
    animate={{
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
    }}
    exit={{
      opacity: 0,
      scale: 0.8,
      rotateX: 10,
    }}
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 15,
    }}
 >
 <div className=" block py-2 rounded-tr-3xl border border-gray-100 ">
  <div className="p-4 text-left">
    <ul className="list-disc list-inside text-sm text-gray-700">
      <li className="mb-2"> By accessing and using this website, you agree to comply with and be bound by these terms and conditions </li>
      <li className="mb-2"> All content provided on this site is for informational purposes only and is subject to change without notice. </li>
      <li className="mb-2"> You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. </li>
      <li className="mb-2"> We reserve the right to modify or discontinue any part of the website or service at any time without prior notice. </li>
      <li className="mb-2"> Any unauthorized use of this website may result in termination of your access and legal action. </li>
      <li className="mb-2"> We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of this site. </li>
      </ul>

    <button  className="cursor-pointer mt-4 block rounded-md border border-indigo-900 bg-slate-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"  onClick={handleClose}> Close</button>
  </div>
</div>
 </motion.div>
    </motion.div>

</>}
</>
  )
}
