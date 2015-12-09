AddProductForm = React.createClass({

	handleSubmit(e){
    e.preventDefault();
    let data = {
      orderId: this.props.order._id,
      productName: ReactDOM.findDOMNode(this.refs.productName).value.trim(),
    }
    Meteor.call('addProduct', data);
    ReactDOM.findDOMNode(this.refs.productName).value = ''
  },

	mixins: [ReactMeteorData],
  getMeteorData(){
    let orderId = this.props.order._id;
    Meteor.subscribe('orderProducts',orderId);
    return {
      orderProducts: Products.find({orderId:orderId}).fetch()
    }
  },

  getOrderProducts(){
    return this.data.orderProducts.map((product) =>{
      return <OrderProducts key={product._id} product={product} />;
    });
  },

  hideEmptyOrderFinishBtn(){
    if(this.data.orderProducts.length===0){
      return 'btn btn-info hidden'
    } else {
      return 'btn btn-info'
    }
  },

  finishOrder(){
    let orderId = this.props.order._id,
        contactId = this.props.order.contactId;
    Meteor.call('finishOrder', orderId);
    Meteor.call('setOrdered', contactId);
  },

	render(){
		return(
			<div className="panel-body">
        <div className="row">
          <div className="col-sm-12">
            <form className="insert-product" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="col-sm-8">
                  <input type="text" className="form-control" ref="productName" id="product" placeholder="Producto" />
                </div>
                <div className="col-sm-4">     
                  <button type="submit" className="btn btn-success">Agregar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />
       {this.getOrderProducts()}
        <hr />  
        <div className="row">
          <div className="col-sm-4 col-sm-offset-3">
            <button type="button" className={this.hideEmptyOrderFinishBtn()} onClick={this.finishOrder}>Finalizar Pedido</button>
          </div>
        </div>
      </div>
			)
	}
});
