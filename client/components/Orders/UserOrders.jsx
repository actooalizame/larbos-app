UserOrders = React.createClass({

componentDidMount(){
  jQuery('.date').datepicker({
    language: 'es',
    daysOfWeekDisabled: '0',
    autoclose: true
  });
},

mixins: [ReactMeteorData],
	getInitialState() {
    return {
      getStatus: '',
      getDay: 'Hoy'
    }
  },

  getMeteorData(){
  	let query = {},
  			userId = Meteor.userId();
  			orderStatus = this.state.getStatus,
        orderDate = this.state.getDay,
        today = moment(new Date()).format('DD/MM/YY'),
        yesterday = moment(new Date()).add(-1, 'days').format('DD/MM/YY');

    if(orderDate==='Hoy'){
      Meteor.subscribe('userOrdersDate',today);
    }
    if(orderDate==='Ayer'){
      Meteor.subscribe('userOrdersDate',yesterday);
    }
    if(orderDate==='calendarDate'){
      let calendarInput = ReactDOM.findDOMNode(this.refs.calendar).value,
          calendarDay = moment(new Date(calendarInput)).format('DD/MM/YY');
      Meteor.subscribe('userOrdersDate',calendarDay);
    }
    if (orderStatus==='pendientes') {
      query = {userId:userId,status: 'Pendiente'};
    }
    if(orderStatus==='confirmados'){
    	 query = {userId:userId,status: 'Confirmado'};
    }
    if(orderStatus==='anulados'){
    	 query = {userId:userId,status: 'Anulado'};
    }
    if(orderStatus===''){
    	 query = {userId:userId};
    }
    return {
      contactOrders: Orders.find(query,{sort:{createdAt:-1}}).fetch()
    }
  },

  setToday(){
    this.setState({
      getDay: 'Hoy'
    });
  },
  setYesterday(){
    this.setState({
      getDay: 'Ayer'
    });
  },
  hideCalendar(){
    return $('.datepicker').hide();
  },

  setDate(){
    let calendarInput = ReactDOM.findDOMNode(this.refs.calendar).value;
    this.setState({
      getDay: 'calendarDate',
      displayCalendarDate: calendarInput
    });
    this.hideCalendar();
  },
  setPending() {
    this.setState({
      getStatus: 'pendientes'
    });
  },
  setConfirmed() {
    this.setState({
      getStatus: 'confirmados'
    });
  },

  setCanceled() {
    this.setState({
      getStatus: 'anulados'
    });
  },

  setAll(){
  	this.setState({
  		getStatus: ''
  	});
  },

  cleanInput(){
    this.hideCalendar();
    ReactDOM.findDOMNode(this.refs.calendar).value = '';
  },

  getContactOrders(){
  	return this.data.contactOrders.map((order) =>{
      return <ContactOrders key={order._id} order={order} />;
    });
  },

	render(){
		return(
			<div>
        <div className="row">
          <div className="col-sm-4">
            <div className="btn-group" role="group" aria-label="...">
              <button type="button" className="btn btn-default" onClick={this.setToday}>Hoy</button>
              <button type="button" className="btn btn-default" onClick={this.setYesterday}>Ayer</button>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="input-group date">
              <span className="input-group-addon" onClick={this.cleanInput}><i className="glyphicon glyphicon-remove-sign"></i></span><input type="text" ref="calendar" className="form-control" placeholder="Seleccionar Dia" /><span className="input-group-addon" onClick={this.setDate}>Buscar</span>
            </div>
          </div>
         
        </div>
        {this.state.getDay==='Hoy'||this.state.getDay==='Ayer' ? 
          <h3>Pedidos {this.state.getStatus} de: {this.state.getDay}</h3>
          :
          <h3>Pedidos {this.state.getStatus} de: {this.state.displayCalendarDate}</h3>
        }

        <div className="btn-group" role="group" aria-label="...">
          <button type="button" className="btn btn-default" onClick={this.setPending}>Pendientes</button>
          <button type="button" className="btn btn-default" onClick={this.setConfirmed}>Confirmados</button>
          <button type="button" className="btn btn-default" onClick={this.setCanceled}>Anulados</button>
          <button type="button" className="btn btn-default" onClick={this.setAll}>Todos</button>
        </div>
				{this.getContactOrders()}
			</div>
			)
	}
});