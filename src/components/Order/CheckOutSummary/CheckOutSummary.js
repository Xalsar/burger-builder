import React from 'react'
import classes from './checkOutSummary.module.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkOutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>We hope it tases well!</h1>
        <div style={{ width: '100%', margin: 'auto' }}>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button
            clicked={props.checkOutCanceled}
            btnType="Danger"
        >CANCEL</Button>
        <Button
            clicked={props.checkOutContinued}
            btnType="Success"
        >CONTINUE</Button>
    </div>
)

export default checkOutSummary