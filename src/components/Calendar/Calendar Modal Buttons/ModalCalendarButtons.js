import classes from "./ModalCalendarButtons.module.css";
function ModalCalendarButtons({ isChanging, firstButton, secondButton }) {
  return (
    <div className={classes.actions}>
      <button onClick={firstButton.onClick}>{firstButton.text}</button>
      {isChanging && (
        <button type="submit" onClick={secondButton.onClick}>
          {secondButton.text}
        </button>
      )}
    </div>
  );
}

export default ModalCalendarButtons;
