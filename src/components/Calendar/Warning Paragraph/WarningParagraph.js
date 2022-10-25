import classes from "./WarningParagraph.module.css";
function WarningParagraph({ children }) {
  return <p className={classes.warningParagraph}>{children}</p>;
}

export default WarningParagraph;
