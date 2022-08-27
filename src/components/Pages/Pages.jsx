import React, { useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';

import Characters from '../../features/Characters/Characters';
import Comics from '../../features/Comics/Comics';
import Events from '../../features/Events/Events';

import './Pages.css';

function Pages() {


  

  return (
    <div className="pages-container">
      
      <motion.div >
        <Characters />
      </motion.div>
      

      <motion.div >
        <Comics />
      </motion.div>

      <motion.div >
        <Events />
      </motion.div>
    </div>
  );
}

export default Pages;
