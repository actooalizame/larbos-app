UserReminders = React.createClass({

componentDidMount(){
  jQuery('.input-group.date').datepicker({
    language: 'es',
    daysOfWeekDisabled: '0',
    autoclose: true
  });
},

mixins: [ReactMeteorData],
	getInitialState() {
    return {
      getDay: 'Hoy'
    }
  },

  getMeteorData(){
  	let query = {},
  			userId = Meteor.user()._id;
        reminderDate = this.state.getDay,
        today = moment(new Date()).format('DD/MM/YY'),
        tomorrow = moment(new Date()).add(+1, 'days').format('DD/MM/YY');

    if(reminderDate==='Hoy'){
      Meteor.subscribe('userRemindersDate',today);
      query = {userId:userId,day: today};
    }
    if(reminderDate==='Mañana'){
      Meteor.subscribe('userRemindersDate',tomorrow);
      query = {userId:userId,day: tomorrow};
    }
    if(reminderDate==='calendarDate'){
      let calendarInput = ReactDOM.findDOMNode(this.refs.calendar).value,
          calendarDay = moment(new Date(calendarInput)).format('DD/MM/YY');
      Meteor.subscribe('userRemindersDate',calendarDay);
      query = {userId:userId,day: calendarDay};
    }
    
    return {
      contactReminders: Reminders.find(query,{sort:{createdAt:-1}}).fetch()
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
  setDate(){
    let calendarInput = ReactDOM.findDOMNode(this.refs.calendar).value;
    this.setState({
      getDay: 'calendarDate',
      displayCalendarDate: calendarInput
    });
    jQuery('.input-group.date').datepicker('hide');
  },

  cleanInput(){
    jQuery('.input-group.date').datepicker('hide');
    ReactDOM.findDOMNode(this.refs.calendar).value = '';
  },
  getContactReminders(){
  	return this.data.contactReminders.map((reminder) =>{
      return <ContactReminders key={reminder._id} reminder={reminder} />;
    });
  },

	render(){
		return(
			<div>
        <div className="row">
          <div className="col-sm-12">
            <h3>Recordatorios</h3>
            <div className="input-group date">
              <span className="input-group-addon" onClick={this.cleanInput}><i className="glyphicon glyphicon-remove-sign"></i></span><input type="text" ref="calendar" className="form-control" placeholder="Seleccionar Dia" /><span className="input-group-addon" onClick={this.setDate}>Buscar</span>
            </div>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-12">
            <div className="btn-group" role="group" aria-label="...">
              <button type="button" className="btn btn-default" onClick={this.setToday}>Hoy</button>
              <button type="button" className="btn btn-default" onClick={this.setTomorrow}>Mañana</button>
            </div>
          </div>
        </div>
       
        {this.state.getDay==='Hoy'||this.state.getDay==='Mañana' ? 
          <h4>Para: {this.state.getDay}</h4>
          :
          <h4>Para: {this.state.displayCalendarDate}</h4>
        }

				{this.getContactReminders()}
			</div>
			)
	}
});