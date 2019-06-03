import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import ContactData from './ContactData/ContactData'

class CheckOut extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 2,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for (let param of query.entries()) {
            ingredients[param[0]] = param[1]
        }
        console.log(ingredients)
        this.setState({ ingredients: ingredients })
    }

    checkOutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckOutSummary
                    ingredients={this.state.ingredients}
                    checkOutCanceled={this.checkOutCancelledHandler}
                    checkOutContinued={this.checkOutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

export default CheckOut