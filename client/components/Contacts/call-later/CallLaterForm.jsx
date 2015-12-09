CallLaterForm = React.createClass({

  handleSubmit(e){
    e.preventDefault();
    let data = {
      hours: ReactDOM.findDOMNode(this.refs.hours).value.trim(),
      minutes: ReactDOM.findDOMNode(this.refs.minutes).value.trim(),
      contactId: this.props.contact._id
    }
    Meteor.call('insertReminder', data);
    Meteor.call('setHasReminder', data.contactId);
    FlowRouter.go('/mis-contactos');
  },

  mixins: [ReactMeteorData],
  getMeteorData(){
    let contactId = this.props.contact._id;
    Meteor.subscribe('contactReminders',contactId);
    return {
      reminder: Reminders.find({contactId:contactId}).fetch()
    }
  },

  getReminders(){
    return this.data.reminder.map((reminder) =>{
      return <Reminder key={reminder._id} reminder={reminder} />;
    });
  },

  hasReminder(){
    if(!jQuery.isEmptyObject(this.data.reminder)){
      return true
    }
  },
 
	render(){
		return(
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4 className="text-center panel-title">
            { this.hasReminder() ? 
              <strong>Llamar a las: {this.getReminders()}</strong> : <strong>Crear recordatorio</strong>
            }
          </h4>
				</div>
        <div className="panel-body">
          <form className="call-later" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="col-sm-6">
                <input type="number" ref="hours" min="8" step="1"  max="18" className="form-control"  id="hours" placeholder="Horas" />
              </div>
              <div className="col-sm-6">
                <input type="number" ref="minutes" min="00" step="10" max="50" className="form-control" id="minutes" placeholder="Minutos" />
              </div>              
            </div>
            <div className="col-sm-4 col-sm-offset-4">     
              <button type="submit" className="btn btn-info mt-1em">Cambiar</button>
            </div>
          </form>
        </div>
      </div>
			)
	}
});