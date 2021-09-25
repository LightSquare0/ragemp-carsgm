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
  dropdownElements: Array<{ id: number; name: string }>;
  dropdownText: string;
  dropdownState: boolean;
  setDropdownState: Dispatch<SetStateAction<boolean>>;
  setDropdownText: Dispatch<SetStateAction<string>>;
  setDropdownElements: Dispatch<
    SetStateAction<Array<{ id: number; name: string }>>
  >;
  currentClassId?: number;
  setCurrentClassId?: Dispatch<SetStateAction<number>>;
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  dropdownElements,
  dropdownText,
  dropdownState,
  setDropdownState,
  setDropdownText,
  setDropdownElements,
  currentClassId,
  setCurrentClassId,
  label,
}) => {
  
  const HandleSelect = (element: { id: number; name: string }) => {
    setDropdownText(element.name);
    if (currentClassId != undefined) setCurrentClassId(element.id);
  };

  console.log(currentClassId);

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
        {dropdownElements.map((element: { id: number; name: string }) => {
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
