SingleContact = React.createClass({

	componentDidMount(){
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');
		Session.set('contactId','');
  	Session.set('contactName','');
	},

	mixins: [ReactMeteorData],
	getMeteorData(){
		var contactId = this.props.contactId;
		Meteor.subscribe('singleContact', contactId);
  	return{
    	contact: Contacts.find({_id: contactId}).fetch()
    }
  },

	getContent(){
		return this.data.contact.map((contact) =>{
			return <ContactInfo key={contact._id} contact={contact} />;
		});
	},

	render(){
		return(
			<div>{this.getContent()}</div>
			)
	}
});