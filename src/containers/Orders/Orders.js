import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withErrorHandler from '../../containers/hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        try {
            // const response = axios.get('/orders.json')
            // Fetch orders...
            this.setState({ loading: false })
        } catch (error) {
            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)