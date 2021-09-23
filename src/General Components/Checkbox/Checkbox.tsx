import {
  CheckboxContainer,
  CheckboxStyled,
  HiddenCheckbox,
  Icon,
  Text,
} from "./CheckboxStyles";

interface Props {
  checked: boolean,
  text?: string,
  rounded: boolean,
  disabled?: boolean,
  onChange?: (event: any) => void
}

const Checkbox: React.FC<Props> = ({ disabled, checked, text, rounded, ...props }) => {
  return (
    <label>
      <CheckboxContainer>
        <HiddenCheckbox disabled={disabled} checked={checked} {...props} />
        <CheckboxStyled disabled={disabled} rounded={rounded} checked={checked}>
          <Icon rounded={false} checked = {checked} viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 13" />
          </Icon>
        </CheckboxStyled>
        <Text>{text}</Text>
      </CheckboxContainer>
    </label>
  );
};

export default Checkbox;
