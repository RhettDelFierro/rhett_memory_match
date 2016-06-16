var React = require("react");
var Bootstrap = require("react-bootstrap");
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var FormGroup = Bootstrap.FormGroup;
var FormControl = Bootstrap.FormControl;
var Button = Bootstrap.Button;
var NavItem = Bootstrap.NavItem;
var MenuItem = Bootstrap.MenuItem;
var NavDropdown = Bootstrap.NavDropdown;
var RegisterFormContainer = require("../containers/RegisterFormContainer");

var styles = {
    signedIn: {
        "marginRight": 0
    }
};

function LoggedIn(props) {
    //add delete to menu item: <MenuItem eventKey={3.2} onClick={props.onUpdateLogin}>Delete Profile</MenuItem>
    //probably just use a dropdown instead of just text.
    return (
        <Nav pullRight>
            <Navbar.Text style={styles.signedIn}>
                Signed in as:
            </Navbar.Text>

            <NavDropdown eventKey={3} title={props.user} id="basic-nav-dropdown">
                <MenuItem evenKey={3.1} onClick={props.onLogout}>Logout</MenuItem>
            </NavDropdown>
        </Nav>
    )
}

function NotLoggedIn(props) {
    //remember, two different FormContainers.
    //throw in the RegisterFormContainer here?
    return (
        <Nav pullRight>
            <Navbar.Form>
                <FormGroup>
                    <FormControl sm={7} type="text" placeholder="Username or Email" value={props.user}
                                 onChange={props.onUpdateUser}/>
                </FormGroup>
                {' '}
                <FormGroup>
                    <FormControl sm={7} type="password" placeholder="Password" value={props.password}
                                 onChange={props.onUpdatePassword}/>
                </FormGroup>
                {' '}
                <Button type="submit" onClick={props.onSubmitUser}>Login</Button>
            </Navbar.Form>
        </Nav>
    )
}

function LoginForm(props) {
    return props.isLoggedIn === true
        ? <LoggedIn user={props.user} onLogout={props.onLogout}/>
        : <NotLoggedIn user={props.user} password={props.password} onUpdateUser={props.onUpdateUser} onUpdatePassword={props.onUpdatePassword} onSubmitUser={props.onSubmitUser} onRegisterLogin={props.onRegisterLogin}/>
}

module.exports = LoginForm;