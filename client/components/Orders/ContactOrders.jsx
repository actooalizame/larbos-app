ContactOrders = React.createClass({
	mixins: [ReactMeteorData],
  getMeteorData(){
    let orderId = this.props.order._id;
    Meteor.subscribe('orderProducts', orderId);
    return {
      orderProducts: Products.find({orderId:orderId}).fetch()
    }
  },

  renderDate(){
    let date = this.props.order.createdAt;
    return(
      <span>{this.props.order.day} - {moment(date).format('hh:mm')}hs.</span>
      )
  },

  getOrderProducts(){
  	return this.data.orderProducts.map((product) =>{
      return <OrderProducts key={product._id} product={product} />;
    });
  },

  render(){
    let contactLink = '/cliente/'+this.props.order.contactId;
  	return(
  		<div>
        <h4><a href={contactLink}>{this.props.order.contactName}</a></h4>
        {this.getOrderProducts()}
        <p>{this.renderDate()} | <strong>{this.props.order.status}</strong></p>
        <hr/>
  		</div>
  		)
  }

});