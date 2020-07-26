// contains all action creators for redux-cart module

import * as ActionTypes from './action-types';

export const addItem = (item) =>   ({
        type: ActionTypes.ADD_ITEM,
        payload: {
            item
        }
    })

export const removeItem = (id) => ({
    type: ActionTypes.REMOVE_ITEM,
    payload: {
        id
    }
})

export const updateItem = (id, qty) => ({
    type: ActionTypes.UPDATE_ITEM,
    payload: {
        id,
        qty: parseInt(qty)
    }
})

export const empty = () => ({
    type: ActionTypes.EMPTY_CART
})

export const initProducts = (products) => ({
    type: 'INIT_PRODUCTS',
    payload: {
        products
    }
})

//sync
// return object as an action
export const loading = (loading) => ({
    type: 'LOADING',
    payload: {
        loading
    }
})

//async
// return function as an action
export const fetchProducts = () => {
    console.log('entering fetch products')

    // thunk, returns function as an action
    return function(dispatch, getState) {
        // here we go with ajax call
        // thunk shall call
        console.log("called by thunk")
        window.fetch("http://localhost:7070/api/products")
        .then (response => response.json() )
        .then (products => {
            console.log("Got products ", products);
            let action = initProducts(products)
            dispatch(action)
        })
    }

    

    console.log('leaving fetch products');

    //won't work
    // return {
    //     products:products
    // }
}