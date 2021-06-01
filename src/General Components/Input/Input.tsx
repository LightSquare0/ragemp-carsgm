import Icon from "../../Utils/Icon";
import { InputBox, InputContainer } from "./InputStyles";

interface Props {
  icon: string,
  placeholder: string,
  type: string,
  value: string,
  onChange: (event: any) => void
}

const Input: React.FC<Props> = ({ icon, placeholder, type, value, onChange }) => {
  return (
    <>
      <InputContainer>
        <Icon icon={icon} size="1.625rem" color="#5c5c5c" />
        <InputBox placeholder={placeholder} type={type} value={value} onChange={onChange} />
      </InputContainer>
    </>
  );
};

export default Input;
