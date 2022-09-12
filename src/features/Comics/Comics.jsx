
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
    dispatch(loadComics('238-events-All'));
  }, ['a']);

  // console.log(comics)
  
  let navigate = useNavigate();
  return (
    <div className='container-fluid comics-container'>
      <div className="row row-character-div-mainpage">
        <div className="col col-characters-mainpage">


          {comics && comics.slice(6).map(
            comic => {

              let srcImg = !comic.thumbnail.path.includes('image_not_available') && !comic.thumbnail.path.includes('4f7f0422bd5b9') && !comic.thumbnail.path.includes('5744bfa7e3063') && !comic.thumbnail.path.includes('5746f9ef545f7')  && `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;

              
              
              return (
                <motion.div className='col-character-div-mainpage col-comics-div-mainpage' key={comic.id}
                animate={{opacity: 0.6,filter: 'blur(0.5px) saturate(250%)'}}
                whileHover={{  zIndex: 10, scale:1.04, y: -6, x:-10, opacity: 0.9,filter: 'blur(0px) saturate(150%)', transition:{duration:0.3, type: 'spring'}}}
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