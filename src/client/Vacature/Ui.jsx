import React from 'react'
import { cn } from '../utils/Cn';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import vaca from "../Home/Cards"
import { Link } from 'react-router-dom';


    

export default function Ui({filter,inputFilter}) {
  const[hoveredIndex, setHoveredIndex] = useState(null);





  return (
    <div
      className={cn( "grid grid-cols-1 " )}>
        {vaca.map((item, index) => (
             <div
             key={index}
             >
            {(inputFilter === '' && filter.length === 0 ) || filter.some(f => item.title.toLowerCase().includes(f)) || (inputFilter !== "" && item.title.toLowerCase().includes(inputFilter)) ?
               <motion.div
           
              className="relative group block p-2 min-h-full w-full "
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opactiy: 0 }}

            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 h-full w-full  bg-gray-400/[0.8] block rounded-3xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <Card className>
              <CardTitle>{item.title}</CardTitle>
                <motion.div className='flex flec-col flex-wrap gap-x-8 items-center justify-between' >
                <CardDescription className='!text-[12px]'>{item.workingHours}</CardDescription>
                <CardDescription className='!text-[12px]'>{item.location}</CardDescription>
                <CardDescription className='!text-[12px]'>{item.pay}</CardDescription>
                <CardDescription className='!text-[12px]'>{item.status}</CardDescription>
                <div className='mt-8'>
                <Link className='block w-full rounded bg-white px-8 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto !text-[11px]  ' 
                onClick={() => localStorage.setItem('item', JSON.stringify(item))} to={`/vacatures/${item.title}`}>Bekijk Vacature</Link>
                </div>
                </motion.div>
               
              </Card>
              
            </motion.div> : null}
             </div>
        ))}
    
    </div>
  );
}

export const Card = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-gray-900 border  border-yellow-500 group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}
) => {
  return (
    <h4 className={cn("text-zinc-200 font-bold tracking-wide mt-4 text-left", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-300 tracking-wide leading-relaxed text-sm text-left",
        className
      )}
    >
      {children}
    </p>
  );
};
