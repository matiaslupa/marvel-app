import React, { useEffect, useState } from 'react';
import {
  selectCharacters,
  selectIsLoading,
  selectHasError,
  loadCharacters,
} from './CharactersSlice';
import { useSelector, useDispatch } from 'react-redux';
import './Characters.css';


import {  useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';




function Characters() {
  const characters = useSelector(selectCharacters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCharacters('238-events-All'));
  }, ['a']);

  // console.log(characters)
  
  let navigate = useNavigate();

  return (
    <div className="container-fluid characters-container">
      
      <div className="row row-character-div-mainpage">
        <div className="col col-characters-mainpage">


          {characters && characters.map(
            character => {

              let srcImg = !character.thumbnail.path.includes('image_not_available') && !character.thumbnail.path.includes('4c00393a4cb7c') && !character.thumbnail.path.includes('5102c774ebae7') && !character.thumbnail.path.includes('4c00390504a3b')  && `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;

              
              
              return (
                <motion.div className='col-character-div-mainpage' key={character.id}
                animate={{opacity: 0.4,filter: 'blur(0.5px) saturate(250%)'}}
                whileHover={{ zIndex: 10,scale:1.04, x: -20, opacity: 0.8,filter: 'blur(0px) saturate(150%)', transition:{duration:0.2}}}
                onClick={ () => navigate(`/characters`)}
                
                >
                  
                <motion.img 
                
                src={srcImg !== false ? srcImg : undefined} alt=""></motion.img>



                
                </motion.div>
                
              )
            }
           )}
          
          
        </div>
        
      </div>
     
    </div>
  );
}

export default Characters;
