import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state={
      toBeUpdated: false,
      name: '',
      text: ''
    };
  };

  updateProduct =(e) => {
    e.preventDefault();
    this.setState({ toBeUpdated:!this.state.toBeUpdated });
  };
  productUpdate=(e)=>{
    e.preventDefault();
    let id=this.props.uniqueID;
    let name=(this.state.name) ? this.state.name : null;
    let text=(this.state.text) ? this.state.text : null;
    let product={ name: name, text: text};
    this.props.onProductUpdate(id, product,this.props.index);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated
    })
  };
  deleteProduct=(e)=> {
    e.preventDefault();
    let id=this.props.uniqueID;
    this.props.onProductDelete(id,this.props.index);
  };
  handlePriceChange=(e)=> {
    this.setState({ text: e.target.value });
  };
  handleNameChange=(e)=> {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div style={ style.product }>
      <h3 style ={style.alldisplay }>name:</h3>
        <h3 style ={style.alldisplay }>{this.props.name}</h3>
        <h3 style ={style.alldisplay }>price:</h3>
         <h3 style ={style.alldisplay }>{this.props.text}</h3>
       
        <a style={ style.updateLink } href='#' onClick={ this.updateProduct }>update</a>
        <a style={ style.deleteLink } href='#' onClick={ this.deleteProduct }>delete</a>
        { (this.state.toBeUpdated)
          ? (<form onSubmit={ this.productUpdate }>
              <input
                type='text'
                placeholder='Update name...'
                style={ style.productFormPrice }
                value={ this.state.name }
                onChange= { this.handleNameChange } />
              <input
                type='text'
                placeholder='Update price...'
                style= { style.productFormText }
                value={ this.state.text }
                onChange={ this.handlePriceChange } />
              <input
                type='submit'
                style={ style.productFormPost }
                value='Update'/>
            </form>)
          : null}
      </div>
    )
  };
};

export default Product;
