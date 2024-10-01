import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; //sau pot face import la middleware ul meu
import { persistStore,  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

import rootReducer from "./root-reducer";
//logger->allows us to see what the state looks like
// before an action is dispatched, what the action is,
// and then how the state looks after the action

//middlewares->it s kind of library helpers that run before an action hits the reducer: dispatch action->middleware->reducer
// console.log('compose', compose)
// console.log('middleWares:',...middleWares)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']//singurul data store pe care vreau sa l salvez in localStorage 
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean);//in production nu mi se va rula logger ul

//config pentru devtools redux chrome extension
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; 
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
// console.log('compose:',composedEnhancers)
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
export const persistor = persistStore(store);