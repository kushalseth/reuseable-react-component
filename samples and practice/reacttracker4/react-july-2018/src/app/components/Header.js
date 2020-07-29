import React from 'react';

import {NavLink} from 'react-router-dom';

export default function Header(props) {
    console.log("Header render ", props)

    //error, props are immutable
    //props.appTitle = 'Test';

    return (
        <div>
            <h2> {props.appTitle} </h2>
            {/*  todo: navigation buttons  */}

            <NavLink to="/" className="button"   exact activeClassName='success' > Home </NavLink>
            <NavLink to="/products" className="button" activeClassName='success'> Products </NavLink>
            <NavLink to="/cart" className="button" activeClassName='success' > Cart </NavLink>

            <NavLink to="/redux-cart" 
                    className="button" 
                    activeClassName='success' > Redux Cart </NavLink>


            <NavLink to="/checkout" className="button" activeClassName='success'> Checkout </NavLink>
            <NavLink to="/about" className="button" activeClassName='success'> About </NavLink>

            <hr />
        </div>
    )
}