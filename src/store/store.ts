import { configureStore } from "@reduxjs/toolkit";
import movieoReducer from "./movies/movies.reducers";

export const store = configureStore({
  reducer: {
    movieoData: movieoReducer,
  },
});
