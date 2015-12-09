Reminder = React.createClass({
	render(){
		return(
			<span>{this.props.reminder.hour}:{this.props.reminder.minutes}</span>
			)
	}
});