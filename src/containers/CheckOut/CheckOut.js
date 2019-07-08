import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData'

class CheckOut extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    checkOutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <Fragment>
                    {purchasedRedirect}
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
                </Fragment>)
        }

        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(CheckOut)