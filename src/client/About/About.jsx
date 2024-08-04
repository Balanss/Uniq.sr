
import content from "./content";
import { StickyScroll } from "../ui/Sticky-scroll-reveal";
import { motion } from "framer-motion";
import React,{useState,useEffect} from 'react';
import { useInView } from 'react-intersection-observer'
import { useMotionValue, useTransform } from 'framer-motion'
import AboutHeader from "./AboutHeader";
import AboutMiddle from "./AboutMiddle";
import AboutFooter from "./AboutFooter";






export default function About() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const scrollY = useMotionValue(window.scrollY);

  const scale1 =  isMobile?useTransform(scrollY, [0, 1200], [0.7, 1]):useTransform(scrollY, [0, 800], [0.8, 1]);
  const scale2 = !isMobile? useTransform(scrollY, [0, 900], [0.8, 1]):useTransform(scrollY, [1200, 1800], [0.8, 1]);
  const scale3 =  !isMobile?useTransform(scrollY, [0, 1200], [0.8, 1]):useTransform(scrollY, [2300, 3000], [0.8, 1]);

  
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

    const scaleIndex0 =  useTransform(scale1, [0.9,1], [0.9, 1]);
    const scaleindex1= useTransform(scale2, [0.9, 1], [0.9, 1]);
    const scaleIndex2= useTransform(scale3, [0.9, 1], [0.9, 1]);

    const [scaleText0, setScaleText0] = useState(0);
    const [opacityText0, setOpacityText0] = useState(0);

    const [scaleText1, setScaleText1] = useState(0);
    const [opacityText1, setOpacityText1] = useState(0);
    
    const [scaleText2, setScaleText2] = useState(0);
    const [opacityText2, setOpacityText2] = useState(0);


    
    const scaleText = [scaleText0, scaleText1, scaleText2];
    const opacityText = [opacityText0, opacityText1, opacityText2];
    const scale= [scale1, scale2, scale3];

    useEffect(() => {

      const unsubscribe = scaleIndex0.onChange((latest) => {
        if (latest === 1) {
          setScaleText0(1);  
          setOpacityText0(1);
          
        }
        else {
          setScaleText0(0);
          setOpacityText0(0);
        }
      });

      const unsubscribe2 = scaleindex1.onChange((latest) => {
        if (latest === 1) {
          setScaleText1(1);  
          setOpacityText1(1);
        }
        else {
          setScaleText1(0);
          setOpacityText1(0);
        }
      });

      const unsubscribe3 = scaleIndex2.onChange((latest) => {
        if (latest === 1) {
          setScaleText2(1);  
          setOpacityText2(1);
        }
        else {
          setScaleText2(0);
          setOpacityText2(0);
        }
      });


      // Cleanup the subscription on component unmount
      return () => {
        unsubscribe();
        unsubscribe2();
        unsubscribe3();

      }
    }, [ scaleText0, scaleText1, scaleText2, opacityText0, opacityText1, opacityText2]);

  //play around with rounded e and s when setting state let top me E and last inded be S

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 

  return (


    <motion.div 
    initial={{width:'200%'}}
 animate={{width:'100%'}}
  exit={{x:0,transition:{duration:0.5}}}
    className="min-h-screen pt-20 bg-gray-200 pb-20" >

      
<AboutHeader/>

 <AboutMiddle/>


    <motion.section
    style={{scale:scale[0]}}
    className="mt-20 w-[85vw] border-[1px] shadow-2xl rounded-lg bg-gray-200 bgabout-- grid grid-cols-1 m-auto gap-4 justify-center justify-items-center items-center text-left  text-gray-700 mdtext-sm text-md ">
      {content.map((item, index) => (
        <motion.div
        ref={textRef} style={{scale:scale[index+1]}}
        key={item.title + index} className="my-20 px-4 grid md:grid-cols-[400px,45vw] gap-8 items-center ">
           <div className="  ">
        <motion.img
                  initial={{ opacity: scaleText[index],y:opacityText[index] }}
                  animate={{ opacity: scaleText[index],y:opacityText[index] }}
                transition={{duration:0.5,delay:0.1*index}}
        src={item.img} alt="sponsor"  className=" w-[400px] rounded-t-full object-contain phone:rounded-e-full shadow-sm"/>
      </div>

      <div>
      <motion.h1 
                initial={{ opacity: scaleText[index],y:opacityText[index] }}
                animate={{ opacity: scaleText[index],y:opacityText[index] }}
                transition={{duration:0.5,delay:0.2*index}}
      className="font-bold text-3xl  line-[2] ">
          {item.title}
      </motion.h1>

      <motion.p
            initial={{ opacity: scaleText[index],y:opacityText[index] }}
            animate={{ opacity: scaleText[index],y:opacityText[index] }}
          transition={{duration:1,delay:0.3*index}}
        >
          {item.text}
        </motion.p>
      </div>
       
        </motion.div>
      ))}
    </motion.section>

    <AboutFooter/>

  </motion.div>
  );
}


