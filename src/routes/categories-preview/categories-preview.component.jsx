import {Fragment } from 'react';

import { selectCategoriesMap } from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';

const CategoriesPreview = () => {
  
    const categories = useSelector(selectCategoriesMap);
    console.log(useSelector(selectCategoriesMap))

    return (
        <Fragment>
          {
            categories && Object.keys(categories).map(title => {//hashtable algorithmic structure
                const products = categories[title];
                return <CategoryPreview key={title} title={title} products={products} />
            })
          }
        </Fragment>
    )
}

export default CategoriesPreview