import classes from "./HowItWorks.module.css";

import { Element } from "react-scroll/modules";
const HowItWorks = () => {
  return (
    <Element id="how" name="how">
      <section className={classes.how}>
        <div className={classes.container}>
          <span className={classes.subheading}>Jak to działa?</span>
          <h2 className={classes.secondary}>
            Zadbane paznokcie w <strong>trzech</strong> prostych krokach...
          </h2>
        </div>
        <div
          className={`${classes.container} ${classes.grid} ${classes.gridCenter}`}
        >
          {/* 1 */}
          <div data-aos="fade-right" className={classes.textBox}>
            <p className={classes.number}>01</p>
            <h3 className={classes.headingTeritary}>
              Wybierz odpowiednią datę dla siebie i daj nam znać!
            </h3>
            <p className={classes.stepDescirption}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              viverra erat ex, at efficitur erat consequat a. Phasellus et
              efficitur eros. Vestibulum magna erat, ullamcorper id placerat at,
              bibendum quis ante. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Curabitur
              fermentum nulla et nisi accumsan, vitae fermentum tellus sagittis.
            </p>
          </div>
          <div className={classes.imageBox}>
            <img
              data-aos="flip-right"
              src="https://firebasestorage.googleapis.com/v0/b/aroundher.appspot.com/o/zpat1.jpg?alt=media&token=630f4da3-18b1-4260-a240-da3569828284"
              className={classes.img}
              alt="Clock with calendar to make an appointment"
            />
          </div>
          {/* 2 */}
          <div className={classes.imageBox}>
            <img
              data-aos="flip-left"
              src="https://firebasestorage.googleapis.com/v0/b/aroundher.appspot.com/o/zpat2.jpg?alt=media&token=6dff7481-86ba-4003-be91-9f7c2cf564fb"
              className={classes.img}
              alt="Clock with calendar to make an appointment"
            />
          </div>
          <div data-aos="fade-left" className={classes.textBox}>
            <p className={classes.number}>02</p>
            <h3 className={classes.headingTeritary}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h3>
            <p className={classes.stepDescirption}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              viverra erat ex, at efficitur erat consequat a. Phasellus et
              efficitur eros. Vestibulum magna erat, ullamcorper id placerat at,
              bibendum quis ante. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Curabitur
              fermentum nulla et nisi accumsan, vitae fermentum tellus sagittis.
            </p>
          </div>
          <div data-aos="fade-right" className={classes.textBox}>
            <p className={classes.number}>03</p>
            <h3 className={classes.headingTeritary}>
              Po skończonej usłudze ciesz się...
            </h3>
            <p className={classes.stepDescirption}>
              Opublikuj swoje dłonie, oznaczając naszą pracę na swoim profilu, a
              przy następnej wizycie dostaniesz 10% rabatu!
            </p>
          </div>
          <div className={classes.imageBox}>
            <img
              data-aos="flip-right"
              src={
                "https://firebasestorage.googleapis.com/v0/b/aroundher.appspot.com/o/zpat3.jpg?alt=media&token=d292c10c-11e5-4d98-a007-dbcc54a19d0e"
              }
              className={classes.img}
              alt="A female hands with manicure"
            />
          </div>
        </div>
      </section>
    </Element>
  );
};

export default HowItWorks;
