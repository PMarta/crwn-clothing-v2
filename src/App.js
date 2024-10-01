import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';


import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { setCurrentUser } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('App');
    const unsubscribe = onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
       dispatch(setCurrentUser(user));
    });

    return unsubscribe;
},[]);
//deci am eroarea de mai sus cu missing dependency. Aparent reactHook nu prea stie ca dispatch method din redux nu se 
//modifica niciodata. Adica react nu stie ca dependinta de la useDispatch nu se schimba, referinta nu se schimba. 
//Pot adauga [dispatch] dar va fi a bit confusing deci depinde de la echipa la alta dca vreau sau nu sa adaug [dispatch]
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};
//* inseamna ca path route face match la orice vine dupa shop
export default App;
