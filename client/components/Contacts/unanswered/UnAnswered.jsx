UnAnswered = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		Meteor.subscribe('unAnswered');
		
		return {
			contacts: Contacts.find({status:'unAnswered'}).fetch(),

		}
	},
	renderContacts(){
		return this.data.contacts.map((contact) =>{
			return <UnAnsweredContact key={contact._id} contact={contact} />;
		});
	},

	render(){
		return(
			<div>
				<h4>No contestan: </h4>
				<div>
					{this.renderContacts()}
				</div>
			</div>
			)
	}

});

UnAnsweredContact = React.createClass({
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

  renderModal(){
  	return(
  		<Modal />
  		)
  },

	render(){
		let contactLink = '/cliente/'+this.props.contact._id;
		return(
			<div>
				<ul>
					<li><p><a href={contactLink}>{this.props.contact.name}</a> | <span className="label label-success" data-toggle="modal" data-target="#myModal" onClick={this.activateModal}>Llamar</span></p></li>
				</ul>
				{this.renderModal()}
			</div>
			)
	}
});