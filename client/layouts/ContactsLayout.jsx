ContactsLayout = React.createClass({

	render(){
		return(

			<div>
				<div className="row">
					<div className="col-sm-3">
						<OnCallContact />
					</div>
					<div className="col-sm-5">
						<Search />
					</div>
				</div>
				<hr/>
				<div className="row">
					<div className="col-sm-3">
						<UserReminders />
						<hr/>
						<UnAnswered />
					</div>
					<div className="col-sm-5">
						<InitialContacts />
					</div>
					<div className="col-sm-4">
						<UserOrders />
					</div>
				</div>
				
			</div>
			)
	}
});