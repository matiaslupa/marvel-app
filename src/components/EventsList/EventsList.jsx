import React, { useEffect, useState } from 'react';
import './EventsList.css';

import {
  selectEvents,
  selectIsLoadingEvents,
  loadEvents,
} from '../../features/Events/EventsSlice';

import {
    loadCharacters,
    selectCharacters,
    selectIsLoading,
  } from '../../features/Characters/CharactersSlice';
  
  import {
    selectComics,
    selectIsLoadingComics,
    loadComics,
  } from '../../features/Comics/ComicsSlice';
  
  import {
    toggleNavBarTrue,
    toggleNavBarFalse,
  } from '../../features/NavBar/NavBarSlice';
  
  import { useSelector, useDispatch } from 'react-redux';
  
  import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
  
  import { motion, AnimatePresence } from 'framer-motion';
  
  import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';
  import FormControl from '@mui/material/FormControl';
  import Select from '@mui/material/Select';

const EventsList = () => {
  const events = useSelector(selectEvents);
  const isLoadingEvents = useSelector(selectIsLoadingEvents);

  const dispatch = useDispatch();

  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [abc, setAbc] = useState('');
  
  const characters = useSelector(selectCharacters);
  const isLoading = useSelector(selectIsLoading);
  
  const comics = useSelector(selectComics);
  const isLoadingComics = useSelector(selectIsLoadingComics);
  
  let navigate = useNavigate();
  
  
  let { letter = 'a' } = useParams();
  
    
    useEffect(() => {
      dispatch(loadEvents(letter));
    }, [letter]);

    useEffect(() => {
  
      if(selectedEvent){
        dispatch(toggleNavBarTrue())
      }else{
        dispatch(toggleNavBarFalse())
      } 
      
    }, [selectedEvent]);

  return (
    <div className="container container-charcaters-list">
      <motion.div className="row justify-content-center row-characters-list row-events-list">
        
        

        {isLoadingEvents ? (
          <div className="col-12 spinner-characters-list d-flex justify-content-center">
            <div className="spinner-border " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          events.map((event) => {
            return (
              <motion.div
                layoutId={event.id}
                animate={selectedEvent && { opacity: 0.6 }}
                transition={{ duration: 0.1 }}
                onClick={() => setSelectedEvent(event)}
                className="col-6 col-md-4 col-lg-3 col-xl-2 col-characters-list"
                key={event.id}
              >
                <motion.div
                  className="card-character-list"
                  onClick={() => dispatch(loadCharacters(event.id.toString()))}
                >
                  <motion.img
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.8 },
                    }} 
                    className="img-characters-list"
                    src={`${event.thumbnail.path}/portrait_uncanny.${event.thumbnail.extension}`}
                    alt={event.title}
                  />

                  <div className="name-characters-list name-events-list">
                    <h3 className="">{`${event.title.slice(0, 20)}${
                      event.title.length > 20 ? '...' : ''
                    }`}</h3>
                  </div>
                </motion.div>
              </motion.div>
            );
          })
        )}

        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              className="container col-character-list col-event-list"
              layoutId={selectedEvent.id}
              key={selectedEvent.id}
              
              transition={{ duration: 0.1 }}
            >
              <motion.button
                className="btn btn-outline-warning btn-close-character"
                onClick={() => setSelectedEvent(null)}
              >
                X
              </motion.button>

              <div className="row m-0 justify-content-around row-name-description-character-list">
                <div className="col-5 img-character-list-div">
                  <motion.img

                    className="img-character"
                    src={`${selectedEvent.thumbnail.path}.${selectedEvent.thumbnail.extension}`}
                    alt={selectedEvent.name}
                  />
                </div>
                <div className="col-7 col-name-description-character-list">
                  <h2 className="character-name">
                    {selectedEvent.title.toUpperCase()}
                  </h2>
                  <div className="character-description">
                    <span>
                      {selectedEvent.description
                        ? selectedEvent.description
                        : 'Description not available'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="comics-character-list characters-event-list">
                {!isLoading ? (
                  characters.map((character) => {
                    return (
                      <motion.div
                        key={character.id}
                        className="comics-character-list-div"
                        onClick={() => navigate(`/characters/${character.id}`)}
                      >
                        <motion.img
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { duration: 1.5 },
                          }}
                          className="img-comic-character"
                          src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                          alt={character.name}
                        />
                        <div className="comic-title-character-list">
                          <span>{character.name.toUpperCase()}</span>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="col-12 spinner-character-list d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EventsList;
