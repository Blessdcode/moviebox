import { configureStore } from "@reduxjs/toolkit";
import movieoReducer from "./movies/movies.reducers";

export const store = configureStore({
  reducer: {
    movieoData: movieoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;