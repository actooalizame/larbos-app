ContactInfo = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		var contactId = this.props.contact._id;
		Meteor.subscribe('contactUnfinishedOrders', contactId);
		Meteor.subscribe('contactFinishedOrders', contactId);
  	return{
    	unfinishedOrders: Orders.find({contactId: contactId,state:'unfinished'}).fetch(),
    	finishedOrders: Orders.find({contactId: contactId,state:'finished'},{sort:{createdAt:-1}}).fetch()
    }
  },

  hasUnfinishedOrders(){
  	if(!jQuery.isEmptyObject(this.data.unfinishedOrders)){
      return true
    }
  },

  hasFinishedOrders(){
  	if(!jQuery.isEmptyObject(this.data.finishedOrders)){
      return true
    }
  },

  getFinishedOrders(){
  	return this.data.finishedOrders.map((order) =>{
      return <FinishedOrders key={order._id} order={order} />
    });
  },

	render(){
		return(
			<div>
				<h2 className="text-center">{this.props.contact.name}</h2>
				<div className="row">
					<div className="col-sm-6">
						<h3 className="text-center">Telefono: {this.props.contact.phone}</h3>
					</div>
					<div className="col-sm-6">
						<h3 className="text-center">Email: {this.props.contact.email}</h3>
					</div>
				</div>
				<hr/>
				<div className="col-sm-4">
					<CallLaterForm key={this.props.contact._id} contact={this.props.contact}/>
				</div>

				{this.hasUnfinishedOrders() ?
					<div className="col-sm-4">
						<CreateOrderForm key={this.props.contact._id} contact={this.props.contact}/>
					</div>
					:
					<div className="col-sm-4">
						<NewOrderForm key={this.props.contact._id} contact={this.props.contact}/>
						<hr/>
						{this.hasFinishedOrders() ?
							<div>
								<h3>Pedidos Anteriores</h3>
								{this.getFinishedOrders()}
							</div>
							:
							<h4 className="text-center">'Este cliente aun no tiene pedidos'</h4>
						}
						
					</div>
				}
				<hr/>
				

				
			</div>
			)
	}
});