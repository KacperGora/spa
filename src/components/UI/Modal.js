import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  const dispatch = useDispatch();
  return <div onClick={()=> {dispatch(modalActions.modalToggle())}} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
   const dispatch = useDispatch();
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {props.children}
        <h2>Dodaj spotkanie</h2>
        <input type="datetime-local"></input>
        <input type="text" placeholder="Imię"></input>
        <input placeholder="Nazwisko" t></input>
        <select>
          <option>Hybryda</option>
          <option>Żel</option>
        </select>
        <button onClick={()=> dispatch(modalActions.modalToggle())}>Anuluj</button>
        <button>Akceptuj</button>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
