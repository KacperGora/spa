import { Fragment } from "react"
import NavBar from "../components/mainPage/NavBar"
import classes from './Kontakt.module.css'

const Kontakt = () => {
    return (
      <Fragment>
        <NavBar />
        <section className={classes.container}>
          <span className={classes.subheading}>KONTAKT</span>
          <h2 className={classes.secondary}>
            Wybierz coś dla siebie..
          </h2>
          <div className={classes.grid}>
            <h1>hello</h1>
            <p>email</p>
            <p>tel</p>
            <p>mapa</p>
          </div>
        </section>
      </Fragment>
    );
}

export default Kontakt