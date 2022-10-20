import useManageInput from "./useManageInput";
import { validateEmail } from "../utilities/validateEmail";
import { validatePhoneNumber } from "../utilities/validatePhoneNumber";

function useFormInputsHandler() {
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
export default useFormInputsHandler;
