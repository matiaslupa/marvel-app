import React, { useEffect, useState } from 'react';

import './CharactersList.css';

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
  selectEvents,
  selectIsLoadingEvents,
  loadEvents,
} from '../../features/Events/EventsSlice';

import {
  loadSeries,
  selectSeries,
  selectIsLoadingSeries,
} from '../../features/Series/SeriesSlice';

import {
  toggleNavBarTrue,
  toggleNavBarFalse,
  selectNavBar,
} from '../../features/NavBar/NavBarSlice';

import { useSelector, useDispatch } from 'react-redux';

import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{
          color: '#FFC107',
          fontSize: '18px',
          fontWeight: '700',
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(-90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

function CharactersList() {
  const [expanded, setExpanded] = useState(null);

  const handleChangeAcordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const [abc, setAbc] = useState('');

  const characters = useSelector(selectCharacters);
  const isLoading = useSelector(selectIsLoading);

  const comics = useSelector(selectComics);
  const isLoadingComics = useSelector(selectIsLoadingComics);

  const events = useSelector(selectEvents);
  const isLoadingEvents = useSelector(selectIsLoadingEvents);

  const series = useSelector(selectSeries);
  const isLoadingSeries = useSelector(selectIsLoadingSeries);

  let { letter = 'a' } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCharacters(letter));
  }, [letter]);

  useEffect(() => {
    if (selectedCharacter) {
      dispatch(toggleNavBarTrue());
    } else {
      dispatch(toggleNavBarFalse());
    }
  }, [selectedCharacter]);

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const handleChange = (event) => {
    setAbc(event.target.value);
  };

  let navigate = useNavigate();

  /* window.addEventListener('click', function (e) {
    if (!document.getElementById('character').contains(e.target)) {
      setExpanded(null);
      
    }
  }); */

  return (
    <div className="container container-charcaters-list">
      <motion.div className="row justify-content-center row-characters-list">
        <motion.div
          className="col-12 d-flex d-xl-none col-pagination-characters-list justify-content-end"
          animate={selectedCharacter && { opacity: 0 }}
          transition={{ duration: 0 }}
        >
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 100 }}
            className="abc-form"
          >
            <InputLabel
              id="demo-simple-select-filled-label"
              className="inputLabel"
            >
              ABC
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              className="select"
              value={abc || 'A'}
              onChange={handleChange}
            >
              <Navigate to={abc.toLowerCase()} replace={true} />
              {alphabet.map((letter) => {
                return (
                  <MenuItem value={letter} className="menuItem" key={letter}>
                    {letter}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </motion.div>
        <motion.div
          className="col-12 d-none d-xl-flex col-pagination-characters-list justify-content-center "
          animate={selectedCharacter && { opacity: 0 }}
          transition={{ duration: 0.0 }}
        >
          <nav aria-label="Page navigation example">
            <ul className="pagination abc">
              <li className="page-item">
                <Link
                  className="page-link"
                  to={
                    letter && letter !== 'a'
                      ? String.fromCharCode(letter.charCodeAt(0) - 1)
                      : 'a'
                  }
                  aria-label="Previous"
                >
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </Link>
              </li>
              {alphabet.map((letter) => {
                return (
                  <li className="page-item" key={letter}>
                    <Link className="page-link" to={letter.toLowerCase()}>
                      {letter}
                    </Link>
                  </li>
                );
              })}

              <li className="page-item">
                <Link
                  className="page-link"
                  to={
                    letter && letter !== 'z'
                      ? String.fromCharCode(letter.charCodeAt(0) + 1)
                      : 'z'
                  }
                  aria-label="Next"
                >
                  <span aria-hidden="true">»</span>
                  <span className="sr-only">Next</span>
                </Link>
              </li>
            </ul>
          </nav>
        </motion.div>

        {isLoading ? (
          alphabet.map((element, index) => {
            return (
              <div
                className="col-6 col-md-4 col-lg-3 col-xl-2 col-characters-list"
                key={index}
              >
                <div className="card-character-list">
                  <Skeleton
                    sx={{ bgcolor: '#37474f' }}
                    variant="rounded"
                    width={280}
                    height={288}
                    className="character-skeleton-list"
                    animation="wave"
                  />

                  <div className="name-characters-list">
                    {/* <h3 className="">{`${character.name.slice(0, 20)}${
                      character.name.length > 20 ? '...' : ''
                    }`}</h3> */}
                  </div>
                </div>
              </div>
            );
          })
        ) : characters.length > 0 ? (
          characters.map((character) => {
            return (
              <motion.div
              // selectedCharacter && { opacity: 0.4 } && 
                // transition={{ duration: 0.3 }}
                initial={{ opacity: 0}}
                animate={{ opacity: 1 , transition: { duration: 2 }}}
                exit={{ opacity: 1, transition: { duration: 0.0 }}} 
                layoutId={character.id}
                
                onClick={() => setSelectedCharacter(character)}
                className="col-6 col-md-4 col-lg-3 col-xl-2 col-characters-list"
                key={character.id}
              >
                <motion.div className="card-character-list">
                  <div className="img-characters-list-div">
                    <motion.img
                      className="img-characters-list"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.8 },
                      }}
                      src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                      alt={character.name}
                    />
                  </div>

                  <div className="name-characters-list">
                    <h3 className="">{`${character.name.slice(0, 20)}${
                      character.name.length > 20 ? '...' : ''
                    }`}</h3>
                  </div>
                </motion.div>
              </motion.div>
            );
          })
        ) : (
          <motion.div
            className="col-12 not-available-characters"
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.4,
            }}
          >
            <h3>Characters not available</h3>
          </motion.div>
        )}
        {selectedCharacter && (
          <div
            className="expanded-col-character-list"
            onClick={() => {
              setExpanded(null);
              setSelectedCharacter(null);
            }}
          ></div>
        )}


        <AnimatePresence>
          {selectedCharacter && (
            <motion.div

              className="container col-character-list"
              layoutId={selectedCharacter.id}
              key={selectedCharacter.id}
               initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0, transition: { duration: 0.6 }}} 

              transition={{ duration: 0.2 }}
              id="character"
            >
              <motion.button
                className="btn btn-outline-warning btn-close-character"
                onClick={() => {
                  setExpanded(null);
                  setSelectedCharacter(null);
                }}
              >
                X
              </motion.button>

              <div className="separator" id="separator">
                <div className="row m-0 justify-content-around row-name-description-character-list">
                  <div className="col-5 img-character-list-div">
                    <div className="img-character-div">
                      <motion.img
                        className="img-character"
                        src={`${selectedCharacter.thumbnail.path}/detail.${selectedCharacter.thumbnail.extension}`}
                        alt={selectedCharacter.name}
                      />
                    </div>
                  </div>
                  <div className="col-7 col-name-description-character-list">
                    <h2 className="character-name">
                      {selectedCharacter.name.toUpperCase()}
                    </h2>
                    <div className="character-description">
                      <span>
                        {selectedCharacter.description
                          ? selectedCharacter.description
                          : 'Description not available'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <Accordion
                    className="acordion-character-list"
                    expanded={expanded === 'panel1'}
                    onChange={handleChangeAcordion('panel1')}
                  >
                    <AccordionSummary
                      className="acordion-character-list-summary"
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                      onClick={() =>
                        expanded !== 'panel1' &&
                        dispatch(
                          loadComics(
                            `${selectedCharacter.id.toString()}character`
                          )
                        )
                      }
                    >
                      <Typography className="acordion-character-list-typography">
                        COMICS
                      </Typography>
                    </AccordionSummary>

                    <div
                      className="comics-character-list"
                      
                    >
                      {!isLoadingComics ? (
                        comics.map((comic) => {
                          return (
                            <motion.div
                            
                              id="comics"
                              key={comic.id}
                              className="comics-character-list-div"
                              onClick={() => navigate(`/comics/${comic.id}`)}
                            >
                              <div className="img-comic-character-div">
                                {/* copiar div en events y series, copiar botones */}

                                <motion.img
                                  className="img-comic-character"
                                  src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                                  alt={comic.title}
                                />
                              </div>
                              <div className="comic-title-character-list">
                                <span>{`${comic.title
                                  .slice(0, 23)
                                  .toUpperCase()}${
                                  comic.title.length > 23 ? '...' : ''
                                }`}</span>
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
                      {comics.length === 0 && (
                        <span className="not-available">
                          Comics not available
                        </span>
                      )}
                      {comics.length > 9 && (
                        <button
                          type="button"
                          className="btn btn-comic-character-list"
                          onClick={() =>
                            navigate(
                              `/comics/${selectedCharacter.id.toString()}-character-All/`
                            )
                          }
                        >
                          See all comics...
                        </button>
                      )}
                    </div>
                  </Accordion>

                  <Accordion
                    className="acordion-character-list"
                    expanded={expanded === 'panel2'}
                    onChange={handleChangeAcordion('panel2')}
                  >
                    <AccordionSummary
                      className="acordion-character-list-summary"
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                      onClick={() =>
                        expanded !== 'panel2' &&
                        dispatch(
                          loadEvents(
                            `${selectedCharacter.id.toString()}character`
                          )
                        )
                      }
                    >
                      <Typography className="acordion-character-list-typography">
                        EVENTS
                      </Typography>
                    </AccordionSummary>

                    <div className="comics-character-list">
                      {!isLoadingEvents ? (
                        events.map((event) => {
                          return (
                            <motion.div
                              key={event.id}
                              className="comics-character-list-div"
                              onClick={() => navigate(`/events/${event.id}`)}
                            >
                              <div className="img-comic-character-div">
                                <motion.img
                                  className="img-comic-character"
                                  src={`${event.thumbnail.path}/portrait_xlarge.${event.thumbnail.extension}`}
                                  alt={event.title}
                                />
                              </div>
                              <div className="comic-title-character-list">
                                <span>{`${event.title
                                  .slice(0, 23)
                                  .toUpperCase()}${
                                  event.title.length > 23 ? '...' : ''
                                }`}</span>
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
                      {events.length === 0 && (
                        <span className="not-available">
                          Events not available
                        </span>
                      )}
                      {events.length > 9 && (
                        <button
                          type="button"
                          className="btn btn-comic-character-list"
                          onClick={() =>
                            navigate(
                              `/events/${selectedCharacter.id.toString()}-character-All/`
                            )
                          }
                        >
                          See all events...
                        </button>
                      )}
                    </div>
                  </Accordion>

                  <Accordion
                    className="acordion-character-list"
                    expanded={expanded === 'panel3'}
                    onChange={handleChangeAcordion('panel3')}
                  >
                    <AccordionSummary
                      className="acordion-character-list-summary"
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                      onClick={() =>
                        expanded !== 'panel3' &&
                        dispatch(
                          loadSeries(
                            `${selectedCharacter.id.toString()}character`
                          )
                        )
                      }
                    >
                      <Typography className="acordion-character-list-typography">
                        SERIES
                      </Typography>
                    </AccordionSummary>

                    <div className="comics-character-list">
                      {!isLoadingSeries ? (
                        series.map((serie) => {
                          return (
                            <motion.div
                              key={serie.id}
                              className="comics-character-list-div"
                              onClick={() => navigate(`/series/${serie.id}`)}
                            >
                              <div className="img-comic-character-div">
                                <motion.img
                                  className="img-comic-character"
                                  src={`${serie.thumbnail.path}/portrait_xlarge.${serie.thumbnail.extension}`}
                                  alt={serie.title}
                                />
                              </div>
                              <div className="comic-title-character-list">
                                <span>{`${serie.title
                                  .slice(0, 23)
                                  .toUpperCase()}${
                                  serie.title.length > 23 ? '...' : ''
                                }`}</span>
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
                      {series.length === 0 && (
                        <span className="not-available">
                          Series not available
                        </span>
                      )}
                      {series.length > 9 && (
                        <button
                          type="button"
                          className="btn btn-comic-character-list"
                          onClick={() =>
                            navigate(
                              `/series/${selectedCharacter.id.toString()}-character-All/`
                            )
                          }
                        >
                          See all series...
                        </button>
                      )}
                    </div>
                  </Accordion>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default CharactersList;
