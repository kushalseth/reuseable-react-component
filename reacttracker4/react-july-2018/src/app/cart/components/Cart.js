// Cart.js

import React, {Component} from "react";
import PropTypes from "prop-types";

import CartList from "./CartList";
import CartSummary from "./CartSummary";

export default class Cart extends Component {
    constructor(props) {
        super(props);

        let items = []
        for (let i = 1; i < 2; i++) {
            items.push({id: i, name: 'P ' + i, price: 100, qty: 5})
        }

        this.state = {
            items: [ 
                        {id: 1, name: 'P1', price: 100, qty: 5},
                    ],

            //items: items,
            amount: 0, // sum of all items price * qty
            count: 0, // sum of all items qty
            flag: true,
            searchText: ''
        }
    }
    
    addItem = () => {
        let id = Math.ceil(Math.random() * 10000);
        let item = {
            id,
            name: `Product ${id}`,
            price: Math.ceil(Math.random() * 100),
            qty: 1
        }

        //TODO:
        let items = [...this.state.items, item]
        this.setState({
            items // es6 sugar => items: items
        });

        this.recalculate(items)

        // , () => {
        //     // called after setState, render
        //     console.log("SetState callback")
        //     this.recalculate();
        // })

 
    }
    
    removeItem = (id) => {
        //TODO
        console.log('remove item', id)

        // returns cloned array, minus the item with id
        let items = this.state.items.filter (item => item.id != id);

        this.setState({
            items
        })

        this.recalculate(items);

    }

    updateItem = (id, qty) => {
        //TODO
        console.log('update item ', id, qty)

        // clone array
        const items = this.state.items.map (item => {
            if (item.id === id) {
                //BAD. mutating object
                //item.qty = qty;
                return {...item, qty: parseInt(qty)} // cloning item object
            }
            return item;
        })

        this.setState({items})

        this.recalculate(items);

        
    }

    empty = () => {
        //TODO
        this.setState({
            items: []
        })

        this.recalculate([]);
         
    }

    //dummy
    refresh = () => {
        this.setState({
            flag: true
        })
    }

    // derived data from state
    recalculate(items) {
        let count = 0, 
            amount = 0;

        for (let item of items) {
            amount += item.price * item.qty;
            count += item.qty;
        }

        this.setState({
            amount,
            count
        })
    }

    //TODO:
    //componentWillMount

    componentWillMount(){
        this.recalculate(this.state.items);
    }
    
    onSearchText = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }
    
    render() {
        console.log("Cart render")
        return (
            <div> 
            <h2>Cart</h2>

            <label>Search products</label>
            <input value={this.state.searchText} 
                    onChange={this.onSearchText}
            />

            <button onClick={this.addItem}>
                Add Item
            </button>

            <button onClick={this.empty}>
                Empty
            </button>

            <button onClick={this.refresh}>
                Refresh
            </button>
            

            <CartList  items={this.state.items}  
                       removeItem={(id) => this.removeItem(id)}
                       updateItem={this.updateItem}
                        
            />

            { this.state.count % 2 == 1 && 
                <CartSummary amount={this.state.amount}
                            count = {this.state.count}
                />
            }

            </div>
        )
    }
} 


Cart.defaultProps = {
    
}

Cart.propTypes = {
    
}