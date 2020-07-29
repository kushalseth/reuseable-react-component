import React from 'react';

import PropTypes from 'prop-types';

// functional or view or presentational component
// React just call this method, get virtual dom
export default function Footer(props) {
    console.log('Footer render');

    //deconstruct
    let {appTitle, year} = props;
    
    return (
        <div>
            <hr />
            <p>Copyrights@ {year}, {appTitle}</p>

            {props.children}

        </div>
    )
}

//propTypes keyword
Footer.propTypes = {
    appTitle: PropTypes.string,
    year: PropTypes.number.isRequired // mandatory
}

//defaultProps keyword
Footer.defaultProps = {
    appTitle: 'React App'
}