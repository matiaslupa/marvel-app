import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadCharacters = createAsyncThunk(
  'characters/loadCharacters',
  async (letter = 'a') => {

    const regex = /^[0-9]*$/;
    let url = ''

    if (letter.includes('comic')) {

      // By comic ID
      url = `https://gateway.marvel.com:443/v1/public/characters?comics=${letter.slice(0,-5)}&orderBy=name&limit=5&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;

    }else if(regex.test(letter)){

      // Only one character by ID
      url = `https://gateway.marvel.com:443/v1/public/characters/${letter}?ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;


    }else if(letter.includes('events')){

      // By event ID
      url = `https://gateway.marvel.com:443/v1/public/events/${letter.slice(0,-6)}/characters?orderBy=name&limit=5&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;


    }else if( letter.includes('s')){

      // By serie ID
      url = `https://gateway.marvel.com:443/v1/public/series/${letter.slice(0,-1)}/characters?orderBy=name&limit=25&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }
    
    
    else{

      // By letter name start...
      url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${letter}&orderBy=name&limit=10&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }

    

    const response = await fetch(url)
    const json = await response.json();
    return json.data.results;
  }
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    charactersArray: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCharacters.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.charactersArray = action.payload;
        
        
      })
      .addCase(loadCharacters.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        
      });
  },
});

export const selectCharacters = (state) => state.characters.charactersArray;
export const selectIsLoading = (state) => state.characters.isLoading;
export const selectHasError = (state) => state.characters.hasError;

export default charactersSlice.reducer;
