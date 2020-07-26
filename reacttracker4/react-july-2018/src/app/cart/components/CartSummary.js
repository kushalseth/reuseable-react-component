// CartSummary.js
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

//TODO: PropTypes

// TODO: PureComponent, this implements shouldComponentUpdate
export default class CartSummary extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            discount: 0,
            grandTotal: 0
        }
        
        console.log("CartSummary Created")
    }
 
    //TODO: componentWillMount

    componentWillMount() {
        this.recalculate(this.props)
    }


    componentWillUnmount() {
        console.log("Summary unmount")
    }
    //TODO: componentWillReceiveProps, recalculate 
 
    //TODO: shouldComponentUpdate

    recalculate(props) {
        let discount = 0;

        if (props.count >= 10) {
            discount = 20;
        } else if (props.count >= 5) {
            discount = 10;
        }

        let grandTotal = props.amount - (props.amount * discount / 100);

        this.setState({
            discount, 
            grandTotal
        })
    }
     
    // update cycle
    //called when parent render called on update cycle
    componentWillReceiveProps(nextProps) {
        console.log("Summary will receive props");
        console.log("current props", this.props)
        console.log("next props ", nextProps)

        if (nextProps.amount != this.props.amount && 
            nextProps.count != this.props.count) {
                this.recalculate(nextProps);
            }
    }


    
    render() {
        console.log("CartSummary Render");
        return (
            <div> 
            <h2>Cart Summary</h2>
            <p> Amount : {this.props.amount} </p>
            <p> Count : {this.props.count} </p>

            <p> Discount: {this.state.discount} %</p>
            <p> Grand Total: {this.state.grandTotal} </p>
            </div>
        )
    }
} 


CartSummary.defaultProps = {
    
}

CartSummary.propTypes = {
    
}