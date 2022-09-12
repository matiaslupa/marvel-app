import React, { useEffect, useState } from 'react';
import './Series.css'
import {
  selectSeries,
  loadSeries,
} from './SeriesSlice';
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';



const Series = () => {
  const series = useSelector(selectSeries);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSeries('1009187-character-All'));
  }, ['a']);

  // console.log(characters)
  
  let navigate = useNavigate();
  return (
    <div className='container-fluid series-container'>
      <div className="row row-character-div-mainpage">
        <div className="col col-characters-mainpage col-series-mainpage ">


          {series && series.map(
            serie => {

              let srcImg = !serie.thumbnail.path.includes('image_not_available')  && `${serie.thumbnail.path}/portrait_uncanny.${serie.thumbnail.extension}`;

              
              
              return (
                <motion.div className='col-character-div-mainpage col-events-div-mainpage' key={serie.id}
                animate={{opacity: 0.8,filter: 'blur(0.5px) saturate(180%)'}}
                whileHover={{ zIndex: 10, scale:1.04, y: -6, x:-10, opacity: 0.95,filter: 'blur(0px) saturate(150%)', transition:{duration:0.2}}}
                onClick={ () => navigate(`/series`)}
                
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
  )
}

export default Series