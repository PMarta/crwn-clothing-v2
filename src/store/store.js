import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";
//logger->allows us to see what the state looks like
// before an action is dispatched, what the action is,
// and then how the state looks after the action

//middlewares->it s kind of library helpers that run before an action hits the reducer: dispatch action->middleware->reducer
const middleWares = [logger];
// console.log('compose', compose)
// console.log('middleWares:',...middleWares)
const composedEnhancers = compose(applyMiddleware(...middleWares));
// console.log('compose:',composedEnhancers)
export const store = createStore(rootReducer, undefined, composedEnhancers);