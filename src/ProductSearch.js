import React, { Component } from 'react';
import style from './style';

class ProductSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { name: ''};
  };
  
  handleSubmit=(e)=>{
    e.preventDefault();
    let name = this.state.name.trim();
    this.props.onProductSubmit({name: name});
  };

 nameChange =(e)=> {
    this.setState({ name: e.target.value });
  };


  render() {
    return (
      <div>
      <form style={ style.productForm } onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='search by product name....'
          style={ style.productFormPrice}
           value={ this.state.name }
              onChange={ this.nameChange } 
          />
       
        <input
          type='submit'
          style={ style.productFormPost }
          value='search'/>
      </form>
      </div>
    )
  };
};

export default ProductSearch;
