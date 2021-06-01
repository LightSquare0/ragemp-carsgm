import {
  CheckboxContainer,
  CheckboxStyled,
  HiddenCheckbox,
  Icon,
  Text,
} from "./CheckboxStyles";

interface Props {
  checked: boolean,
  text: string,
  onChange: (event: any) => void
}

const Checkbox: React.FC<Props> = ({ checked, text, ...props }) => {
  return (
    <label>
      <CheckboxContainer>
        <HiddenCheckbox checked={checked} {...props} />
        <CheckboxStyled checked={checked}>
          <Icon checked = {checked} viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 13" />
          </Icon>
        </CheckboxStyled>
        <Text>{text}</Text>
      </CheckboxContainer>
    </label>
  );
};

export default Checkbox;
