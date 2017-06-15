import React, { Component } from 'react';
import Product from './Product';
import style from './style';

class ProductList extends Component {

  render() {
    let productNodes = this.props.data.map((product,i) => {
      return (
  
        <Product
          name={ product.name }
          text={ product.text }
          uniqueID={ product['_id'] }
          index={i}
          onProductDelete={ this.props.onProductDelete }
          onProductUpdate={ this.props.onProductUpdate }
          key={i}>
        </Product>
    
      
      )
    })
    return (
      <div style={ style.productList }>
        {productNodes}
      </div>
    )
  }
}

export default ProductList;
