import React,{useState,useEffect} from 'react';
import { useInView } from 'react-intersection-observer'
import { useMotionValue, useTransform } from 'framer-motion'
import { motion } from 'framer-motion'
import info from './BannerInfo';

const Banner = () => {

    const [scale, setScale] = useState(null);
    const [scale2, setScale2] = useState(null);
    const [y, setY] = useState(null);
    const [y2, setY2] = useState(null);
    const [opacity, setOpacity] = useState(null);
    const [opacity2, setOpacity2] = useState(null);

      // animations below 
  const scrollY = useMotionValue(window.scrollY);

  const viewportHeight = window.innerHeight;




    const mobileScale =  useTransform(scrollY, [800, 1100], [0.6, 1]);
    const mobileY =  useTransform(scrollY, [800, 1100], [-200, 0]);
    const mobileOpacity = useTransform(scrollY, [800, 1100], [0.0, 1]);
    
    const mobileOpacity2 = useTransform(scrollY, [1500, 2000], [0.0, 1]);


    const desktopScale =  useTransform(scrollY, [400, 1000], [0.6, 1]);
    const desktopY =  useTransform(scrollY, [400, 1000], [-200, 0]);
    const desktopOpacity = useTransform(scrollY, [400, 1000], [0.6, 1]);

    const desktopScale2 =  useTransform(scrollY, [1200, 2000], [0.6, 1]);
    const desktopY2 = useTransform(scrollY, [1200,2000], [0.6,1]);
    const desktopOpacity2 = useTransform(scrollY, [1200,2000], [0.6, 1]);

  const [textRef, inView] = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });

    const [textRef2, inView2] = useInView({
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

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 600) {
            setScale(mobileScale);
            setY(mobileY);
            setOpacity(mobileOpacity);
            setScale2(1);
            setY2(0);
            setOpacity2(1);
          } else {
            setScale(desktopScale);
            setY(desktopY);
            setOpacity(desktopOpacity);
            setScale2(desktopScale2);
            setY2(desktopY2);
            setOpacity2(desktopOpacity2);
          }
        };
    
        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, [mobileScale, desktopScale,mobileOpacity2,desktopOpacity2]);

  
      
  return (
    <div className="relative  bg-gray-100 ">
      <motion.div 
      initial={{x:-1000}}
      animate={{x:0}}
      transition={{duration:1,ease:'easeInOut'}}
      className=" md:[85vw] m-auto pb-8  bg-gray-100  flex items-center justify-center">
       {
        info.map((banner, index) => (
            <div key={index} className='grid md:w-[85vw] md:grid-cols-2 items-start p-4 text-left gap-4 text-sm'>
    
                <img src={banner.image} alt={banner.title} className='object-cover rounded-lg shadow-md ' />
                <div>
                <h1 className='text-6xl'>{banner.title}</h1>
                <ul className='list-disc list-inside space-y-3 text-gray-600 mt-10'>
                    <li>{banner.description}</li>
                    <li>{banner.description}</li>
                    <li>{banner.description}</li>
                    <li>Good idea for uniqcx certifications here and stamps/ cert logos</li>
                </ul>
                <div className='grid grid-cols-[50px,50px] gap-2 p-4'>
                <img
            src="https://via.placeholder.com/150"
            alt="Subject 1"
            className="size-[10]  object-cover rounded-lg"
          />
           <img
            src="https://via.placeholder.com/150"
            alt="Subject 1"
            className="size-[10]   object-cover rounded-lg"
          />
           <img
            src="https://via.placeholder.com/150"
            alt="Subject 1"
            className="size-[10]   object-cover rounded-lg"
          />
           <img
            src="https://via.placeholder.com/150"
            alt="Subject 1"
            className="size-[10]  object-cover rounded-lg"
          />
                  </div>
       
                  </div>
            </div>
        )) }
      </motion.div>

      <div className="min-h-screen bg-gray-200 flex flex-col items-center md:justify-center pt-20 pb-8 bgg"  >
        
        <motion.div
        style={{  scale,opacity} }
          ref={textRef} 
          className="md:sticky md:top-20 md:w-3/4  bg-white p-4 shadow-lg rounded-lg pb-8 flex phone:flex-col gap-4 stick"  >
          <img
            src="https://images.unsplash.com/photo-1615890932417-89da415105d2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Subject 1"
            className=" h-[400px] md:w-[50%] rounded-lg shadow-lg object-cover"
          />
      <div className='text-left text-sm'>
      <p className="mt-4">
          { info[0].extra}
          </p>
          <p className="mt-4 ">
          { info[0].extra}
          </p>
      </div>
        </motion.div>

        <div className="h-60"></div>

        <motion.div
        style={{ y:y2,scale:scale2,opacity:opacity2} }
          ref={textRef2} 
          className="sticky md:top-20 md:w-3/4 bg-white p-4 shadow-lg rounded-lg pb-8 flex phone:flex-col gap-4 stick "  >
          <img
            src="https://images.unsplash.com/photo-1676379330772-ee9b24e1ebb0?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Subject 1"
            className="h-[400px] md:w-[50%]   object-cover rounded-lg"
          />
      <div className='text-left text-sm'>
      <p className="mt-4">
          { info[0].extra}
          </p>
          <p className="mt-4">
          { info[0].extra}
          </p>
      </div>
        </motion.div>


<div className="h-96"></div>
</div>
    </div>
  );
};

export default Banner;
