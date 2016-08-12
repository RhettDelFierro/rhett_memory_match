import React, { PropTypes } from "react"
import { Navbar, Nav, FormGroup, FormControl, Button, NavItem, MenuItem, NavDropdown } from "react-bootstrap"

const styles = {
    signedIn: {
        "marginRight": 0
    }
};

function LoggedIn({user, onLogout}) {
    //add delete to menu item: <MenuItem eventKey={3.2} onClick={props.onUpdateLogin}>Delete Profile</MenuItem>
    //probably just use a dropdown instead of just text.
    return (
        <Nav pullRight>
            <Navbar.Text style={styles.signedIn}>
                Signed in as:
            </Navbar.Text>

            <NavDropdown eventKey={3} title={user} id="basic-nav-dropdown">
                <MenuItem evenKey={3.1} onClick={onLogout}>Logout</MenuItem>
            </NavDropdown>
        </Nav>
    )
}

function NotLoggedIn({user, onUpdateUser, password, onUpdatePassword, onSubmitUser}) {
    //remember, two different FormContainers.
    //throw in the RegisterFormContainer here?
    return (
        <Nav pullRight>
            <Navbar.Form>
                <FormGroup>
                    <FormControl sm={7} type="text" placeholder="Username or Email" value={user}
                                 onChange={onUpdateUser}/>
                </FormGroup>
                {' '}
                <FormGroup>
                    <FormControl sm={7} type="password" placeholder="Password" value={password}
                                 onChange={onUpdatePassword}/>
                </FormGroup>
                {' '}
                <Button type="submit" onClick={onSubmitUser}>Login</Button>
            </Navbar.Form>
        </Nav>
    )
}

function LoginForm({user, onLogout, password, onUpdateUser, onUpdatePassword, onRegisterLogin, isLoggedIn, onSubmitUser}) {
    return isLoggedIn === true
        ? <LoggedIn user={user} onLogout={onLogout}/>
        : <NotLoggedIn user={user} password={password} onUpdateUser={onUpdateUser} onUpdatePassword={onUpdatePassword}
                       onSubmitUser={onSubmitUser} onRegisterLogin={onRegisterLogin}/>
}

export default LoginForm