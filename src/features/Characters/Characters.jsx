import React, { useEffect, useState } from 'react';
import {
  selectCharacters,
  selectIsLoading,
  selectHasError,
  loadCharacters,
} from './CharactersSlice';
import { useSelector, useDispatch } from 'react-redux';
import './Characters.css';

import ParallaxText from '../../components/ParallaxText/ParallaxText';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 0.9,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function Characters() {
  const characters = useSelector(selectCharacters);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCharacters('314-events-All'));
  }, ['a']);

  const item = {
    marvel: {
      opacity: [1, 0.3, 1, 0.3],
      transition: {
        duration: 40,
        times: [0, 0.05, 0.1, 0.2],
        repeat: Infinity,
      },
    },
    marvel1: {
      opacity: [1, 0.3, 0.3, 1, 0.3],
      transition: {
        duration: 40,
        times: [0, 0.05, 0.2, 0.3, 0.4],
        repeat: Infinity,
      },
    },
    marvel2: {
      opacity: 0.3,
      transition: {
        duration: 2,
      },
    },

    marvel3: {
      opacity: [1, 0.3, 0.3, 1, 0.3],
      transition: {
        duration: 40,
        times: [0, 0.05, 0.4, 0.5, 0.6],
        repeat: Infinity,
      },
    },
    marvel4: {
      opacity: [1, 0.3, 0.3, 1, 0.3],
      transition: {
        duration: 40,
        times: [0, 0.05, 0.6, 0.7, 0.8],
        repeat: Infinity,
      },
    },
    marvel5: {
      opacity: [1, 0.3, 0.3, 1, 0.3],
      transition: {
        duration: 40,
        times: [0, 0.05, 0.8, 0.9, 1],
        repeat: Infinity,
      },
    },

    initial: { rotate: 25 },
  };

  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(1, characters.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  let navigate = useNavigate();

  return (
    <div className="container-fluid characters-container">
      {/* <motion.div className="row row-characters d-flex justify-content-center">
        <motion.div className="col-12 col-marvel-1">
          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel3" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel4" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel1" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel5" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel3" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>

          <motion.div variants={item} animate="marvel2" initial="initial">
            <ParallaxText baseVelocity={-1}>-MARVEL-</ParallaxText>
          </motion.div>
        </motion.div>
      </motion.div>  */}

      <div className="row row-img-characters">
          <AnimatePresence initial={false} custom={direction}>
        
            <motion.div
              className="img-characters-div"
              onClick={() => navigate(`characters`)}
            >
              

              <motion.img
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                src={
                  characters &&
                  characters[1] &&
                  characters[1].thumbnail &&
                  `${characters[imageIndex].thumbnail.path}.${characters[imageIndex].thumbnail.extension}`
                }
              />
              <h3>
                {characters &&
                  characters[1] &&
                  characters[1].name &&
                  characters[imageIndex].name.toUpperCase()}
              </h3>

              <h2>CHARACTERS</h2>
            </motion.div>
        
          </AnimatePresence>

          

        <div className="next d-none d-md-flex" onClick={() => paginate(1)}>
          <NavigateNextIcon fontSize="large" />
        </div>
        <div className="prev d-none d-md-flex" onClick={() => paginate(-1)}>
          <NavigateNextIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Characters;
