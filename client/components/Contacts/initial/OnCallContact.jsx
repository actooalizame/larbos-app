OnCallContact = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			contactName: Session.get('contactName')
		}		
	},
	

	render(){
		return(
			<div>
				{this.data.contactName===''||this.data.contactName===undefined ?
				''
				:
				<div>
					<strong>Llamando: </strong>
					<h4>{this.data.contactName}</h4>
				</div>
				}
				
			</div>
			)
	}
});