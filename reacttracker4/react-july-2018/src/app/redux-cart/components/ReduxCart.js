import React from 'react';

import CartList from "../containers/CartList";
import CartSummary from "../containers/CartSummary";

export default function ReduxCart(props) {
    console.log("ReduxCart render ", props);

    return (
        <div>
            <h2>Redux Cart</h2>
            <p>Cart Length {props.cartLength}</p>
            
            <button onClick={props.addItem} >
                Add Item
            </button>

            <button onClick={props.empty} >
                Empty
            </button>

            <CartList />
            <CartSummary />
        </div>
    )
}