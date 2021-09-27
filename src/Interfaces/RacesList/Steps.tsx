import { useEffect, useState } from "react";
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
  StepSelectContainer,
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

interface Vehicle {
  DisplayName: string;
  Class: string;
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

  const [dropdownState, setDropdownState] = useState<boolean>(false);

  const [dropdownText, setDropdownText] = useState<string>("Type");

  const [currentClassName, setCurrentClassName] = useState<string>();

  const [dropdownElements, setDropdownElements] = useState([
    { id: 0, name: "Compacts", className: "compacts" },
    { id: 1, name: "Sedans", className: "sedan" },
    { id: 2, name: "SUVs", className: "suv" },
    { id: 3, name: "Coupes", className: "coupe" },
    { id: 4, name: "Muscle", className: "muscle" },
    { id: 5, name: "Sports Classics", className: "sport_classic" },
    { id: 6, name: "Sports", className: "sport" },
    { id: 7, name: "Super", className: "super" },
    { id: 8, name: "Motorcycles", className: "motorcycle" },
    { id: 9, name: "Off-road", className: "off_road" },
    { id: 10, name: "Industrial", className: "industrial" },
    { id: 11, name: "Utility", className: "utility" },
    { id: 12, name: "Vans", className: "van" },
    { id: 13, name: "Cycles", className: "cycle" },
    { id: 14, name: "Boats", className: "boat" },
    { id: 15, name: "Helicopters", className: "helicopter" },
    { id: 16, name: "Planes", className: "plane" },
    { id: 17, name: "Service", className: "service" },
    { id: 18, name: "Emergency", className: "emergency" },
    { id: 19, name: "Military", className: "military" },
    { id: 20, name: "Commercial", className: "commercial" },
    { id: 21, name: "Trains", className: "rail" },
  ]);

  // Array<{DisplayName: string, Class: string}>
  const [vehicleData, setVehicleData] = useState<Array<Vehicle>>([]);

  useEffect(() => {
    fetch("http://localhost:8080/vehicleClassesData.json")
      .then((data) => data.json())
      .then((actualData) => setVehicleData(actualData))
      .catch((err) => console.error(err));
  }, []);
  console.log(vehicleData);

  const [filteredVehicleData, setFilteredVehicleData] =
    useState<Array<Vehicle>>(vehicleData);

  useEffect(() => {
    let filteredData = vehicleData.filter(
      (vehicle: Vehicle) =>
        vehicle.Class == currentClassName.toLocaleUpperCase()
    );
    setFilteredVehicleData(filteredData);
    console.log(vehicleData);
    console.log(filteredData);
  }, [dropdownText]);

  console.log(raceSettings);

  return (
    <StepWrapper>
      <StepHeader>{Object.values(StepsEnum)[currentStep]}</StepHeader>
      <StepContainer size="big">
        {currentStep == 0 && (
          <>
            <StepSelect
              size="big"
              name="Time"
              onClick={(event) => HandleRaceMode(event, true)}
              checkboxState={raceSettings.Mode}
              onChange={(event) => HandleRaceMode(event, true)}
            />
            <StepSelect
              size="big"
              name="Laps"
              onClick={(event) => HandleRaceMode(event, false)}
              checkboxState={!raceSettings.Mode}
              onChange={(event) => HandleRaceMode(event, false)}
            />
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
        )}
        {currentStep == 2 && (
          <>
            <Dropdown
              label=""
              dropdownElements={dropdownElements}
              dropdownText={dropdownText}
              setDropdownState={setDropdownState}
              setDropdownText={setDropdownText}
              setDropdownElements={setDropdownElements}
              dropdownState={dropdownState}
              currentClassName={currentClassName}
              setCurrentClassName={setCurrentClassName}
            ></Dropdown>

            <StepSelectContainer>
              {filteredVehicleData.length == 0 ? (
                <div>Select a vehicle class</div>
              ) : (
                filteredVehicleData.map((vehicle) => {
                  return (
                    <StepSelect
                      name={vehicle.DisplayName}
                      size="small"
                      onClick={() => {}}
                      checkboxState={false}
                      onChange={() => {}}
                    />
                  );
                })
              )}
            </StepSelectContainer>
          </>
        )}
      </StepContainer>
      <ButtonContainer>
        <Button join onClick={updateStep}>
          <div>NEXT STEP</div>
        </Button>
      </ButtonContainer>
    </StepWrapper>
  );
};

interface StepSelect {
  name: string;
  size: "big" | "small";
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  checkboxState: boolean;
  onChange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const StepSelect: React.FC<StepSelect> = ({
  name,
  size,
  checkboxState,
  onChange,
  onClick,
}) => {
  return (
    <StepMode size={size} onClick={onClick}>
      <StepCheckbox>
        <Checkbox
          rounded={true}
          checked={checkboxState}
          onChange={onChange}
        ></Checkbox>
      </StepCheckbox>
      <StepModeText>{name}</StepModeText>
    </StepMode>
  );
};

export default Steps;
