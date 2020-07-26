
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import CartItem from "../components/CartItem";
import * as actions from "../state/actions";

 
const mapDispatchToProps = (dispatch) => {
    return {
        // removeItem: function(id) {
        //     const action = actions.removeItem(id)
        //     dispatch(action);
        // },
        // actions {addItem: func(), removeItem: fun, empty, updateItem...}
        
        // in component, props.actions.updateItem(id, 1)
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(null, 
                    mapDispatchToProps) (CartItem)