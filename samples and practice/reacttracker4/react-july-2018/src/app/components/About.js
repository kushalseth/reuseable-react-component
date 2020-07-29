import React from 'react';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    onChange = (event) => {
        //target is input real dom element
        let value = event.target.value;
        this.setState({
            name: value
        })
    }

    render() {
        return (
            <div>
                <h2>About</h2>
                <input name="memberName"
                        value={this.state.name}
                        
                        />
            </div>
        )
    }
}