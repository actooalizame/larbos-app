FullReminder = React.createClass({
	render(){
		return(
			<span>{this.props.reminder.hour}:{this.props.reminder.minutes} del {this.props.reminder.day}</span>
			)
	}
});