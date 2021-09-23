import { useState } from "react";
import Checkbox from "../../General Components/Checkbox/Checkbox";
import Dropdown from "../../General Components/Dropdown/Dropdown";
import Search from "../../General Components/Search/Search";
import Slider from "../../General Components/Slider/Slider";
import { Button } from "../../Globals/GlobalStyles/ButtonStyles";
import {
  ButtonContainer,
  StepCheckbox,
  StepContainer,
  StepHeader,
  StepMode,
  StepModeText,
  StepWrapper,
} from "./StepsStyles";

enum StepsEnum {
  RaceMode = "Race Mode",
  DurationParticipants = "Duration and participants",
  Vehicles = "Vehicles",
}

interface RaceSettings {
  Mode: boolean;
  Duration: number | readonly number[];
  Participants: number | readonly number[];
  Laps: number | readonly number[];
  Vehicles: Array<string>;
}

const Steps: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);


  const updateStep = () => {
    if (currentStep < 0 || currentStep >= 2) return;
    setCurrentStep(currentStep + 1);
  };

  const [raceSettings, setRaceSettings] = useState<RaceSettings>({
    Mode: true,
    Duration: 0,
    Participants: 0,
    Laps: 0,
    Vehicles: [],
  });

  const HandleRaceMode = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mode: boolean
  ) => {
    e.preventDefault();
    setRaceSettings((prevState) => ({ ...prevState, Mode: mode }));
  };

  console.log(raceSettings);

  return (
    <StepWrapper>
      <StepHeader>{Object.values(StepsEnum)[currentStep]}</StepHeader>
      <StepContainer>
        {currentStep == 0 && (
          <>
            <StepMode onClick={(event) => HandleRaceMode(event, true)}>
              <StepCheckbox>
                <Checkbox
                  rounded={true}
                  checked={raceSettings.Mode}
                  onChange={(event) => HandleRaceMode(event, true)}
                ></Checkbox>
              </StepCheckbox>
              <StepModeText>Time</StepModeText>
            </StepMode>
            <StepMode onClick={(event) => HandleRaceMode(event, false)}>
              <StepCheckbox>
                <Checkbox
                  rounded={true}
                  checked={!raceSettings.Mode}
                  onChange={(event) => HandleRaceMode(event, false)}
                ></Checkbox>
              </StepCheckbox>
              <StepModeText>Laps</StepModeText>
            </StepMode>
          </>
        )}
        {currentStep == 1 && (
          <>
            {raceSettings.Mode ? (
              <>
                <Slider
                  min={5}
                  max={30}
                  currentValue={raceSettings.Duration}
                  onChange={(
                    value: number | readonly number[],
                    index: number
                  ) =>
                    setRaceSettings((prevState) => ({
                      ...prevState,
                      Duration: value,
                    }))
                  }
                />

                <div>{raceSettings.Duration} minutes</div>
              </>
            ) : (
              <>
                <Slider
                  min={5}
                  max={30}
                  currentValue={raceSettings.Duration}
                  onChange={(
                    value: number | readonly number[],
                    index: number
                  ) =>
                    setRaceSettings((prevState) => ({
                      ...prevState,
                      Laps: value,
                    }))
                  }
                />
                <div>{raceSettings.Duration} laps</div>
              </>
            )}

            <Slider
              min={2}
              max={25}
              currentValue={raceSettings.Participants}
              onChange={(value: number | readonly number[], index: number) =>
                setRaceSettings((prevState) => ({
                  ...prevState,
                  Participants: value,
                }))
              }
            />
            <div>{raceSettings.Participants} participants</div>
          </>
        )}{currentStep == 2 &&
          <>
          <Dropdown dropdownElements={} setDropdownElements={} dropdownState={} setDropdownState={} dropdownText={} setDropdownText={} ></Dropdown>
          </>
          }
      </StepContainer>
      <ButtonContainer>
        <Button join onClick={updateStep}>
          <div>NEXT STEP</div>
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

export default Steps;
