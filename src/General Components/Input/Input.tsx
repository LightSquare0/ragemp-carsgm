import Icon from "../../Utils/Icon";
import { InputBox, InputStyled, InputContainer, InputLabel } from "./InputStyles";

interface Props {
  icon: string,
  placeholder: string,
  name: string,
  type: string,
  value: string,
  onChange: (event: any) => void
}

const Input: React.FC<Props> = ({ icon, placeholder, name, type, value, onChange }) => {

  let UpperName = name[0].toLocaleUpperCase() + name.slice(1, name.length); 

  return (
    <InputContainer>
      <InputLabel htmlFor={name}>{UpperName}</InputLabel>
      <InputStyled>
        <Icon icon={icon} size="1.8rem" color="var(--text-gray)" />
        <InputBox placeholder={placeholder} id={name} name={name} type={type} value={value} onChange={onChange} />
      </InputStyled>
    </InputContainer>
  );
};

export default Input;
