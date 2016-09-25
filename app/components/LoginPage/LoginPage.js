import React, { PropTypes, Component} from "react"
import { Link } from "react-router"
import { HomeBackgroundContainer, ParallaxContentContainer, AppInfoContainer,HeaderContainer, AppPicturesContainer } from 'containers'
import { LoginForm } from 'components'
import { loginContainer } from './styles.css'


//remember to use refs you must use a container component, it will not take a functional component.
function LoginPage({ windowPositionY }) {
    return (
        <div className={loginContainer}>
            <h3>The page you tried to access requires a login!</h3>
            <LoginForm />
        </div>
    )
}

export default LoginPage