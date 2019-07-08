import React from 'react'
import classes from './Order.module.css'

const order = (props) => {
    let ingredientsList = ''
    for (const key in props.ingredients) {
        ingredientsList += ` ${key.charAt(0).toUpperCase() + key.slice(1)} (${props.ingredients[key]}) `
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients. {ingredientsList}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
}

export default order