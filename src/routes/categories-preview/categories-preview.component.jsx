import {Fragment } from 'react';

import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

import { useSelector } from 'react-redux';

const CategoriesPreview = () => {
  
    const categories = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
      <Fragment>
        {isLoading ? (
          <Spinner />
        ) : (
          categories &&
          Object.keys(categories).map((title) => {
            //hashtable algorithmic structure
            const products = categories[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            );
          })
        )}
      </Fragment>
    );
}

export default CategoriesPreview