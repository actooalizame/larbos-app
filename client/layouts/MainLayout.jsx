MainLayout = React.createClass({

	mixins: [ReactMeteorData],
	getMeteorData(){
		return {
			currentUser: Meteor.user()
		}
	},

	render(){
		return(
			<div>
				<HomeNav />

				<div className="container">
					{this.data.currentUser ? 
						this.props.content : <LoginRoot />
					}
					
				</div>
			</div>
			)
	}
});