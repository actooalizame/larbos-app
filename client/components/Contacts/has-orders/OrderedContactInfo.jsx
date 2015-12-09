OrderedContactInfo = React.createClass({

	mixins: [ReactMeteorData],
	getInitialState() {
    return {
      getStatus: 'all'
    }
  },

  getMeteorData(){
  	let query = {},
  			//contactId = this.props.contact._id,
  			userId = Meteor.user()._id;
  			orderStatus = this.state.getStatus;
 		 Meteor.subscribe('userOrders', userId);
    if (orderStatus==='pending') {
      query = {userId:userId,status: 'Pendiente'};
    }
    if(orderStatus==='all'){
    	 query = {userId:userId};
    }
    return {
      contactOrders: Orders.find(query).fetch()
    }
  },

  setPending() {
    this.setState({
      getStatus: 'pending'
    });
  },
  setAll(){
  	this.setState({
  		getStatus: 'all'
  	});
  },

  getContactOrders(){
  	return this.data.contactOrders.map((order) =>{
      return <ContactOrders key={order._id} order={order} />;
    });
  },

	render(){
		let contactLink = '/cliente/'+this.props.contact._id;
		return(
			<div>
				<nav>
				  <ul className="nav nav-pills">
					  <li role="presentation"><a href="#" onClick={this.setPending}>Pendientes</a></li>
					  <li role="presentation"><a href="#">Confirmados</a></li>
					  <li role="presentation"><a href="#">Anulados</a></li>
					  <li role="presentation"><a href="#" onClick={this.setAll}>Todos</a></li>
					</ul>
				</nav>
				<h4><a href={contactLink}>{this.props.contact.name}</a></h4>
				{this.getContactOrders()}
			</div>
			)
	}
});