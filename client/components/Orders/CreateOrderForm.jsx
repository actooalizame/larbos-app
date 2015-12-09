CreateOrderForm = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){
    let contactId = this.props.contact._id;
    Meteor.subscribe('contactUnfinishedOrders',contactId);
    return {
      newOrder: Orders.find({contactId:contactId,state:'unfinished'}).fetch()
    }
  },

  getAddProductForm(){
    return this.data.newOrder.map((order) =>{
      return <AddProductForm key={order._id} order={order} />;
    });
  },

	render(){
		return(
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4 className="text-center panel-title"><strong>Crear Pedido</strong></h4>
				</div>
				{this.getAddProductForm()}
			</div>
        

			)
	}
});