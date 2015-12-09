NewOrderForm = React.createClass({

	createOrder(){

		let date = new Date(),
				data = {
			contactId: this.props.contact._id,
			contactName: this.props.contact.name,
			day: moment(date).format('l')
		}
    Meteor.call('createOrder', data);
  },

	render(){
		return(
			<div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-3">
              <button type="button" className="btn btn-success btn-lg" onClick={this.createOrder}>Nuevo Pedido</button>
            </div>
          </div>
          
        </div>
      </div>

			)
	}
});