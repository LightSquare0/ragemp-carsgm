import Icon from "../../Utils/Icon";
import { InputBox, InputContainer } from "./InputStyles";

const Input = ({ icon, placeholder, type, value, onChange }) => {
  return (
    <>
      <InputContainer>
        <Icon icon={icon} size="26" color="#5c5c5c" />
        <InputBox placeholder={placeholder} type={type} value={value} onChange={onChange} />
      </InputContainer>
    </>
  );
};

export default Input;
