FinishedOrders = React.createClass({

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
      return <OrderProducts key={product._id} product={product} />
    });
  },

  renderDate(){
    return(
      <h4>Fecha: {this.props.order.day}</h4>
      )
  },

  confirmOrder(){
    let orderId = this.props.order._id;
    Meteor.call('confirmOrder', orderId);
  },

  cancelOrder(){
    let orderId = this.props.order._id;
    Meteor.call('cancelOrder', orderId);
  },

	render(){
		return(
			<div>
        <div className="panel panel-default">
          <div className="panel-body">         
            <div className="list-group">
              {this.renderDate()}
              <div className="list-group-item">
                {this.getOrderProducts()}
              </div>
              <hr/>
              <h4 className="text-center">Status: {this.props.order.status}</h4>
              <hr/>
              <div className="row">
                <div className="col-sm-5 col-sm-offset-1">
                  <button type="button" className="btn btn-success btn-sm" onClick={this.confirmOrder}>Confirmar Pedido</button>
                </div>
                <div className="col-sm-6">
                  <button type="button" className="btn btn-danger btn-sm" onClick={this.cancelOrder}>Anular Pedido</button>
                </div>
              </div>
              
            </div> 
          </div>
        </div>
      </div>
			)
	}
});