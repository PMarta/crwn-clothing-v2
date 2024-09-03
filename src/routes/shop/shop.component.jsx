// import SHOP_DATA from '../../shop-data.json';
import {Routes, Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {

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