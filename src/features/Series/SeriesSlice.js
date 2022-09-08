import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const loadSeries = createAsyncThunk(
  'series/loadSeries',

  
  async (serie ) => {
    const regex = /^[0-9]*$/;
    let url = ''


    
    if(regex.test(serie) ){

      // Only one serie by ID
      url = `https://gateway.marvel.com:443/v1/public/series/${serie}?ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;


    } 
    
    else if(serie.endsWith('character')){
      // By character ID
      url = `https://gateway.marvel.com:443/v1/public/characters/${serie.slice(0,-9)}/series?contains=comic&orderBy=-startYear&limit=10&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }

    else if(serie.endsWith('-character-All')){
      // By character ID ALL
      url = `https://gateway.marvel.com:443/v1/public/characters/${serie.slice(0,-9)}/series?contains=comic&orderBy=-startYear&limit=100&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }

    else if(serie.endsWith('comic')){
      // By comic ID
      url = `https://gateway.marvel.com:443/v1/public/characters/${serie.slice(0,-9)}/series?contains=comic&orderBy=title&limit=10&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }

    else if(serie.endsWith('events')){
      // By event ID
      url = `https://gateway.marvel.com:443/v1/public/events/${serie.slice(0,-6)}/series?orderBy=startYear&limit=10&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }

    else if(serie.endsWith('-events-All')){
      // By event ID
      url = `https://gateway.marvel.com:443/v1/public/events/${serie.slice(0,-11)}/series?orderBy=-startYear&limit=100&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }
    
    
    else{

      // By letter name start...
      url = `https://gateway.marvel.com/v1/public/series?titleStartsWith=${serie}&contains=comic&orderBy=title&limit=20&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }

    const response = await fetch(url)
    const json = await response.json();
    return json.data.results;
  }
);


export const seriesSlice = createSlice({
  name: 'series',
  initialState: {
    seriesArray: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSeries.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadSeries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seriesArray = action.payload; 
        
        
        
           
      })
      .addCase(loadSeries.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },

  

 
  
});

export const selectSeries = (state) => state.series.seriesArray;
export const selectIsLoadingSeries = (state) => state.series.isLoading;
export const selectHasError = (state) => state.series.hasError;


export default seriesSlice.reducer;
