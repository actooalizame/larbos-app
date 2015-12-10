CallLaterForm = React.createClass({

  componentDidMount(){
    jQuery('.input-group.date').datepicker({
      language: 'es',
      daysOfWeekDisabled: '0',
      autoclose: true
    });
  },
  handleSubmit(e){
    e.preventDefault();
    if(this.state.getDay==='Hoy'){
      var day = moment(new Date()).format('DD/MM/YY');
    }
    if(this.state.getDay==='Mañana'){
      var day = moment(new Date()).add(+1, 'days').format('DD/MM/YY');
    }
    if(this.state.getDay==='calendarDate'){
      var calendarInput = ReactDOM.findDOMNode(this.refs.calendar).value.trim(),
          day = moment(new Date(calendarInput)).format('DD/MM/YY');
    }
    let data = {
      hours: ReactDOM.findDOMNode(this.refs.hours).value.trim(),
      minutes: ReactDOM.findDOMNode(this.refs.minutes).value.trim(),
      day: day,
      contactId: this.props.contact._id,
      contactName: this.props.contact.name
    }

    Meteor.call('insertReminder', data);
    Meteor.call('setHasReminder', data.contactId);
    FlowRouter.go('/mis-contactos');
  },

  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      getDay: 'Hoy'
    }
  },

  getMeteorData(){
    let contactId = this.props.contact._id;
    Meteor.subscribe('contactReminders',contactId);
    return {
      reminder: Reminders.find({contactId:contactId}).fetch()
    }
  },
  setToday(){
    this.setState({
      getDay: 'Hoy'
    });
  },
  setTomorrow(){
    this.setState({
      getDay: 'Mañana'
    });
  },
  setCalendar(){
    var calendarInput = ReactDOM.findDOMNode(this.refs.calendar).value.trim(),
        day = moment(new Date(calendarInput)).format('DD/MM/YY');
    this.setState({
      getDay: 'calendarDate',
      calendarInput: day
    });
    jQuery('.input-group.date').datepicker('hide');
  },
  getReminders(){
    return this.data.reminder.map((reminder) =>{
      return <FullReminder key={reminder._id} reminder={reminder} />;
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
            <div className="row">
              <div className="col-sm-5">
                <div className="btn-group" role="group" aria-label="...">
                  <button type="button" className="btn btn-default" onClick={this.setToday}>Hoy</button>
                  <button type="button" className="btn btn-default" onClick={this.setTomorrow}>Mañana</button>
                </div>
              </div>
              <div className="col-sm-7">
                <div className="input-group date">
                  <input type="text" ref="calendar" className="form-control" placeholder="Seleccionar Dia" /><span className="input-group-addon" onClick={this.setCalendar} >Cambiar</span>
                </div>
              </div>
            </div>
            <hr/>
            <div className="row">
              
              {this.state.getDay==='Hoy'||this.state.getDay==='Mañana' ?
                <h4 className="text-center">Llamar {this.state.getDay} a las: </h4>
                :
                <h4 className="text-center">Llamar el {this.state.calendarInput} a las: </h4>
              }
              
              <div className="form-group">
                <div className="col-sm-6">
                  <input type="number" ref="hours" min="8" step="1"  max="18" className="form-control"  id="hours" placeholder="Horas" />
                </div>
                <div className="col-sm-6">
                  <input type="number" ref="minutes" min="00" step="10" max="50" className="form-control" id="minutes" placeholder="Minutos" />
                </div>              
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 col-sm-offset-4">     
                <button type="submit" className="btn btn-info mt-1em">Cambiar</button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
			)
	}
});