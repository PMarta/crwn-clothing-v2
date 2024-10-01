// import SHOP_DATA from '../../shop-data.json';
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';
const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        //asa apelez o functie async in useEffect cel mai bine ca sa iau datele din DB in cazul meu

        const getCategories = async () => {
    
            const categoriesArray = await getCategoriesAndDocuments('categories');
            console.log(categoriesArray)
            dispatch(setCategories(categoriesArray));
        };

        getCategories();
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

// :category poate fi redenumit cum vreau eu, ideea e ca valoarea lui va fi luata din url
//ex: /shop/hats ->category=hats
// /shop/marta - >category=marta
export default Shop;