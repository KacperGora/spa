import Spinner from "../UI/spinner/Spinner";
import classes from "./FormStatus.module.css";
function FormStatus({ error, isLoading }) {
  return (
    <>
      {error && <p className={classes.warningParagraph}>{error}</p>}
      {isLoading && <Spinner />}
    </>
  );
}
export default FormStatus;
