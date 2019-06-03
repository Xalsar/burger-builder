import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/Spinner/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-order'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = async (event) => {
        event.preventDefault()
        this.setState({ loading: true })

        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: 'Xavier Carrera',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '7373565',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        try {
            await axios.post('/orders.json', order)
            this.setState({ loading: false })
            this.props.history.push('/')
        } catch (e) {
            this.setState({ loading: false })
        }
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>)
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData