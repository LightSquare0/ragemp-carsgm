import { useContext, useEffect, useState } from "react";
import Checkbox from "../../General Components/Checkbox/Checkbox";
import Dropdown from "../../General Components/Dropdown/Dropdown";
import { NotificationsContext } from "../../General Components/Notifications/NotificationsContext";
import Search from "../../General Components/Search/Search";
import Slider from "../../General Components/Slider/Slider";
import { Button } from "../../Globals/GlobalStyles/ButtonStyles";
import Icon from "../../Utils/Icon";
import {
  ButtonContainer,
  StepBackStyled,
  StepCheckbox,
  StepContainer,
  StepHeader,
  StepMode,
  StepModeText,
  StepSelectContainer,
  StepWrapper,
} from "./StepsStyles";
import { race } from "./TrackCarousel";

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
}

interface Vehicle {
  DisplayName: string;
  Class: string;
}

const Steps: React.FC<{ selectedTrackName: string }> = ({ selectedTrackName }) => {
  const { Notify } = useContext(NotificationsContext);

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [selectedVehicles, setSelectedVehicles] = useState<Array<string>>([]);

  const [raceSettings, setRaceSettings] = useState<RaceSettings>({
    Mode: true,
    Duration: 4,
    Participants: 2,
    Laps: 2,
  });

  const updateStep = (direction: "forwards" | "backwards") => {
    if (currentStep < 0 || currentStep > 2) return;
    if (currentStep == 2 && direction == "forwards") {
      if (selectedVehicles.length == 0) {
        Notify("Error", "Please select at least one vehicle", "error");
        return;
      }

      SendRaceData();
    }
    direction == "forwards"
      ? setCurrentStep(currentStep + 1)
      : setCurrentStep(currentStep - 1);
  };

  const HandleRaceMode = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mode: boolean
  ) => {
    e.preventDefault();
    setRaceSettings((prevState) => ({ ...prevState, Mode: mode }));
  };

  const HandleVehicleSelection = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    vehicle: string
  ) => {
    event.preventDefault();
    let prevSelectedVehicles = [...selectedVehicles];
    let alreadyExists = prevSelectedVehicles.find((v) => v == vehicle);

    if (alreadyExists) {
      prevSelectedVehicles.splice(prevSelectedVehicles.indexOf(alreadyExists), 1);
      setSelectedVehicles(prevSelectedVehicles);
      return;
    }

    prevSelectedVehicles.push(vehicle);
    setSelectedVehicles(prevSelectedVehicles);
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

  const [vehicleData, setVehicleData] = useState<Array<Vehicle>>([]);

  const [filteredVehicleData, setFilteredVehicleData] =
    useState<Array<Vehicle>>(vehicleData);

  useEffect(() => {
    fetch("http://naivoe.go.ro:8080/vehicleClassesData.json")
      .then((data) => data.json())
      .then((actualData) => setVehicleData(actualData))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filteredData = vehicleData.filter(
      (vehicle: Vehicle) => vehicle.Class == currentClassName.toLocaleUpperCase()
    );
    setFilteredVehicleData(filteredData);
  }, [dropdownText]);

  const SendRaceData = () => {
    //@ts-ignore
    mp.trigger(
      "clientside:HostRace",
      selectedTrackName,
      raceSettings.Mode,
      raceSettings.Laps,
      raceSettings.Duration,
      raceSettings.Participants,
      dropdownText,
      JSON.stringify(selectedVehicles)
    );
    console.log(selectedVehicles);
  };

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
                  min={1}
                  max={30}
                  currentValue={raceSettings.Duration}
                  onChange={(value: number | readonly number[], index: number) =>
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
                  min={2}
                  max={30}
                  currentValue={raceSettings.Laps}
                  onChange={(value: number | readonly number[], index: number) =>
                    setRaceSettings((prevState) => ({
                      ...prevState,
                      Laps: value,
                    }))
                  }
                />
                <div>{raceSettings.Laps} laps</div>
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
                filteredVehicleData.map((vehicle, index) => {
                  return (
                    <StepSelect
                      key={index}
                      name={vehicle.DisplayName}
                      size="small"
                      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                        HandleVehicleSelection(event, vehicle.DisplayName)
                      }
                      checkboxState={
                        selectedVehicles.find((v) => v == vehicle.DisplayName)
                          ? true
                          : false
                      }
                      onChange={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                        HandleVehicleSelection(event, vehicle.DisplayName)
                      }
                    />
                  );
                })
              )}
            </StepSelectContainer>
          </>
        )}
      </StepContainer>
      <ButtonContainer rendered={currentStep > 0}>
        {currentStep > 0 && <BackStep onClick={() => updateStep("backwards")}></BackStep>}
        <Button join onClick={() => updateStep("forwards")}>
          <div>{currentStep == 2 ? <>FINISH</> : <>NEXT STEP</>}</div>
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
        <Checkbox rounded={true} checked={checkboxState} onChange={onChange}></Checkbox>
      </StepCheckbox>
      <StepModeText>{name}</StepModeText>
    </StepMode>
  );
};

const BackStep: React.FC<{ onClick: any }> = ({ onClick }) => {
  return (
    <StepBackStyled onClick={onClick}>
      <Icon icon="angle-left-solid" size="1.5rem" color="white" />
      <div>Back</div>
    </StepBackStyled>
  );
};

export default Steps;
