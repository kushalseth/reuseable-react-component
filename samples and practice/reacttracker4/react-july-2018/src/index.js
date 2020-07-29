// bootstrapping, 
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App'; //Virtual dom

import store from "./app/configureStore";
import {Provider} from 'react-redux';


let root = document.getElementById('root'); //Real Dom, index.html

// uni directional (virtual dom to real dom, not vice versa

// Provider shall pass store object to containers

ReactDOM.render(<Provider store={store}>
                <App />
                </Provider>
                ,
                root
)