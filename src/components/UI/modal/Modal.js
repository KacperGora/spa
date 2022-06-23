import { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modalSlice";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(modalActions.modalToggle());
      }}
      className={classes.backdrop}
    />
  );
};

const ModalOverlay = (props) => {
   const dispatch = useDispatch();
  return (
    <div  className={classes.modal}>
      <div className={classes.content}>
        {props.children}
     
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
        <ModalOverlay >{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
