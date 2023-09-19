import { configureStore, createImmutableStateInvariantMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two']
})

export default function configureAppStore(initialState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, immutableInvariantMiddleware],
    initialState
  });

  return store
}
