import React, { Fragment } from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => (
            <li key={igKey}>
                <span style={{ textTransform: 'capitalized' }}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        ))

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious biurger with followign ingredients</p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Price:</strong> {props.price.toFixed(2)}$</p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    )
}

export default orderSummary