import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../../../store/modalSlice";

const EventClicked = () => {
    const dispatch = useDispatch()
    const closeButtonHandler = ()=>{
        dispatch(modalActions.modalToggle())
    }
  return (
    <Fragment>
      <input></input>
      <button onClick={closeButtonHandler}>Close</button>
      <button>Ok</button>
    </Fragment>
  );
};
export default EventClicked;
