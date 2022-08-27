import React, { useEffect } from 'react';
import {
  selectCharacters,
  selectIsLoading,
  selectHasError,
  loadCharacters,
} from './CharactersSlice';
import { useSelector, useDispatch } from 'react-redux';
import './Characters.css';

import { motion } from 'framer-motion';

import ParallaxText from '../../components/ParallaxText/ParallaxText';

function Characters() {
  const characters = useSelector(selectCharacters);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();


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

  const image = {
    image: {
      opacity: [0.7, 0.6, 0.6, 0.6, 0.7],
      transition: {
        duration: 10,
        times: [0, 0.2, 0.4, 0.6, 0.8],
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
    imageScale: {
      scale: 1.3,
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
    initial: { opacity: 0.6 },
  };

  return (
    <div className="container-fluid characters-container">
      <motion.div className="row row-characters d-flex justify-content-center">
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
      </motion.div>

      {/* <motion.row className="row row-image-character">
        <div className="col-12 justify-content-center d-flex col-image-character">
          <motion.img
            animate={["image", "imageScale"]} variants={image} initial='initial'
            
            src={
              characters[17] &&
              characters[17].thumbnail &&
              `${characters[17].thumbnail.path}/detail.${characters[17].thumbnail.extension}`
            }
            className="image-characters rounded"
            alt="..."
          />
        </div>
      </motion.row> */}
    </div>
  );
}

export default Characters;
