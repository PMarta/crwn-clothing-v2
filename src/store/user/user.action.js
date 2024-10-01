// import { createAction } from "../../utils/reducer/reducer.utils";
// import USER_ACTION_TYPES from "./user.types";

// export const setCurrentUser = (user) =>
//     createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);//return{type:'', payload: user}

// //actiunea->care va fi apelata intr un dispatch

import USER_ACTION_TYPES from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);