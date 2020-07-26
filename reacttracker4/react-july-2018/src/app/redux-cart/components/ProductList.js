import React from 'react';

export default class ProductList extends React.Component {

    componentDidMount() {
            this.props.fetchProducts()
    }

    render() {
        let products = this.props.products || [];

        return (
            <div>
                <h2>Product List</h2>
                <ul>
                {
                    products.map (product => (
                        <li key={product.id}> {product.name}</li>
                    ))
                }
                </ul>
            </div>
        )
    }
}