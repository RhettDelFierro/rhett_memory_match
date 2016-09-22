

function NavPage({isAuthed, logout, closeModal}) {
    return isAuthed === true
        ? <ul>
        <li><Link to="/" className={link}>{'Home'}</Link></li>
        <li><Link to="/memory_match" className={link}>{'Memory Match'}</Link></li>
        <li><Link to="/perfect_pitch_training" className={link}>{'Perfect Pitch'}</Link></li>
        <li><Link to="/scoreboard" className={link}>{'High Scores'}</Link></li>
        <li><Link to="/profile" className={link}>{'Profile'}</Link></li>
        <li><Link to="/practice" className={link}>{'Practice'}</Link></li>
        <li><span onClick={logout}>{'LogOut'}</span></li>
    </ul>
        : <ul>
        <li>
            <NavModalContainer />
        </li>
        <li><Link to='/' className={link}>{'Home'}</Link></li>
        <li><ModalContainer/></li>
    </ul>
}

export default NavPage