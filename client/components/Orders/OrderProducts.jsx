OrderProducts = React.createClass({
	render(){
		return(
			<div className="row">
        <div className="col-sm-12">
          <ul className="product-list">
            <li>
              <p>{this.props.product.productName}</p>

            </li>
          </ul>
        </div>
      </div>
			)
	}
});