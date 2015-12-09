CallLaterContacts = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		Meteor.subscribe('hasReminder');
		return {
			contacts: Contacts.find({status:'hasReminder'},{sort: {changed:-1}}).fetch()
		}
	},
	getContacts(){
		return this.data.contacts.map((contact) =>{
			return <HasReminderContact key={contact._id} contact={contact} />;
		});
	},
	render(){
		return(
			<div>
				<h4>Llamar mas tarde: </h4>
				<div>
					{this.getContacts()}
				</div>
			</div>
			)
	}
});

HasReminderContact = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		let contactId = this.props.contact._id;
		Meteor.subscribe('contactReminders', contactId);
		return {
			reminders: Reminders.find({contactId:contactId},{sort:{changed:-1},limit:1}).fetch()
		}
	},
	getReminders(){
		return this.data.reminders.map((reminder) =>{
			return <Reminder key={reminder._id} reminder={reminder} />;
		});
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
					<li><p><a href={contactLink}>{this.props.contact.name}</a> | <span className="label label-success" data-toggle="modal" data-target="#myModal" onClick={this.activateModal}>Llamar</span></p>
						<p>Llamar a las: {this.getReminders()} hs.</p>
					</li>
				</ul>
				{this.renderModal()}
			</div>
			)
	}
});