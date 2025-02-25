// src/store/index.ts
import { createStore, combineReducers } from "redux";
// import thunk,{} from "redux-thunk";
import moviesReducer from "./movies/movies.reducers";

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  movieoData: moviesReducer, // Ensure this is pointing to the correct reducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
