import {
  validateEmail,
  validatePhoneNumber,
} from "../../utilities/Auth/validationRegex";
import useManageInput from "../useManageInput";

function useAuthFormInputsHandler() {
  const { ...name } = useManageInput((value) => value.trim() !== "");
  const { ...secondName } = useManageInput((value) => value.trim() !== "");
  const { ...password } = useManageInput(
    (value) => value.trim() !== "" && value.trim().length > 5
  );
  const { ...mail } = useManageInput(
    (value) => value.trim() !== "" && validateEmail(value)
  );

  const { ...phoneNumber } = useManageInput(
    (value) => value.trim().length === 9 && validatePhoneNumber(value)
  );

  return { name, secondName, mail, phoneNumber, password };
}
export default useAuthFormInputsHandler;
