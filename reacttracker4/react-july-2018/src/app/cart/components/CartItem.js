// CartItem.js
import React, {PureComponent, Component} from "react";
import PropTypes from "prop-types";

export default class CartItem extends Component {
    constructor(props) {
        super(props);

        //TODO: assing from props
        this.state = {
            qty: props.item.qty
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.item != this.props.item  ||
            nextState.qty != this.state.qty
            ) {
            return true;
        }

        return false;
    }


    //TODO: Ref
    //TODO: componentWillMount
    //TODO: state from props, qty

    onChangeQty = (e) => {
        this.setState({
            qty: e.target.value
        })
         
    }

    componentDidMount() {
        console.log("CartItem mounted");
        this.inputElement.focus();
    }

    componentWillUnmount() {
        console.log("CartItem will unmount");
    }
   
    render() {
        let {item} = this.props;

        console.log("CartItem Render ", item.id);

        return (
            <tr>
                <td>{item.name} </td>
                <td>{item.price}</td>
                <td>
                     <input 
                            value={this.state.qty}
                            type="number"
                            onChange={this.onChangeQty}
                            ref = { element => this.inputElement = element }
                             
                     />
                </td>
                <td>{item.price * item.qty}</td>
                <td> 
                <button onClick={() => this.props.updateItem(item.id, this.state.qty)}>
                        Update
                </button>    
                <button onClick={() => this.props.removeItem(item.id)}>
                        Delete
                </button>
                </td>
            </tr>
        )
    }
} 


CartItem.defaultProps = {
    
}

CartItem.propTypes = {
    
}