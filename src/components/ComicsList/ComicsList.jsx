import React, { useEffect, useState } from 'react'
import './ComicsList.css'

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
  
  import { useSelector, useDispatch } from 'react-redux';
  
  import { useParams, Link, Navigate } from 'react-router-dom';
  
  import { motion, AnimatePresence } from 'framer-motion';
  
  import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';
  import FormControl from '@mui/material/FormControl';
  import Select from '@mui/material/Select';

const ComicsList = () => {
    const [selectedComic, setSelectedComic] = useState(null);
  const [abc, setAbc] = useState('');

  const characters = useSelector(selectCharacters);
  const isLoading = useSelector(selectIsLoading);

  const comics = useSelector(selectComics);
  const isLoadingComics = useSelector(selectIsLoadingComics);

  

  let { letter = 'amazing spider-man' } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadComics(letter));
  }, [letter]);

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
          animate={selectedComic && { opacity: 0.6 }}
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
          animate={selectedComic && { opacity: 0.6 }}
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

        {isLoadingComics ? (
          <div className="col-12 spinner-characters-list d-flex justify-content-center">
            <div className="spinner-border " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          comics.map((comic) => {
            return (
              <motion.div
                layoutId={comic.id}
                animate={selectedComic && { opacity: 0.6 }}
                transition={{ duration: 0.1 }}
                onClick={() => setSelectedComic(comic)}
                className="col-6 col-md-4 col-lg-3 col-xl-2 col-characters-list"
                key={comic.id}
              >
                <motion.div
                  className="card-character-list"
                  onClick={() => dispatch(loadCharacters(comic.id.toString()))}
                >
                  <motion.img
                    className="img-characters-list"
                    src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />

                  <div className="name-characters-list name-comics-list">
                    <h3 className="">{`${comic.title.slice(0, 17)}${
                      comic.title.length > 17 ? '...' : ''
                    }`}</h3>
                  </div>
                </motion.div>
              </motion.div>
            );
          })
        )}

        <AnimatePresence>
          {selectedComic && (
            <motion.div
              className="container col-character-list col-comic-list"
              layoutId={selectedComic.id}
              key={selectedComic.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.1 }}
            >
              
                
              <motion.button
                className="btn btn-outline-warning btn-close-character"
                onClick={() => setSelectedComic(null)}
                >
                X
              </motion.button>
                

              <div className="row m-0 justify-content-center row-name-description-character-list">
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

                <div className="col-5 img-character-list-div img-comic-list-div">
                  <motion.img
                    className="img-character"
                    src={`${selectedComic.thumbnail.path}/detail.${selectedComic.thumbnail.extension}`}
                    alt={selectedComic.name}
                  />
                </div>
              </div>
              <div className="comics-character-list characters-comic-list">
                {!isLoading ? (
                  characters.map((character) => {
                    return (
                      <motion.div
                        key={character.id}
                        className="comics-character-list-div"
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
    
  
}

export default ComicsList