// store.ts
import { createStore, compose, applyMiddleware, Store } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import rootReducer,{ RootState, RootAction } from "./reducer";
// import rootReducer, { RootState, RootAction } from "./rootReducer";
import storage from 'redux-persist/lib/storage';

const composeEnhancers =
  typeof window === "object" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["loginUsers", "configurations"],
};

const persistedReducer = persistReducer<RootState, RootAction>(persistConfig, rootReducer);

export const store: Store<RootState, RootAction> = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<RootState, RootAction>))
);

export const persistor: Persistor = persistStore(store);
