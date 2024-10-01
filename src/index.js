import React from "react";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import {store, persistor} from './store/store';

// import { createRoot } from 'react-dom/client';
import { render } from "react-dom";

const container = document.getElementById("root");
// const root=createRoot(container);

render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>
  container
);
