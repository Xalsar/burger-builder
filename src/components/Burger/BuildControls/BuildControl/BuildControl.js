import React from 'react'
import classes from './BuildControl.module.css'

const buildControl = (props) => {
    <div className={classes.BuildControl}>
        <div className={classes.Label}></div>
        <button className={classes.Label}>Less</button>
        <button className={classes.More}>More</button>
    </div>
}

export default buildControl