import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadCharacters = createAsyncThunk(
  'characters/loadCharacters',
  async (letter = 'a') => {
    const response = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${letter}&orderBy=name&limit=50&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`
    );
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
        console.log(state.hasError)
      });
  },
});

export const selectCharacters = (state) => state.characters.charactersArray;
export const selectIsLoading = (state) => state.characters.isLoading;
export const selectHasError = (state) => state.characters.hasError;

export default charactersSlice.reducer;
