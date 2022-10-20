import Spinner from "../UI/spinner/Spinner";

function FormStatus({ error, isLoading }) {
  return (
    <>
      {error && <p>{error}</p>}
      {isLoading && <Spinner />}
    </>
  );
}
export default FormStatus;
