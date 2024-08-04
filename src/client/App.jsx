
import "./App.css";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./Home/Home";
import About from "./About/About";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer/Footer";
import Vacatures from "./Vacature/Vacatures";
import ExtendedVacature from "./Vacature/ExtendedVacature";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";


function App() {



  return (
    <div className="App">
        <BrowserRouter>
        <Navbar />
          <Routes>
           
            <Route path="/" element={ <Home /> } />
            <Route path="/vacatures" element={<motion.div  initial={{scale:0}} animate={{scale:1}} exit={{x:window.innerWidth}}> <Vacatures /> </motion.div>} />
            <Route path="/vacatures/:id" element={<ExtendedVacature />} />
            <Route path="/about" element={<About />} />
         
          </Routes>
          <Footer />
        </BrowserRouter>
      
    </div>
  );
}

export default App;
