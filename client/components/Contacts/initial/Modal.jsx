Modal = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			contactId: Session.get('contactId'),
			contactName: Session.get('contactName')
		}
	},

	closeOnCall(){
		let contactId = this.data.contactId,
				contact = Contacts.findOne({_id:contactId}),
				status = contact.status;
		Session.set('contactId','');
  	Session.set('contactName','');
  	if(status==='hasReminder'){
  		return
  	} else {
  		Meteor.call('SetUnAnswered',contactId);
  	}
	},

	setOnCall(){
		//Session.set('contactId','');
  	//Session.set('contactName','');
	},

	render(){
		let contactLink = '/cliente/'+this.data.contactId;
		return(
			<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
	      <div className="modal-dialog" role="document">
	        
	        <div className="modal-content">
	          <div className="modal-header">
	            <h4 className="modal-title" id="myModalLabel">Modal title</h4>
	          </div>
	          <div className="modal-body">
	            <h4>Llamando a: <strong>{this.data.contactName}</strong></h4>
	          </div>
	          <div className="modal-footer">
	            <h5>{this.data.contactId}</h5>
	            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.closeOnCall}>No Contesta</button>
	            <a href={contactLink} className="btn btn-success" onClick={this.setOnCall}>Contesta</a>
	          </div>
	        </div>
	  
	      </div>
	    </div>
			)
	}
});