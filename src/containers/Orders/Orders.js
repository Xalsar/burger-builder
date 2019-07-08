import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import Spinner from '../../components/Spinner/Spinner'
import axios from '../../axios-order'
import withErrorHandler from '../../containers/hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    async componentDidMount() {
        this.props.onFetchOrders()

    }

    render() {
        let content = <Spinner/>
        if(!this.props.loading){
            content = this.props.orders.map((order)=>(<Order key={order.id} price={order.price} ingredients={order.ingredients}/>))
        }

        return (
            <Fragment>
                {content}
            </Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))