import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadEvents = createAsyncThunk(
  'events/loadEvents',
  async (event = 'a') => {
    const regex = /^[0-9]*$/;
    let url = '';

    if (event.includes('character')) {

      // By character ID
      url = `https://gateway.marvel.com:443/v1/public/characters/${event.slice(0,-9)}/events?orderBy=name&limit=10&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;


    } else if (event.includes('comic')) {

      // By comic ID
      url = `https://gateway.marvel.com:443/v1/public/comics/${event.slice(0,-5)}/events?orderBy=name&limit=10&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;

    }  else if (event.includes('series')) {

        // By serie ID
        url = `https://gateway.marvel.com:443/v1/public/series/${event.slice(0,-6)}/events?orderBy=name&limit=10&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
  
  
      
      
    
    } else if (regex.test(event)) {

      // Only one event by ID
      url = `https://gateway.marvel.com:443/v1/public/events/${event}?ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;

    }else if (event.length === 1 ){

        // By letter start name
        url = `https://gateway.marvel.com:443/v1/public/events?nameStartsWith=${event}&orderBy=name&limit=100&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
      
    } else if (!event ){

      // By default
      url = `https://gateway.marvel.com:443/v1/public/events?limit=5&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }

    const response = await fetch(url);
    const json = await response.json();
    return json.data.results;
  }
);

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    eventsArray: [],
    isLoadingEvents: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => {
        state.isLoadingEvents = true;
        state.hasError = false;
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.isLoadingEvents = false;
        state.eventsArray = action.payload;
        // console.log(state.eventsArray)
        
      })
      .addCase(loadEvents.rejected, (state) => {
        state.isLoadingEvents = false;
        state.hasError = true;
        
      });
  },
});

export const selectEvents = (state) => state.events.eventsArray;
export const selectIsLoadingEvents = (state) => state.events.isLoadingEvents;
export const selectHasError = (state) => state.events.hasError;

export default eventsSlice.reducer;
