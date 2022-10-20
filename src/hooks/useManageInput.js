import { useState } from "react";

const useManageInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value)
  }

  const inputBlurHandler = (event) => {
    setIsTouched(true)
  }
  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }

  return {
    value: enteredValue, isValid: valueIsValid , hasError: hasError, valueChangeHandler, inputBlurHandler, reset
  }
};

export default useManageInput;
