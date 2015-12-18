MainLayout = React.createClass({


	render(){
		return(
			<div>
				<HomeNav />

				<div className="container">
					
						{this.props.content}
			
					
				</div>
			</div>
			)
	}
});