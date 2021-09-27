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

interface Dropdown_Element {
  id: number
  name: string
  className: string
}

interface DropdownProps {
  dropdownElements: Array<Dropdown_Element>;
  dropdownText: string;
  dropdownState: boolean;
  setDropdownState: Dispatch<SetStateAction<boolean>>;
  setDropdownText: Dispatch<SetStateAction<string>>;
  setDropdownElements: Dispatch<
    SetStateAction<Array<Dropdown_Element>>
  >;
  currentClassName?: string;
  setCurrentClassName?: Dispatch<SetStateAction<string>>;
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  dropdownElements,
  dropdownText,
  dropdownState,
  setDropdownState,
  setDropdownText,
  setDropdownElements,
  currentClassName,
  setCurrentClassName,
  label,
}) => {
  const HandleSelect = (element: Dropdown_Element) => {
    setDropdownText(element.name);
    setCurrentClassName(element.className);
  };

  return (
    <DropdownWrapper onClick={() => setDropdownState(!dropdownState)}>
      {label.length == 0 ? <></> : <DropdownLabel>{label}</DropdownLabel>}
      <DropdownBox>
        <DropdownText>{dropdownText}</DropdownText>
        <DropdownButton>
          <Icon icon="angle-left-solid" size="1rem" color="white" />
        </DropdownButton>
      </DropdownBox>
      <DropdownElements state={dropdownState}>
        {dropdownElements.map((element: Dropdown_Element) => {
          return (
            <DropdownElement
              key={element.id}
              onClick={() => HandleSelect(element)}
            >
              {element.name}
            </DropdownElement>
          );
        })}
      </DropdownElements>
    </DropdownWrapper>
  );
};

export default Dropdown;
