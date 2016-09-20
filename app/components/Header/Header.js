import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { headerContainer, title, slogan, enterNote } from './styles.css'

class Header extends Component {
    constructor(){
        super()
        this.state = {
            mounted: false
        }
    }

    componentDidMount(){
        this.setState({
            mounted: true
        })
    }

    render() {
        return (
            <div ref={this.props.headerRef} className={headerContainer}>
                <h1 className={title}>Music app</h1>
                <h2 className={slogan}>Discover the colors of sound</h2>
                <Link to="/demo">
                    <div className={enterNote}></div>
                </Link>
            </div>
        )
    }
}

export default Header