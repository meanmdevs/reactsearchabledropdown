import { UserActionTypes } from "./action";
import {
  COUNTRY_PROCESSING,
  COUNTRY_ADD_SUCCESSFUL,
   
  } from "./type";
  
  export interface State {
    processing: boolean;
    user: {
      primary: '', shortName: '',id:0,mobile: ""
    }[]; // Update the type as needed
  }

  const defaultReducer: State = {
    processing: false,
    user: [],
  };
  export type ActionTypes =UserActionTypes
   
  
  const countryReducer = (state: State = defaultReducer, action: ActionTypes) => {
    switch (action.type) {
      case COUNTRY_ADD_SUCCESSFUL:
        return {
          ...state,
          processing: false,
         
          user: action.payload,
        };
  
      case COUNTRY_PROCESSING:
        return {
          ...state,
          processing: true,
        };
      
      default:
        return state;
    }
  };
  
  export default countryReducer;
  