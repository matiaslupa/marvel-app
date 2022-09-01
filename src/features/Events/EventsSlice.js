import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadEvents = createAsyncThunk(
  'events/loadEvents',
  async (event = 'a') => {
    const regex = /^[0-9]*$/;
    let url = '';

    if (regex.test(event) && event.length <= 5) {
      url = `https://gateway.marvel.com:443/v1/public/events?comics=${event}&orderBy=name&limit=5&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    } else if (regex.test(event) && event.length > 5) {
      url = `https://gateway.marvel.com:443/v1/public/events/${event}?ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    } else {
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
