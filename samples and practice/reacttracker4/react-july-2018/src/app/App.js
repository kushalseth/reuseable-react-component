import React from 'react';

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";

import NotFound from "./components/NotFound";

import Cart from './cart/components/Cart';

import ReduxCart from './redux-cart/containers/ReduxCart';

import ProductList from './redux-cart/containers/ProductList';

import {BrowserRouter as Router, 
        Switch,
        Route } from 'react-router-dom';

import "./App.css";

export default class App extends React.Component {
    constructor() {
        super(); //ES6 must

        //State, mutable data, owned by this component
        // state is a react keyword
        this.state = {
            appTitle: 'Product App',
            year: 2018 
        }
    }
 
    //react keyword
    // create and return virtual dom
    render() {
        console.log("App render");
 

        //Composition: App is the parent component
        // Header and Footer are child for App component

        // JSX => JavaScript + XML
        //JSX shall convert to JavaScript at build time
        return (
            <Router>
            <div>
                {/* Share data with child  using props */}
                <Header appTitle={this.state.appTitle} />


                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/products" component={ProductList} />
                    <Route path="/redux-cart" component={ReduxCart} />
                    <Route path="/about" component={About} />
                    <Route path="*" component={NotFound} />
                </Switch>

                {/* <Cart />
                
                <Home startValue={100} />

                <About /> */}


                <Footer appTitle={this.state.appTitle} 
                        year={this.state.year} >

                    {/* content view */}
                    <p>Contact time: 8:00 AM to 5:00 PM</p>
                    <p>India Contact time: 9:00 to 6:00 PM</p>

                </Footer>
            </div>
            </Router>
        )

        // return React.createElement("h1", 
        //                             {id: 'head1'}, 
        //                             'Welcome to React' );
    }
}