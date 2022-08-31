import { createSlice } from '@reduxjs/toolkit';

export const navBarSlice = createSlice({
    name: 'navBar',
    initialState: {
        navBarSwitch: false,
    },
    reducers: {
        toggleNavBarTrue: (state) => {
            state.navBarSwitch = true;
           
      },

      toggleNavBarFalse: (state) => {
        state.navBarSwitch = false;
        
  },
    },
    
  });


  export const selectNavBar = (state) => state.navBar.navBarSwitch;

  export const { toggleNavBarTrue, toggleNavBarFalse } = navBarSlice.actions;


export default navBarSlice.reducer;