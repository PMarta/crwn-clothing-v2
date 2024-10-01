// import USER_ACTION_TYPES from "./user.types";

// const INITIAL_STATE={
//     currentUser: null
// }
// //functia care se apeleaza cand un event/ whatever se activeaza
// export const userReducer = (state=INITIAL_STATE, action={}) => {
//     const {type, payload} = action;

//     switch(type){
//         case USER_ACTION_TYPES.SET_CURRENT_USER:
//             return {
//                 ...state,
//                 currentUser: payload
//             }
//         default:
//             return state;
//     }
// }

import USER_ACTION_TYPES from './user.types';

export const USER_INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};