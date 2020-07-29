// container is a component

import {connect} from 'react-redux';

// bind dispatch and action creatos
import {bindActionCreators} from 'redux';

import ReduxCart from '../components/ReduxCart';

import {addItem, empty} from '../state/actions';

// state = store.getState()
// on every subscribe, end of dispatch
// on first time
function mapStateToProps(state) {
    console.log("Redux cart map state to props", state)
    return {
        //prop Name: value from state
        cartLength: state.items.length
    }
}

//dispatch == store.dispatch
// called only once per container component creation
function mapDispatchToProps(dispatch) {
    console.log("Redux cart map dispatch to props")
    return {
        // propName: function(){}
        addItem: function() {
            let id = Math.ceil(Math.random() * 10000);
            let item = {
                id,
                name: `Product ${id}`,
                price: Math.ceil(Math.random() * 100),
                qty: 1
            }

            const action = addItem(item);

            dispatch(action);
        },

        // empty: function() {
        //     //call action creator
        //     const action = empty()
        //     // dispatch to store
        //     dispatch(action)
        // }

               // returns a wrapper function,
               // that calls action creator method
               // and dispatch
        empty: bindActionCreators(empty, dispatch)
    }
}

// decorator
const connectFn = connect(mapStateToProps, 
                          mapDispatchToProps);

//create container
// Pure component
// Subscribe/Unsubscribe
//ReduxCart render called only when cartLength changed
// Container is a parent component, ReduxCart is child component

const CartContainerComponent = connectFn(ReduxCart)

export default CartContainerComponent;
