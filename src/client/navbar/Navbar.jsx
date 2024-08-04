import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion ,AnimatePresence} from 'framer-motion'

export default function Navbar() {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [test,setTest] = useState(false)
  const [navbarSpecial,setNavbarSpecial] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setNavbarSpecial(true)
      } else {
        setNavbarSpecial(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  
  
  return (
    <nav className=' overflow-hidden bg-gray-200/80 px-10  m-auto  relative z-[10000000] '>

      <div className=' md:w-[85vw] m-auto flex flex-row justify-between   p-3'>
      <div>
            <img src="https://www.uniqcx.nl/wp-content/uploads/2024/04/logo-UNIQCX-002.png" alt="logo" className='phone:max-w-[50vw] cursor-pointer' onClick={() => navigate("/")} />
        </div>

    
        <motion.div 
         initial={{ opacity: 0, y: -20 }}
          animate={navbarSpecial ? { opacity: 1, y: 0, position: 'fixed', right: 16, flexDirection: 'column', textAlign: 'center' } : { opacity: 1, y: 0, position: 'relative', flexDirection: 'row', textAlign: 'left' }}
          transition={{ duration: 0.5 }}
        className={`${!navbarSpecial ? 'flex flex-row items-center  text-gray-500 gap-4 text-md md:text-sm': 'fixed flex flex-col right-4 items-center text-md text-gray-500 gap-4 text-md md:text-sm' } `}>
        {!isMobile && <>
          <AnimatePresence>
  <motion.div
    key="home-Link"
    onHoverStart={() => setTest('Home')}
    onHoverEnd={() => setTest(false)}
    className=''
  >
    <Link className='' to="/">Home</Link>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: test === 'Home' ? '100%' : 0 }}
      transition={{ duration: 1 }}
      className='bg-orange-500 h-1'
    />
  </motion.div>

  <motion.div
    key="vacatures-Link"
    onHoverStart={() => setTest('Vacatures')}
    onHoverEnd={() => setTest(false)}
  >
    <Link className='' to="/vacatures">Vacatures</Link>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: test === 'Vacatures' ? '100%' : 0 }}
      transition={{ duration: 1 }}
      className='bg-orange-500 h-1'
    />
  </motion.div>

  <motion.div
    key="about-Link"
    onHoverStart={() => setTest('About')}
    onHoverEnd={() => setTest(false)}
  >
    <Link className='' to="/about">About</Link>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: test === 'About'? '100%' : 0 }}
      transition={{ duration: 1 }}
      className='bg-orange-500 h-1'
    />
  </motion.div>

  <motion.div
    key="extra-Link"
    onHoverStart={() => setTest('Extra')}
    onHoverEnd={() => setTest(false)}
  >
    <Link className='' to="/">Extra</Link>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: test === 'Extra' ? '100%' : 0 }}
      transition={{ duration: 1 }}
      className='bg-orange-500 h-1'
    />
  </motion.div>
</AnimatePresence>
        </>}


        {isMobile && <img className={`${isOpen  && 'pb-2'} size-6`} src="https://img.icons8.com/ios-filled/50/menu--v1.png" alt="menu--v1" onClick={() => setIsOpen(!isOpen)}/>}
        </motion.div>
          <AnimatePresence> 
        {isOpen && isMobile &&
        <motion.div 
        initial={{x:1000,opacity:0}}
        animate={{x:0,opacity:1,borderTopLeftRadius:'50px',borderBottomLeftRadius:'50px'}}
        exit={{x:1000,opacity:0}}
        transition={{duration:0.5}}
        className='navbarphone  '>
        <div className='grid grid-cols-1 text-left text-lg p-8 nav-animation' onClick={() => setIsOpen(false)}> 
        <Link to="/">Home</Link>
        <Link to="/vacatures">Vacatures</Link>
        <Link to="/about">About</Link>
        <Link to="/">Extra</Link>
        </div>
          </motion.div>}
          </AnimatePresence>
      </div>




          
    </nav>
  )
}
