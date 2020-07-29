import React, {Component} from 'react';

import store from "../configureStore";
import {addItem} from "../redux-cart/state/actions";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Home',
            counter: props.startValue
        }
        //this.props is keyword
        //console.log("Header cons ", this.props.startValue)

        // create method once per instance
        // bind this context
        this.incrementBy2 = this.incrementBy2.bind(this);
    }

    increment() {
        console.log("increment called", this.state.counter)
        //console.trace();
        //BAD, mutating state directly
        this.state.counter ++;

        //BAD,  
        // trigger re-render
        this.forceUpdate();
        this.forceUpdate();
    }

    wrapperForIncr = (e) => {
        console.log(e);
        this.increment(5)
    }

    incrementBy2() {
        //GOOD 
        //take new state as argument
        // batch update
        // async
        // trigger re-render after merge state
        this.setState({
            counter: this.state.counter + 2
        })
    }

    addItem = () => {
        let id = Math.ceil(Math.random() * 10000);
        let item = {
            id,
            name: `Product ${id}`,
            price: Math.ceil(Math.random() * 100),
            qty: 1
        }

        const action = addItem(item);
        store.dispatch(action);
    }

    // store.subscribe( () => {this.forceUpdate()} ) 

    componentDidMount() {
        this.unsubscribeFn = store.subscribe ( () => {
            console.log("HOME Subscribe");
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribeFn();
    }

    //ES.Next
    // create method only once per instance
    decrement = () => {
        console.log("before ", this.state.counter)

        this.setState({
            counter: this.state.counter - 1
        })

        this.setState({
            title: 'Home 1'
        })

        console.log("after ", this.state.counter)
    }

    testClick = () => {
        console.log("Test Click called ");
        // this.setState({
        //     counter: this.state.counter + 1
        // })

        this.forceUpdate();
    }

    // Update life cycle
    shouldComponentUpdate(nextProps, nextState) {
        console.log("should update ");
        console.log("Current state", this.state)
        console.log("Next State", nextState);

        return nextState.counter % 2 == 0;

        //return true; //calls render
        //return false; //doesn't call render
    }

    render () {
        console.log("Home render");
        return (
            <div>
                <h2>{this.state.title}</h2>

                <p> Cart Length {store.getState().items.length}</p>
                <button onClick={this.addItem}>
                    Add Item
                </button>

                <p>Counter {this.state.counter}</p>
                {/* events take call back function 
                    () => functions created on every render
                */}
                <button onClick={this.wrapperForIncr}>
                    Incr
                </button>

                <button onClick={this.incrementBy2}>
                    Incr 2
                </button>

                <button onClick={this.decrement}>
                    Decr
                </button>


                <div onClick={this.testClick}>
                    <div onClick={this.testClick}>
                        <div onClick={this.testClick}> 
                            <button onClick={this.testClick}>
                                Events bubble
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}