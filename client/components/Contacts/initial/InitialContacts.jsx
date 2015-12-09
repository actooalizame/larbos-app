InitialContacts = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		Meteor.subscribe('initialContacts');
		
		return {
			user: Meteor.user(),
			contacts: Contacts.find({status:'initial'}).fetch(),

		}
	},

	renderContacts(){
		return this.data.contacts.map((contact) =>{
			return <Contact key={contact._id} contact={contact} />;
		});
	},

	render(){
		return(
			<div className="row">
				<div>
					{this.data.user ?
						this.renderContacts() : ''
					}
					
				</div>
			</div>
		)
	}
});