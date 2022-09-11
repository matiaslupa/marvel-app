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


function Characters() {
  const characters = useSelector(selectCharacters);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCharacters('314-events-All'));
  }, ['a']);

  
  
  let navigate = useNavigate();

  return (
    <div className="container-fluid characters-container">
      
      <div className="row">
        <div className="col">

        </div>
      </div>
     
    </div>
  );
}

export default Characters;
