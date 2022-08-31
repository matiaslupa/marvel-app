import { configureStore } from '@reduxjs/toolkit';

//Reducers
import charactersReducer from '../features/Characters/CharactersSlice';
import comicsReducer from '../features/Comics/ComicsSlice'
import navBarReducer from '../features/NavBar/NavBarSlice'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    comics: comicsReducer,
    navBar: navBarReducer,
  },
});
