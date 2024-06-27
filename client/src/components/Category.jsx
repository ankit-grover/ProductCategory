import React from 'react';
import {CategoryCard} from './CategoryList/Category.styles';

const Category = (props) => {
    
    return (
        <div key={props.category.id} className="col-md-6 col-lg-4 mb-4">
        <CategoryCard to={`/shop/${props.category.id}`} className="card">
            <div className="card">
            <h5 className="card-title">{props.category.name}</h5>
            </div>
        </CategoryCard>
        </div>
    );
  };
  
  export default Category;