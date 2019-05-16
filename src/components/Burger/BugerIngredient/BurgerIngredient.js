import React from 'react'
import classes from './burgerIngredient.module.css'

const burgerIngredient = (props) => {
    let ingredient = null
    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case ('bread-top'):
            ingredient = (
                <div classname={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
            break;
        case ('meat'):
            ingredient = <div className={classes.Meat}></div>
            break;
        case ('chease'):
            ingredient = <div className={classes.Chease}></div>
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>
            break;
        case ('salat'):
            ingredient = <div className={classes.Salat}></div>
            break;
        default:
            ingredient = null
    }

    return ingredient
}

export default burgerIngredient