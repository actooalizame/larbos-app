UserLayout = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			currentUser: Meteor.user()
		};
	},

	render(){
		return(
			<div>
				{this.data.currentUser ?
					<ContactsLayout />
				:
				<div>
					<h3>Login con:</h3>
					<h4>user:larbos</h4>
					<h4>pass: c00lpass</h4>
				</div>
				}
				
			</div>
			
			)
		}
});