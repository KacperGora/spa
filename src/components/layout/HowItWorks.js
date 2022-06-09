import classes from "./HowItWorks.module.css";
import zpat1 from "../../images/zpat1.jpg";
import zpat2 from "../../images/zpat2.jpg";
import zpat3 from "../../images/zpat3.jpg";
const HowItWorks = () => {
  return (
    <section className={classes.how}>
      <div className={classes.container}>
        <span className={classes.subheading}>Jak to działa?</span>
        <h2 className={classes.secondary}>
          Zadbane paznokcie w <strong>trzech</strong> prostych krokach...
        </h2>
      </div>
      <div className={`${classes.container} ${classes.grid} ${classes.gridCenter}`}>
        {/* 1 */}
        <div className={classes.textBox}>
          <p className={classes.number}>01</p>
          <h3 className={classes.headingTeritary}>
            Wybierz odpowiednią datę dla siebie i daj nam znać!
          </h3>
          <p className={classes.stepDescirption}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            viverra erat ex, at efficitur erat consequat a. Phasellus et
            efficitur eros. Vestibulum magna erat, ullamcorper id placerat at,
            bibendum quis ante. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Curabitur fermentum
            nulla et nisi accumsan, vitae fermentum tellus sagittis.
          </p>
        </div>
        <div className={classes.imageBox}>
          <img
            src={zpat1}
            className={classes.img}
            alt="Clock with calendar to make an appointment"
          />
        </div>
        {/* 2 */}
        <div className={classes.imageBox}>
          <img
            src={zpat2}
            className={classes.img}
            alt="Clock with calendar to make an appointment"
          />
        </div>
        <div className={classes.textBox}>
          <p className={classes.number}>02</p>
          <h3 className={classes.headingTeritary}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h3>
          <p className={classes.stepDescirption}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            viverra erat ex, at efficitur erat consequat a. Phasellus et
            efficitur eros. Vestibulum magna erat, ullamcorper id placerat at,
            bibendum quis ante. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Curabitur fermentum
            nulla et nisi accumsan, vitae fermentum tellus sagittis.
          </p>
        </div>
        <div className={classes.textBox}>
          <p className={classes.number}>03</p>
          <h3 className={classes.headingTeritary}>
            Po skończonej usłudze ciesz się...
          </h3>
          <p className={classes.stepDescirption}>
            Opoublikuj swoje dłonie, oznaczając naszą pracę na swoim profilu, a przy następnej wizycie dostaniesz 10% rabatu!
          </p>
        </div>
        <div className={classes.imageBox}>
          <img
            src={zpat3}
            className={classes.img}
            alt="A female hands with manicure"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
