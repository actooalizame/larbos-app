Contact = React.createClass({
	PropTypes: {
    contact: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      showModal: false
    }
  },
  renderModal(){
  	return(
  		<Modal />
  		)
  },

  activateModal(){
  	/*this.setState({
      showModal: true,
    });*/
		//jQuery('#myModal').modal('show')
    let contactId = this.props.contact._id,
    		contactName = this.props.contact.name;
  	Session.set('contactId',contactId);
  	Session.set('contactName',contactName);

  },

  render(){
  	return(
  		<div>
  		<div className="panel panel-default">
        <div className="panel-heading">
          <h4>{this.props.contact.name}</h4>
        </div>
        <div className="panel-body">
          <h4>Telefono: {this.props.contact.phone}</h4>
          <h4>Email: {this.props.contact.email}</h4>
          <hr />
          <button type="button" className="btn btn-info btn-lg center-block call-contact" onClick={this.activateModal} data-toggle="modal" data-target="#myModal">
          Llamar
          </button>
        </div>

      </div>
      	
      		{this.renderModal()}
      
      	
  		</div>
  	)
  }
});

