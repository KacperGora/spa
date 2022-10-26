import { useState } from "react";

function InputWarningParagraph({ hasError }) {
  const [isClicked, setIsClicked] = useState(false);
  const clickHandler = (e) => {
    console.log(e);
    setIsClicked(!isClicked);
  };

  return (
    hasError && (
      <p onClick={clickHandler}>
        Wprowadzono nie prawidłowe dane
        {isClicked && "sadsa"}
      </p>
    )
  );
}
export default InputWarningParagraph;
