import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/Spinner/Spinner'
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order'
// import { dispatch } from 'rxjs/internal/observable/range';
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    async componentDidMount() {
        this.props.onInitIngredients()
        // try {
        //     // const response = await axios.get('https://react-my-burger-e133d.firebaseio.com/ingredients')
        //     // console.log(response)
        // } catch (e) {
        //     this.setState({ error: true })
        // }
        // this.setState({
        //     ingredients: {
        //         cheese: 0,
        //         salad: 0,
        //         meat: 0,
        //         bacon: 0
        //     }
        // })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => sum + el, 0)
        return sum > 0
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type]
    //     const updatedCount = oldCount + 1
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount

    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type]
    //     if (oldCount <= 0) {
    //         return
    //     }
    //     const updatedCount = oldCount - 1
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     }
    //     updatedIngredients[type] = updatedCount

    //     const priceDeduction = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceDeduction
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = async () => {
        console.log(this.props)
        // this.setState({ loading: true })

        // const order = {
        //     ingredients: this.props.ings,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Xavier Carrera',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '7373565',
        //             country: 'Germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // try {
        //     await axios.post('/orders.json', order)
        //     this.setState({ loading: false, purchasing: false })
        // } catch (e) {
        //     this.setState({ loading: false, purchasing: false })
        // }
        const queryParams = []
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {
        let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner />
        let orderSummary = null

        const disabledInfo = { ...this.props.ings }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDisptachToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(withErrorHandler(BurgerBuilder, axios))