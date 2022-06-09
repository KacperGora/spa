import classes from './NavBar.module.css'
import React from 'react'
import logo from '../../images/logo.png'
import { NavLink,Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
const NavBar = () => {
  
    return <header>
        <img className={classes.logo} src={logo} alt='Brand logo' />
        <nav className={classes.nav}>
        <ul className={classes.navList}>
            <li><a className={classes.navLink} href='#'>O mnie</a></li>
            <li><a className={classes.navLink} href='#'>Portfolio</a></li>
            <li><a className={classes.navLink} href='#'>Kontakt 3</a></li>
            <li><NavLink to='/appointment'  className={`${classes.navLink} ${classes.navCTA}`}>Umów wizytę</NavLink></li>
            
        </ul>
        </nav>
    </header>
}
export default NavBar