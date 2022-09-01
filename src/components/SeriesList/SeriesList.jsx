import React, { useEffect, useState } from 'react';
import './SeriesList.css';

import { useSelector, useDispatch } from 'react-redux';

import {
  loadSeries,
  selectSeries,
  selectIsLoadingSeries,
} from '../../features/Series/SeriesSlice';

import {
  loadCharacters,
  selectCharacters,
  selectIsLoading,
  selectHasError,
} from '../../features/Characters/CharactersSlice';

import {
  selectComics,
  selectIsLoadingComics,
  loadComics,
} from '../../features/Comics/ComicsSlice';

import {
  toggleNavBarTrue,
  toggleNavBarFalse,
  selectNavBar,
} from '../../features/NavBar/NavBarSlice';

import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SeriesList = () => {
  const series = useSelector(selectSeries);
  const isLoadingSeries = useSelector(selectIsLoadingSeries);

  const [selectedSerie, setSelectedSerie] = useState(null);
  const [abc, setAbc] = useState('');

  const characters = useSelector(selectCharacters);
  const isLoading = useSelector(selectIsLoading);

  const comics = useSelector(selectComics);
  const isLoadingComics = useSelector(selectIsLoadingComics);

  let navigate = useNavigate();

  

  let { letter = 'a' } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSeries(letter));

    
  }, [letter]);

  useEffect(() => {
  
    if(selectedSerie){
      dispatch(toggleNavBarTrue())
    }else{
      dispatch(toggleNavBarFalse())
    } 
    
  }, [selectedSerie]);

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const handleChange = (event) => {
    setAbc(event.target.value);
  };

  

  return (
    <div className="container container-charcaters-list">
      <motion.div className="row justify-content-center row-characters-list">
        <motion.div
          className="col-12 d-flex d-xl-none col-pagination-characters-list justify-content-end"
          animate={selectedSerie && { opacity: 0.6 }}
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
          animate={selectedSerie && { opacity: 0.6 }}
        >
          <nav aria-label="Page navigation example">
            <ul className="pagination abc abc-series">
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

        {isLoadingSeries ? (
          <div className="col-12 spinner-characters-list d-flex justify-content-center">
            <div className="spinner-border " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          series.map((serie) => {
            return (
              <motion.div
                layoutId={serie.id}
                animate={selectedSerie && { opacity: 0.6 }}
                transition={{ duration: 0.1 }}
                onClick={() => setSelectedSerie(serie)}
                className="col-6 col-md-4 col-lg-3 col-xl-2 col-characters-list"
                key={serie.id}
              >
                <motion.div
                  className="card-character-list"
                  onClick={() => dispatch(loadCharacters(`${serie.id.toString()}s`))}
                >
                  <motion.img
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.8 },
                    }} 
                    className="img-characters-list"
                    src={`${serie.thumbnail.path}/portrait_uncanny.${serie.thumbnail.extension}`}
                    alt={serie.title}
                  />

                  <div className="name-characters-list name-series-list">
                    <h3 className="">{`${serie.title.slice(0, 20)}${
                      serie.title.length > 20 ? '...' : ''
                    }`}</h3>
                  </div>
                </motion.div>
              </motion.div>
            );
          })
        )}

        <AnimatePresence>
          {selectedSerie && (
            <motion.div
              className="container col-character-list col-serie-list"
              layoutId={selectedSerie.id}
              key={selectedSerie.id}
              
              transition={{ duration: 0.1 }}
            >
              <motion.button
                className="btn btn-outline-warning btn-close-character"
                onClick={() => setSelectedSerie(null)}
              >
                X
              </motion.button>

              <div className="row m-0 justify-content-around row-name-description-character-list">
                <div className="col-5 img-character-list-div img-serie-list-div">
                  <motion.img

                    className="img-character"
                    src={`${selectedSerie.thumbnail.path}/detail.${selectedSerie.thumbnail.extension}`}
                    alt={selectedSerie.name}
                  />
                </div>
                <div className="col-7 col-name-description-character-list">
                  <h2 className="character-name">
                    {selectedSerie.title.toUpperCase()}
                  </h2>
                  <div className="character-description">
                    <span>
                      {selectedSerie.description
                        ? selectedSerie.description
                        : 'Description not available'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="comics-character-list characters-serie-list">
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

export default SeriesList;