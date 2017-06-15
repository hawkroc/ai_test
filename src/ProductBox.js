import React, { Component } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductSearch from './ProductSearch';
import style from './style';
const apiUrl="http://localhost:3001/api/product";
const search="http://localhost:3001/api/search";
class ProductBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  };

  loadProducts=()=> {
    axios.get(apiUrl)
      .then(res => {
        this.setState({ data: res.data });
      })
  };


  searchProducts=(keyword)=> {
    //let name=keyword.name;
 let url= `${search}/${keyword.name}`;
 console.log(""+url);
    axios.get(url)
      .then(res => {
        this.setState({ data: res.data });
      })
  };

  handleProductSubmit=(product)=> {
    let products = this.state.data;
    product.id = Date.now();
    let newProduct = products.concat([product]);
    this.setState({ data: newProduct });
    axios.post(apiUrl, product)
      .catch(err => {
        console.error(err);
        this.setState({ data: products });
      });
  };
  handleProductDelete=(id,index)=> {
    if(!id){
      return;
    }
       let products = this.state.data;
        products.splice(index,1);
        this.setState({ data: products });
    axios.delete(`${apiUrl}/${id}`)
      .then(res => {
        console.log('Products deleted');
      })
      .catch(err => {
        console.error(err);
      });
  };
  handleProductUpdate=(id, product,index)=> {
      let products = this.state.data;
        products[index]=product;
        this.setState({ data: products });
    axios.put(`${apiUrl}/${id}`, product)
      .catch(err => {
        console.log(err);
      })
  };
  componentDidMount=()=> {
    this.loadProducts();
   //setInterval(this.loadProducts, this.props.pollInterval);
  };
  render() {
    return (
      <div style={ style.productBox }>
        <h2 style={ style.title }>Products:</h2>
        
      <ProductSearch onProductSubmit={ this.searchProducts }/>
      <ProductList
        onProductDelete={ this.handleProductDelete }
        onProductUpdate={ this.handleProductUpdate }
        data={ this.state.data }/>
      <ProductForm onProductSubmit={ this.handleProductSubmit }/>
      </div>
    )
  };
};

export default ProductBox;
