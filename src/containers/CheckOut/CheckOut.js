import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import Spinner from '../../../src/components/Spinner/Spinner'
import ContactData from './ContactData/ContactData'

class CheckOut extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentDidMount() {
        if (!this.state.ingredients || !this.state.totalPrice) {
            const query = new URLSearchParams(this.props.location.search)
            const ingredients = {}
            let price = null
            for (let param of query.entries()) {
                if (param[0] === 'price') {
                    price = param[1]
                } else {
                    ingredients[param[0]] = param[1]
                }
            }
            this.setState({ ingredients: ingredients, totalPrice: price })
        }
    }

    checkOutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let checkOut = <Spinner />
        if (this.state.ingredients) {
            checkOut = (
                <div>
                    <CheckOutSummary
                        ingredients={this.state.ingredients}
                        checkOutCanceled={this.checkOutCancelledHandler}
                        checkOutContinued={this.checkOutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        exact
                        render={(props) => (<ContactData
                            ingredients={this.state.ingredients}
                            {...props}
                        />)}
                        price={this.state.totalPrice}
                    />
                </div>)
        }

        return (
            <Fragment>
                {checkOut}
            </Fragment>
        )
    }
}

export default CheckOut