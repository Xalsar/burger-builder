import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BugerIngredient/BurgerIngredient'

const burger = (props) => {
    console.log(props.ingredients)
    const ingredients = props.ingredients
    // let transformedIngredients = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         return [...Array(props.ingredients[igKey])].map((_, i) => {
    //             return <BurgerIngredient key={igKey + i} type={igKey} />
    //         })
    //     })
    //     .reduce((arr, el) => {
    //         return arr.concat(el)
    //     }, [])
    let transformedIngredients = []
    let i = 0
    Object.keys(ingredients).forEach((ingredientName) => {
        const quantity = ingredients[ingredientName]
        for (let index = 0; index < quantity; index++) {
            transformedIngredients.push(<BurgerIngredient type={ingredientName} key={i}/>)
            ++i
        }
    })

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger