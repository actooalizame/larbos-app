ContactReminders = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		let contactId = this.props.reminder.contactId;
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
	
    let contactId = this.props.reminder.contactId,
    	  contactName = this.props.reminder.contactName;
  	Session.set('contactId',contactId);
  	Session.set('contactName',contactName);
  },

  renderModal(){
  	return(
  		<Modal />
  		)
  },
	render(){
		let contactLink = '/cliente/'+this.props.reminder.contactId;
		return(
			<div>
				<ul>
					<li><p><a href={contactLink}>{this.props.reminder.contactName}</a> | <span className="label label-success" data-toggle="modal" data-target="#myModal" onClick={this.activateModal}>Llamar</span></p>
						<p>Llamar a las: {this.getReminders()} hs.</p>
					</li>
				</ul>
				{this.renderModal()}
			</div>
			)
	}
});