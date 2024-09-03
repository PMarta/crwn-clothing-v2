import {createContext, useState, useEffect} from 'react';
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap};
    
    // useEffect(() => {
    //    addCollectionAndDocuments('categories', SHOP_DATA);
    // },[]); / asta o rulez doar o data pt ca am control atat in FE cat si in BE si am invatat cum sa adaug date in firebase db

    useEffect(() => {
        //asa apelez o functie async in useEffect cel mai bine ca sa iau datele din DB in cazul meu
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
}