import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, useCycle, useScroll } from 'framer-motion';
import { MenuToggle } from '../../components/MenuToggle/MenuToggle';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  selectNavBar,
  setSearchTerm,
  clearSearchTerm,
  selectSearchTerm,
} from './NavBarSlice';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';

function NavBar() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const [isHover, togglehover] = useCycle(false, true);
  
  const [isActive, setIsActive] = useState(false);
  

  const navBar = useSelector(selectNavBar);

  const searchTerm = useSelector(selectSearchTerm);

  const location = useLocation();

  let termLocation = '';
  if (location.pathname.includes('characters')) {
    termLocation = 'characters';
  } else if (location.pathname.includes('comics')) {
    termLocation = 'comics';
  } else if (location.pathname.includes('events')) {
    termLocation = 'events';
  } else if (location.pathname.includes('series')) {
    termLocation = 'series';
  }

  const dispatch = useDispatch();

  const onSearchChangeHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(e.target.value));
  };

  let navigate = useNavigate();

  const onSearchTermClearHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`${termLocation}/${searchTerm}`);
      dispatch(clearSearchTerm());
    }
    
  };

  const onSubmitSearchTerm = (e) => {
    e.preventDefault();
      navigate(`${termLocation}/${searchTerm}`);
      dispatch(clearSearchTerm());
  }


  const svgMarvel = {
    hidden: {
      width: 130,
    },

    show: {
      width: 37,
      transition: { type: 'spring', stiffness: 150, duration: 5 },
    },

    hover: {
      width: 130,
      transition: { type: 'Tween', stiffness: 100 },
    },
  };

  let topNavbar = {};


   if (navBar) {
    if (isActive) {
      topNavbar = {
        top: '-300px',
        transition: { type: 'Tween', stiffness: 300, duration: 0.1 },
      };
    } else {
      topNavbar = {
        top: '-79px',
        transition: { type: 'Tween', stiffness: 300, duration: 0.1 },
      };
    }
  } 
  
  else {
    topNavbar = {
      top: '0px',
      transition: { type: 'Tween', stiffness: 300, duration: 0.4 },
    };
  } 

  const navbar = {
    

    navBarShow2: topNavbar,

    navBarShow3: {
      opacity: 1,
      
      transition: {duration: 3,delay:6}
    },


  };

  return (
    <motion.nav
      layout
      variants={navbar}
      initial={{opacity: 0}}
      animate={[ 'navBarShow2','navBarShow3', 'navBarShow']}
      transition={{
        duration: 1,
        type: 'Tween',
        stiffness: 100,
        ease: 'easeIn',
      }}
      id="navbar"
      className="navbar navbar-expand-lg fixed-top mt-lg-2"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <motion.svg
            onClick={() => {
              
              isActive && toggleOpen();
              setIsActive(false);
            }}
            onMouseEnter={() => togglehover()}
            onMouseLeave={() => togglehover()}
            variants={svgMarvel}
            initial="hidden"
            animate={'show'}
            whileHover="hover"
            width="130"
            height="52"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded"
            data-bs-toggle={isActive && 'collapse'}
            data-bs-target={isActive && '#navbarSupportedContent'}
          >
            <rect fill="transparent" width="100%" height="100%"></rect>

            <motion.path
              initial={{ opacity: 1 }}
              animate={isHover ? { opacity: 1 } : { opacity: 0 }}
              className="arvelSVG"
              
              fill="transparent"
            strokeWidth="1.5"
            stroke="white"
              d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"
            ></motion.path>

            <path fill="transparent" d="M0 0h30v52H0z"></path>

            <motion.path
            fill="transparent"
            strokeWidth="1.5"
            stroke="white"
              
              d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"
            ></motion.path>
          </motion.svg>
        </Link>

        <motion.div animate={isOpen ? 'open' : 'closed'}>
          <MenuToggle
            toggle={() => {
              toggleOpen();
              setIsActive((current) => !current);
            }}
          />
        </motion.div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Link className="nav-link" to="characters">
              <motion.li
                className="nav-item"
                onClick={() => {
                  window.scrollTo(0, 0);
                  toggleOpen();
                  setIsActive(false);
                }}
                data-bs-toggle={isActive && 'collapse'}
                data-bs-target={isActive && '#navbarSupportedContent'}
              >
                CHARACTERS
              </motion.li>
            </Link>

            <Link className="nav-link" to="comics">
              <li
                className="nav-item"
                data-bs-toggle={isActive && 'collapse'}
                data-bs-target={isActive && '#navbarSupportedContent'}
                onClick={() => {
                  window.scrollTo(0, 0);
                  toggleOpen();
                  setIsActive(false);
                }}
              >
                COMICS
              </li>
            </Link>

            <Link className="nav-link" to="events">
              <li
                className="nav-item"
                data-bs-toggle={isActive && 'collapse'}
                data-bs-target={isActive && '#navbarSupportedContent'}
                onClick={() => {
                  window.scrollTo(0, 0);
                  toggleOpen();
                  setIsActive(false);
                }}
              >
                EVENTS
              </li>
            </Link>

            <Link className="nav-link" to="series">
              <li
                className="nav-item"
                data-bs-toggle={isActive && 'collapse'}
                data-bs-target={isActive && '#navbarSupportedContent'}
                onClick={() => {
                  window.scrollTo(0, 0);
                  toggleOpen();
                  setIsActive(false);
                }}
              >
                SERIES
              </li>
            </Link>
          </ul>

          {(location.pathname.includes('/characters') && (
            <form className="d-flex mb-2 mb-lg-0" role="search">
              <input
                value={searchTerm}
                onChange={onSearchChangeHandler}
                onKeyPress={onSearchTermClearHandler}
                onPointerOut={onSearchTermClearHandler}
                className="form-control me-2"
                type="search"
                placeholder="???? Search your hero..."
                aria-label="Search your hero..."
              />

              <button className="btn search-btn d-lg-none" type="submit" onClick={onSubmitSearchTerm}>
                SEARCH
              </button>
            </form>
          )) ||
            (location.pathname.includes('/comics') && (
              <form className="d-flex mb-2 mb-lg-0" role="search">
                <input
                  value={searchTerm}
                  onChange={onSearchChangeHandler}
                  onKeyPress={onSearchTermClearHandler}
                  className="form-control me-2"
                  type="search"
                  placeholder="???? Search a comic..."
                  aria-label="Search a comic..."
                />

                <button className="btn search-btn d-lg-none" type="submit" onClick={onSubmitSearchTerm}>
                  SEARCH
                </button>
              </form>
            )) ||
            (location.pathname.includes('/events') && (
              <form className="d-flex mb-2 mb-lg-0" role="search">
                <input
                  value={searchTerm}
                  onChange={onSearchChangeHandler}
                  onKeyPress={onSearchTermClearHandler}
                  className="form-control me-2"
                  type="search"
                  placeholder="???? Search a event..."
                  aria-label="Search a event..."
                />

                <button className="btn search-btn d-lg-none" type="submit" onClick={onSubmitSearchTerm}>
                  SEARCH
                </button>
              </form>
            )) ||
            (location.pathname.includes('/series') && (
              <form className="d-flex mb-2 mb-lg-0" role="search">
                <input
                  value={searchTerm}
                  onChange={onSearchChangeHandler}
                  onKeyPress={onSearchTermClearHandler}
                  className="form-control me-2 "
                  type="search"
                  placeholder="???? Search a serie..."
                  aria-label="Search a serie..."
                />

                <button className="btn search-btn d-lg-none" type="submit" onClick={onSubmitSearchTerm}>
                  SEARCH
                </button>
              </form>
            ))}
        </div>
      </div>
    </motion.nav>
  );
}
export default NavBar;
