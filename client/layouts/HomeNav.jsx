HomeNav = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData(){
		return {
			currentUser: Meteor.user()
		};
	},

	userName(){
  	return (
  		<span>As: {this.data.currentUser.username}!</span>
  		)
	},

	render(){
		return(
			<nav className="navbar navbar-inverse">
			  <div className="container-fluid">
			   
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="/mis-contactos">Brand</a>
			    </div>

			   
			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      
			      <ul className="nav navbar-nav navbar-right">
			      	<li><AccountsUIWrapper /></li>
			        
			      </ul>
			    </div>
			  </div>
			</nav>
		)
	}
});