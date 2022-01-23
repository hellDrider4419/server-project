import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "apiDataReducer",
  initialState: {
    LiveMatchesData: 0,
    todaysTour: 0,
    lol: 0,
    rl: 0,
    codmw: 0,
    dota2: 0,
    ow: 0,
    pubg_pc: 0,
    r6siege: 0,
    todaysMatches: 0,
  },
  reducers: {
    ApiCall: (state, action) => {
      state[action.payload[0]] = action.payload[1];
    },
  },
});

// Action creators are generated for each case reducer function
export const { ApiCall } = counterSlice.actions;

export default counterSlice.reducer;
