import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
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
        if (this.props.ings) {
            checkOut = (
                <div>
                    <CheckOutSummary
                        ingredients={this.props.ings}
                        checkOutCanceled={this.checkOutCancelledHandler}
                        checkOutContinued={this.checkOutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        exact
                        component={ContactData}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(CheckOut)