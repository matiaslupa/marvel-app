
import React, { useEffect, useState } from 'react';
import {
  selectComics,
  loadComics,
} from './ComicsSlice';
import { useSelector, useDispatch } from 'react-redux';
import './Comics.css'
import {  useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const Comics = () => {
  const comics = useSelector(selectComics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadComics('323-events-All'));
  }, ['a']);

  // console.log(comics)
  
  let navigate = useNavigate();
  return (
    <div className='container-fluid comics-container'>
      <div className="row row-comics-div-mainpage">
        <div className="col col-comics-mainpage">


          {comics && comics.map(
            comic => {

              let srcImg = !comic.thumbnail.path.includes('image_not_available') && `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;

              
              
              return (
                <motion.div className='col-comics-div-mainpage' key={comic.id}
                animate={{opacity: 0.65,filter: 'blur(0.2px) saturate(200%)'}}
                whileHover={{ zIndex: 10, scale:1.04,x:-20, y:10, opacity: 0.9,filter: 'blur(0px) saturate(130%)', transition:{duration:0.2}}}
                onClick={ () => navigate(`/comics`)}
                
                >
                  
                <motion.img 
                
                src={srcImg ? srcImg : undefined} alt=""></motion.img>



                
                </motion.div>
                
              )
            }
           )}
          
          
        </div>
        
      </div>
    </div>
  )
}

export default Comics