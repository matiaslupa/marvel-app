
import React, { useEffect, useState } from 'react';
import './Events.css'
import {
  selectEvents,
  loadEvents,
} from './EventsSlice';
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Events = () => {
  const events = useSelector(selectEvents);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEvents('1009610-character-All'));
  }, ['a']);

  // console.log(events)
  
  let navigate = useNavigate();
  return (
    <div className='container-fluid events-container'>
      <div className="row row-character-div-mainpage">
        <div className="col col-characters-mainpage col-events-mainpage">


          {events && events.map(
            event => {

              let srcImg = !event.thumbnail.path.includes('image_not_available') && `${event.thumbnail.path}/portrait_uncanny.${event.thumbnail.extension}`;

              
              
              return (
                <motion.div className='col-character-div-mainpage col-events-div-mainpage' key={event.id}
                animate={{opacity: 0.78,filter: 'blur(0.5px) saturate(180%)'}}
                whileHover={{ zIndex: 10, scale:1.04, y: -6, x:-10, opacity: 0.95,filter: 'blur(0px) saturate(150%)', transition:{duration:0.3, type: 'spring'}}}
                onClick={ () => navigate(`/events`)}
                
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

export default Events