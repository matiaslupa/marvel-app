import { createSlice } from '@reduxjs/toolkit';

export const navBarSlice = createSlice({
  name: 'navBar',
  initialState: {
    navBarSwitch: false,
    searchTerm: "",
  },
  reducers: {
    toggleNavBarTrue: (state) => {
      state.navBarSwitch = true;
    },

    toggleNavBarFalse: (state) => {
      state.navBarSwitch = false;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
});

export const selectSearchTerm = (state) => state.navBar.searchTerm;

export const selectNavBar = (state) => state.navBar.navBarSwitch;

export const { toggleNavBarTrue, toggleNavBarFalse, setSearchTerm, clearSearchTerm  } = navBarSlice.actions;

export default navBarSlice.reducer;
