OrderedContacts = React.createClass({
	mixins: [ReactMeteorData],
  getMeteorData(){
    let userId = Meteor.user()._id;
    Meteor.subscribe('hasOrders');
    return {
    	orderedContacts: Contacts.find({ordered:true,assignedTo:userId}).fetch()
    }
  },

  getContactInfo(){
  	return this.data.orderedContacts.map((contact) =>{
      return <OrderedContactInfo key={contact._id} contact={contact} />;
    });
  },

  render(){
  	return(
  		<div>
  			{this.getContactInfo()}
  		</div>
  		)
  }
});
