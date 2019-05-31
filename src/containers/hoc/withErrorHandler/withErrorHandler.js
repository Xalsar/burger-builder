import React, { Component, Fragment } from 'react'
import Modal from '../../../components/UI/Modal/Modal'

const withErrorhandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor() {
            super()

            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null })
            })
            this.resInterceptros = axios.interceptors.response.use(null, error => {
                this.setState({ error: error })
            })
        }

        componentDidMount() {
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptros)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Fragment>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withErrorhandler
