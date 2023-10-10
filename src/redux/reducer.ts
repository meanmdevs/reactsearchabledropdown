import { combineReducers } from "redux";
import countryReducer, { State , ActionTypes } from "./users";

export interface RootState {
  countriesData: State; // Use the State type from your loginReducer
}

export type RootAction = ActionTypes; // Use the ActionTypes type from your loginReducer

const rootReducer = combineReducers<RootState>({
  countriesData: countryReducer,
});

export default rootReducer;
