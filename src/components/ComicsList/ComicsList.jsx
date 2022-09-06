import React, { useEffect, useState } from 'react';
import './ComicsList.css';

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

const ComicsList = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChangeAcordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [selectedComic, setSelectedComic] = useState(null);

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
    dispatch(loadComics(letter));
  }, [letter]);

  useEffect(() => {
    if (selectedComic) {
      dispatch(toggleNavBarTrue());
    } else {
      dispatch(toggleNavBarFalse());
    }
  }, [selectedComic]);

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const handleChange = (event) => {
    setAbc(event.target.value);
  };

  let navigate = useNavigate();

  return (
    <div className="container container-charcaters-list">
      <motion.div className="row justify-content-center row-characters-list">
        <motion.div
          className="col-12 d-flex d-xl-none col-pagination-characters-list justify-content-end"
          animate={selectedComic && { opacity: 0 }}
          transition={{ duration: 0 }}
        >
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 100 }}
            className="abc-form "
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
          animate={selectedComic && { opacity: 0 }}
          transition={{ duration: 0 }}
        >
          <nav aria-label="Page navigation example">
            <ul className="pagination abc abc-comics">
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

        {isLoadingComics ? (
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

                  <div className="name-characters-list name-comics-list">
                    {/* <h3 className="">{`${character.name.slice(0, 20)}${
                      character.name.length > 20 ? '...' : ''
                    }`}</h3> */}
                  </div>
                </div>
              </div>
            );
          })
        ) : comics.length > 0 ? (
          comics.map((comic) => {
            return (
              <motion.div
                layoutId={comic.id}
                animate={selectedComic && { opacity: 0.4 }}
                transition={{ duration: 0 }}
                onClick={() => setSelectedComic(comic)}
                className="col-6 col-md-4 col-lg-3 col-xl-2 col-characters-list"
                key={comic.id}
              >
                <motion.div className="card-character-list">
                <div className='img-characters-list-div'>
                  <motion.img
                    className="img-characters-list"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.8 },
                    }}
                    src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  </div>
                  <div className="name-characters-list name-comics-list">
                    <h3 className="">{`${comic.title.slice(0, 20)}${
                      comic.title.length > 20 ? '...' : ''
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
            <h3>Comics not available</h3>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedComic && (
            <motion.div
              className="container col-character-list col-comic-list"
              layoutId={selectedComic.id}
              key={selectedComic.id}
              transition={{ duration: 0 }}
              id="character"
            >
              <motion.button
                className="btn btn-outline-warning btn-close-character"
                onClick={() => {
                  setExpanded(null);
                  setSelectedComic(null);
                }}
              >
                X
              </motion.button>

              <div className="separator" id="separator">
                <div className="row m-0 justify-content-around row-name-description-character-list">
                  <div className="col-5 img-character-list-div">
                    <div className="img-character-div img-comic-div">
                      <motion.img
                        className="img-character"
                        src={`${selectedComic.thumbnail.path}/detail.${selectedComic.thumbnail.extension}`}
                        alt={selectedComic.title}
                      />
                    </div>
                  </div>
                  <div className="col-7 col-name-description-character-list">
                    <h2 className="character-name">
                      {selectedComic.title.toUpperCase()}
                    </h2>
                    <div className="character-description">
                      <span>
                        {selectedComic.description
                          ? selectedComic.description
                          : 'Description not available'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <Accordion
                    className="acordion-character-list acordion-comic-list"
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
                          loadCharacters(`${selectedComic.id.toString()}comic`)
                        )
                      }
                    >
                      <Typography className="acordion-character-list-typography">
                        CHARACTERS
                      </Typography>
                    </AccordionSummary>

                    <div className="comics-character-list">
                      {!isLoading ? (
                        characters.map((character) => {
                          return (
                            <motion.div
                              key={character.id}
                              className="comics-character-list-div"
                              onClick={() =>
                                navigate(`/characters/${character.id}`)
                              }
                            >
                              <motion.img
                                className="img-comic-character"
                                src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                                alt={character.name}
                              />
                              <div className="comic-title-character-list">
                                <span>{`${character.name
                                  .slice(0, 23)
                                  .toUpperCase()}${
                                  character.name.length > 23 ? '...' : ''
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
                      {characters.length === 0 && (
                        <span className="not-available">
                          Characters not available
                        </span>
                      )}
                    </div>
                  </Accordion>

                  <Accordion
                    className="acordion-character-list acordion-comic-list"
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
                          loadEvents(`${selectedComic.id.toString()}comic`)
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
                              <motion.img
                                className="img-comic-character"
                                src={`${event.thumbnail.path}/portrait_xlarge.${event.thumbnail.extension}`}
                                alt={event.title}
                              />
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
};

export default ComicsList;
