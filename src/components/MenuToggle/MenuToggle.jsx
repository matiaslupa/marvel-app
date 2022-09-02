import * as React from 'react';
import { motion } from 'framer-motion';
import './MenuToggle.css'

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke='red'
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = (props) => (
  <button
    onClick={props.toggle}
    className="navbar-toggler btn"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <svg width="30" height="30" viewBox="0 0 20 20" color="#fff" className='navbar-x'>
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5'},
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        // transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);
