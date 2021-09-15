import { Dispatch, SetStateAction, useState } from "react";
import Icon from "../../Utils/Icon";
import {
  DropdownBox,
  DropdownButton,
  DropdownElement,
  DropdownElements,
  DropdownLabel,
  DropdownText,
  DropdownWrapper,
} from "./DropdownStyles";

interface DropdownProps {
  dropdownElements: string[];
  dropdownText: string;
  dropdownState: boolean;
  setDropdownState: Dispatch<SetStateAction<boolean>>;
  setDropdownText: Dispatch<SetStateAction<string>>;
  setDropdownElements: Dispatch<SetStateAction<string[]>>;
  label: string; 
}

const Dropdown: React.FC<DropdownProps> = ({dropdownElements, dropdownText, dropdownState, setDropdownState, setDropdownText, setDropdownElements, label }) => {
  
  return (
    <DropdownWrapper onClick={() => setDropdownState(!dropdownState)}>
      <DropdownLabel>{label}</DropdownLabel>
      <DropdownBox>
        <DropdownText>{dropdownText}</DropdownText>
        <DropdownButton>
          <Icon icon="angle-left-solid" size="1rem" color="white" />
        </DropdownButton>
      </DropdownBox>
      <DropdownElements state={dropdownState}>
        {dropdownElements.map((element: string) => {
          return <DropdownElement onClick={() => setDropdownText(element)}>{element}</DropdownElement>;
        })}
      </DropdownElements>
    </DropdownWrapper>
  );
};

export default Dropdown;
