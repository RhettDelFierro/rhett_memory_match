import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { headerContainer, title, slogan, enterNote } from './styles.css'

export default function Header (props) {
        return (
            <div className={headerContainer}>
                <h1 className={title}>Music app</h1>
                <h2 className={slogan}>Discover the colors of sound</h2>
                <Link to="/demo">
                    <div className={enterNote}></div>
                </Link>
            </div>
        )
}