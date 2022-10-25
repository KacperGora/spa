import classes from "./PageHeading.module.css";
function PageHeading({ children }) {
  return <h2 className={classes.heading}>{children}</h2>;
}

export default PageHeading;
