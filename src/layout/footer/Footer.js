import classes from "./Footer.module.css";
import FooterLinks from "./components/footerLinks/FooterLinks";
import FooterAddress from "./components/footerAddress/FooterAddress";
import FooterMain from "./components/footerMain/FooterMain";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={`${classes.container}`}>
        <div className={classes.main}>
          <FooterMain />
        </div>
        <div className={classes.address}>
          <FooterAddress />
        </div>
        <div className={classes.links}>
          <FooterLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
