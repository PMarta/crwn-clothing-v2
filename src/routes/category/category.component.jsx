import { useParams } from 'react-router-dom';
import { Fragment, useState } from 'react';
import './category.styles.scss';

import React, { useContext, useEffect } from 'react'
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {
    const {category} = useParams();//folosesc :category de la Route path din Shop(parinte)
    console.log('render/re-rendering category component');
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        console.log('use effect fired calling setProducts')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);



  return (
    <Fragment>
        <h2 className='category-title'> {category.toUpperCase()}</h2>
        <div className='category-container'>
            {
                products && products.map((product)=>(
                    <ProductCard key={product.is} product={product} />
                ))
            }
        </div>
    </Fragment>
  )

}

export default Category