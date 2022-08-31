import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const loadComics = createAsyncThunk(
  'comics/loadComics',

  
  async (comic ) => {
    const regex = /^[0-9]*$/;
    let url = ''
    if (regex.test(comic)) {
      url = `https://gateway.marvel.com:443/v1/public/characters/${comic}/comics?orderBy=onsaleDate&limit=50&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }else{
      url = `https://gateway.marvel.com:443/v1/public/comics?format=comic&titleStartsWith=${comic}&orderBy=onsaleDate&limit=50&ts=1000&apikey=ed2af8fad6429d8d927d100991c84a26&hash=be93f5fa58ad58c9ef658f7e99e84904`;
    }

    const response = await fetch(url)
    const json = await response.json();
    return json.data.results;
  }
);


export const comicsSlice = createSlice({
  name: 'comics',
  initialState: {
    comicsArray: [],
    isLoading: false,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComics.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadComics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comicsArray = action.payload; 
        
        
           
      })
      .addCase(loadComics.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },

  

 
  
});

export const selectComics = (state) => state.comics.comicsArray;
export const selectIsLoadingComics = (state) => state.comics.isLoading;
export const selectHasError = (state) => state.comics.hasError;


export default comicsSlice.reducer;