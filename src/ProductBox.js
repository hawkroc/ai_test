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
 //console.log(""+url);
    axios.get(url)
      .then(res => {
        this.setState({ data: res.data });
      })
  };

  handleProductSubmit=(product)=> {
 let products = this.state.data;

    axios.post(apiUrl, product)
    .then(res => {
      product =res.data;
          console.log('product    '+JSON.stringify(product));  
           let newProduct = products.concat([product]);

    this.setState({ data: newProduct });
      })
    .catch(err => {
        console.error(err);
       
      });

      
   // product.id = Date.now();
  
  };
  handleProductDelete=(id,index)=> {
    if(!id){
      return;
    }
       
    axios.delete(`${apiUrl}/${id}`)
      .then(res => {
      //  console.log('Products deleted   '+`${apiUrl}/${id}`);  
      })
      .catch(err => {          
        console.error(err);
      });
     let products = this.state.data;
        products.splice(index,1);
        this.setState({ data: products });

  };
  handleProductUpdate=(id, product,index)=> {
    axios.put(`${apiUrl}/${id}`, product)

 .then(res => {
      product =res.data;
       let products = this.state.data;
        products[index]=product;
        this.setState({ data: products });
      })
      .catch(err => {
        console.log(err);
      });

     
  };
  componentDidMount=()=> {
    this.loadProducts();
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
