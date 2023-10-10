import { Dispatch } from "redux";
import {
  COUNTRY_PROCESSING,
  COUNTRY_ADD_SUCCESSFUL,
} from "./type";

interface LoginPayload {
  primary: string;
  shortName: string;
  id:string;
  mobile: string
}

// Define the action types
export interface UserSuccessfulAction {
  type: typeof COUNTRY_ADD_SUCCESSFUL;
  payload: any; // Update the payload type as needed
}
export interface UserProcessingAction {
  type: typeof COUNTRY_PROCESSING;
  
}
// Create a union type for all possible actions
export type UserActionTypes =
  | UserSuccessfulAction
  | UserProcessingAction
  

export const userAction = (payload: LoginPayload) => {
  // console.log("payload ser", payload);
  return {
    type: COUNTRY_ADD_SUCCESSFUL,
    payload,
  };
};
