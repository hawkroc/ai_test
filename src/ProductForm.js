import React, { Component } from 'react';
import style from './style';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = { alarm:false,name: '', text: '' };
  };
  nameChange =(e)=> {
    this.setState({ name: e.target.value });
  };
  priceChange=(e)=> {
    this.setState({ text: e.target.value });
  };
  handleSubmit=(e)=>{
    e.preventDefault();
    let name = this.state.name.trim();
    let text = this.state.text.trim();
    if (!text || !name) {
      return;
    }
    if(isNaN(text)){
       this.setState({ alarm:true});
      return;
    }
    this.props.onProductSubmit({name: name, text: text });
    this.setState({alarm:false,  name: '', text: '' });
  };
  render() {
    return (
      <div>
       { (this.state.alarm)
          ?
       <div style ={ style.alarm }>
              must input number
            </div>
        : null}
      <form style={ style.productForm } onSubmit={ this.handleSubmit }>
   
        <input
          type='text'
          placeholder='product name....'
          style={ style.productFormPrice}
          value={ this.state.name }
          onChange={ this.nameChange } />
       
        <input
          type='text'
          placeholder='the price...'
          style={ style.productFormText}
          value={ this.state.text }
          onChange={ this.priceChange } />
        <input
          type='submit'
          style={ style.productFormPost }
          value='Add'/>
      </form>
      </div>
    )
  };
};

export default ProductForm;
