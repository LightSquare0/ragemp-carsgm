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

  const [currentClassId, setCurrentClassId] = useState<number>(0);

  const [dropdownElements, setDropdownElements] = useState([
    { id: 0, name: "Compacts" },
    { id: 1, name: "Sedans" },
    { id: 2, name: "SUV" },
    { id: 3, name: "Coupes" },
    { id: 4, name: "Muscle" },
    { id: 5, name: "Sports_Classic" },
    { id: 6, name: "Sports" },
    { id: 7, name: "Super" },
    { id: 8, name: "Motorcycles" },
    { id: 9, name: "Off-road" },
    { id: 10, name: "Industrial" },
    { id: 11, name: "Utility" },
    { id: 12, name: "Vans" },
    { id: 13, name: "Cycles" },
    { id: 14, name: "Boats" },
    { id: 15, name: "Helicopters" },
    { id: 16, name: "Planes" },
    { id: 17, name: "Service" },
    { id: 18, name: "Emergency" },
    { id: 19, name: "Military" },
    { id: 20, name: "Commercial" },
    { id: 21, name: "Trains" },
  ]);

  const vehicleData = [
    { DisplayName: "Adder", Class: "SUPER" },
    { DisplayName: "Airport Bus", Class: "SERVICE" },
    { DisplayName: "Airtug", Class: "UTILITY" },
    { DisplayName: "Akula", Class: "HELICOPTER" },
    { DisplayName: "Akuma", Class: "MOTORCYCLE" },
    { DisplayName: "RO-86 Alkonost", Class: "PLANE" },
    { DisplayName: "Alpha", Class: "SPORT" },
    { DisplayName: "Alpha-Z1", Class: "PLANE" },
    { DisplayName: "Ambulance", Class: "EMERGENCY" },
    { DisplayName: "Annihilator", Class: "HELICOPTER" },
    { DisplayName: "Annihilator Stealth", Class: "HELICOPTER" },
    { DisplayName: "APC", Class: "MILITARY" },
    { DisplayName: "Ardent", Class: "SPORT_CLASSIC" },
    { DisplayName: "Army Trailer", Class: "UTILITY" },
    { DisplayName: "Army Trailer", Class: "UTILITY" },
    { DisplayName: "Army Trailer", Class: "UTILITY" },
    { DisplayName: "Asbo", Class: "COMPACT" },
    { DisplayName: "Asea", Class: "SEDAN" },
    { DisplayName: "Asea", Class: "SEDAN" },
    { DisplayName: "Asterope", Class: "SEDAN" },
    { DisplayName: "Autarch", Class: "SUPER" },
    { DisplayName: "Avarus", Class: "MOTORCYCLE" },
    { DisplayName: "Avenger", Class: "PLANE" },
    { DisplayName: "Avenger", Class: "PLANE" },
    { DisplayName: "Avisa", Class: "BOAT" },
    { DisplayName: "Bagger", Class: "MOTORCYCLE" },
    { DisplayName: "Baletrailer", Class: "UTILITY" },
    { DisplayName: "Baller", Class: "SUV" },
    { DisplayName: "Baller", Class: "SUV" },
    { DisplayName: "Baller LE", Class: "SUV" },
    { DisplayName: "Baller LE LWB", Class: "SUV" },
    { DisplayName: "Baller LE (Armored)", Class: "SUV" },
    { DisplayName: "Baller LE LWB (Armored)", Class: "SUV" },
    { DisplayName: "Banshee", Class: "SPORT" },
    { DisplayName: "Banshee 900R", Class: "SUPER" },
    { DisplayName: "Barracks", Class: "MILITARY" },
    { DisplayName: "Barracks Semi", Class: "MILITARY" },
    { DisplayName: "Barracks", Class: "MILITARY" },
    { DisplayName: "Barrage", Class: "MILITARY" },
    { DisplayName: "Bati 801", Class: "MOTORCYCLE" },
    { DisplayName: "Bati 801RR", Class: "MOTORCYCLE" },
    { DisplayName: "Benson", Class: "COMMERCIAL" },
    { DisplayName: "Besra", Class: "PLANE" },
    { DisplayName: "Bestia GTS", Class: "SPORT" },
    { DisplayName: "BF400", Class: "MOTORCYCLE" },
    { DisplayName: "Injection", Class: "OFF_ROAD" },
    { DisplayName: "Biff", Class: "COMMERCIAL" },
    { DisplayName: "Bifta", Class: "OFF_ROAD" },
    { DisplayName: "Bison", Class: "VAN" },
    { DisplayName: "Bison", Class: "VAN" },
    { DisplayName: "Bison", Class: "VAN" },
    { DisplayName: "BeeJay XL", Class: "SUV" },
    { DisplayName: "Blade", Class: "MUSCLE" },
    { DisplayName: "Blazer", Class: "OFF_ROAD" },
    { DisplayName: "Blazer Lifeguard", Class: "OFF_ROAD" },
    { DisplayName: "Hot Rod Blazer", Class: "OFF_ROAD" },
    { DisplayName: "Street Blazer", Class: "OFF_ROAD" },
    { DisplayName: "Blazer Aqua", Class: "OFF_ROAD" },
    { DisplayName: "Atomic Blimp", Class: "PLANE" },
    { DisplayName: "Xero Blimp", Class: "PLANE" },
    { DisplayName: "Blimp", Class: "PLANE" },
    { DisplayName: "Blista", Class: "COMPACT" },
    { DisplayName: "Blista Compact", Class: "SPORT" },
    { DisplayName: "Go Go Monkey Blista", Class: "SPORT" },
    { DisplayName: "BMX", Class: "CYCLE" },
    { DisplayName: "Boat Trailer", Class: "UTILITY" },
    { DisplayName: "Bobcat XL", Class: "VAN" },
    { DisplayName: "Bodhi", Class: "OFF_ROAD" },
    { DisplayName: "RM-10 Bombushka", Class: "PLANE" },
    { DisplayName: "Boxville", Class: "VAN" },
    { DisplayName: "Boxville", Class: "VAN" },
    { DisplayName: "Boxville", Class: "VAN" },
    { DisplayName: "Boxville", Class: "VAN" },
    { DisplayName: "Armored Boxville", Class: "VAN" },
    { DisplayName: "Brawler", Class: "OFF_ROAD" },
    { DisplayName: "Brickade", Class: "SERVICE" },
    { DisplayName: "Brioso R/A", Class: "COMPACT" },
    { DisplayName: "Brioso 300", Class: "COMPACTS" },
    { DisplayName: "Apocalypse Bruiser", Class: "OFF_ROAD" },
    { DisplayName: "Future Shock Bruiser", Class: "OFF_ROAD" },
    { DisplayName: "Nightmare Bruiser", Class: "OFF_ROAD" },
    { DisplayName: "Apocalypse Brutus", Class: "OFF_ROAD" },
    { DisplayName: "Future Shock Brutus", Class: "OFF_ROAD" },
    { DisplayName: "Nightmare Brutus", Class: "OFF_ROAD" },
    { DisplayName: "Roosevelt", Class: "SPORT_CLASSIC" },
    { DisplayName: "Fränken Stange", Class: "SPORT_CLASSIC" },
    { DisplayName: "Roosevelt Valor", Class: "SPORT_CLASSIC" },
    { DisplayName: "Buccaneer", Class: "MUSCLE" },
    { DisplayName: "Buccaneer Custom", Class: "MUSCLE" },
    { DisplayName: "Buffalo", Class: "SPORT" },
    { DisplayName: "Buffalo S", Class: "SPORT" },
    { DisplayName: "Sprunk Buffalo", Class: "SPORT" },
    { DisplayName: "Dozer", Class: "INDUSTRIAL" },
    { DisplayName: "Bullet", Class: "SUPER" },
    { DisplayName: "Burrito", Class: "VAN" },
    { DisplayName: "Bugstars Burrito", Class: "VAN" },
    { DisplayName: "Burrito", Class: "VAN" },
    { DisplayName: "Burrito", Class: "VAN" },
    { DisplayName: "Burrito", Class: "VAN" },
    { DisplayName: "Bus", Class: "SERVICE" },
    { DisplayName: "Buzzard Attack Chopper", Class: "HELICOPTER" },
    { DisplayName: "Buzzard", Class: "HELICOPTER" },
    { DisplayName: "Cable Car", Class: "RAIL" },
    { DisplayName: "Caddy", Class: "UTILITY" },
    { DisplayName: "Caddy", Class: "UTILITY" },
    { DisplayName: "Caddy", Class: "UTILITY" },
    { DisplayName: "Calico GTF", Class: "SPORT" },
    { DisplayName: "Camper", Class: "VAN" },
    { DisplayName: "Caracara", Class: "OFF_ROAD" },
    { DisplayName: "Caracara 4x4", Class: "OFF_ROAD" },
    { DisplayName: "Carbonizzare", Class: "SPORT" },
    { DisplayName: "Carbon RS", Class: "MOTORCYCLE" },
    { DisplayName: "Cargobob", Class: "HELICOPTER" },
    { DisplayName: "Cargobob", Class: "HELICOPTER" },
    { DisplayName: "Cargobob", Class: "HELICOPTER" },
    { DisplayName: "Cargobob", Class: "HELICOPTER" },
    { DisplayName: "Cargo Plane", Class: "PLANE" },
    { DisplayName: "Casco", Class: "SPORT_CLASSIC" },
    { DisplayName: "Cavalcade", Class: "SUV" },
    { DisplayName: "Cavalcade", Class: "SUV" },
    { DisplayName: "Apocalypse Cerberus", Class: "COMMERCIAL" },
    { DisplayName: "Future Shock Cerberus", Class: "COMMERCIAL" },
    { DisplayName: "Nightmare Cerberus", Class: "COMMERCIAL" },
    { DisplayName: "Cheburek", Class: "SPORT_CLASSIC" },
    { DisplayName: "Cheetah", Class: "SUPER" },
    { DisplayName: "Cheetah Classic", Class: "SPORT_CLASSIC" },
    { DisplayName: "Chernobog", Class: "MILITARY" },
    { DisplayName: "Chimera", Class: "MOTORCYCLE" },
    { DisplayName: "Chino", Class: "MUSCLE" },
    { DisplayName: "Chino Custom", Class: "MUSCLE" },
    { DisplayName: "Cliffhanger", Class: "MOTORCYCLE" },
    { DisplayName: "Clique", Class: "MUSCLE" },
    { DisplayName: "Club", Class: "COMPACT" },
    { DisplayName: "Dashound", Class: "SERVICE" },
    { DisplayName: "Cognoscenti 55", Class: "SEDAN" },
    { DisplayName: "Cognoscenti 55 (Armored)", Class: "SEDAN" },
    { DisplayName: "Cognoscenti Cabrio", Class: "COUPE" },
    { DisplayName: "Cognoscenti", Class: "SEDAN" },
    { DisplayName: "Cognoscenti (Armored)", Class: "SEDAN" },
    { DisplayName: "Comet", Class: "SPORT" },
    { DisplayName: "Comet Retro Custom", Class: "SPORT" },
    { DisplayName: "Comet Safari", Class: "SPORT" },
    { DisplayName: "Comet SR", Class: "SPORT" },
    { DisplayName: "Comet S2", Class: "SPORT" },
    { DisplayName: "Contender", Class: "SUV" },
    { DisplayName: "Coquette", Class: "SPORT" },
    { DisplayName: "Coquette Classic", Class: "SPORT_CLASSIC" },
    { DisplayName: "Coquette BlackFin", Class: "MUSCLE" },
    { DisplayName: "Coquette D10", Class: "SPORT" },
    { DisplayName: "Cruiser", Class: "CYCLE" },
    { DisplayName: "Crusader", Class: "MILITARY" },
    { DisplayName: "Cuban 800", Class: "PLANE" },
    { DisplayName: "Cutter", Class: "INDUSTRIAL" },
    { DisplayName: "Cyclone", Class: "SUPER" },
    { DisplayName: "Cypher", Class: "SPORT" },
    { DisplayName: "Daemon", Class: "MOTORCYCLE" },
    { DisplayName: "Daemon", Class: "MOTORCYCLE" },
    { DisplayName: "Apocalypse Deathbike", Class: "MOTORCYCLE" },
    { DisplayName: "Future Shock Deathbike", Class: "MOTORCYCLE" },
    { DisplayName: "Nightmare Deathbike", Class: "MOTORCYCLE" },
    { DisplayName: "Defiler", Class: "MOTORCYCLE" },
    { DisplayName: "Deluxo", Class: "SPORT_CLASSIC" },
    { DisplayName: "Deveste Eight", Class: "SUPER" },
    { DisplayName: "Deviant", Class: "MUSCLE" },
    { DisplayName: "Diabolus", Class: "MOTORCYCLE" },
    { DisplayName: "Diabolus Custom", Class: "MOTORCYCLE" },
    { DisplayName: "Dilettante", Class: "COMPACT" },
    { DisplayName: "Dilettante", Class: "COMPACT" },
    { DisplayName: "Dinghy", Class: "BOAT" },
    { DisplayName: "Dinghy", Class: "BOAT" },
    { DisplayName: "Dinghy", Class: "BOAT" },
    { DisplayName: "Dinghy", Class: "BOAT" },
    { DisplayName: "Weaponized Dinghy", Class: "BOAT" },
    { DisplayName: "Duneloader", Class: "OFF_ROAD" },
    { DisplayName: null, Class: "UTILITY" },
    { DisplayName: "Docktug", Class: "UTILITY" },
    { DisplayName: "Dodo", Class: "PLANE" },
    { DisplayName: "Dominator", Class: "MUSCLE" },
    { DisplayName: "Pisswasser Dominator", Class: "MUSCLE" },
    { DisplayName: "Dominator GTX", Class: "MUSCLE" },
    { DisplayName: "Apocalypse Dominator", Class: "MUSCLE" },
    { DisplayName: "Future Shock Dominator", Class: "MUSCLE" },
    { DisplayName: "Nightmare Dominator", Class: "MUSCLE" },
    { DisplayName: "Dominator ASP", Class: "MUSCLE" },
    { DisplayName: "Dominator GTT", Class: "MUSCLE" },
    { DisplayName: "Double-T", Class: "MOTORCYCLE" },
    { DisplayName: "8F Drafter", Class: "SPORT" },
    { DisplayName: "Dubsta", Class: "SUV" },
    { DisplayName: "Dubsta", Class: "SUV" },
    { DisplayName: "Dubsta 6x6", Class: "OFF_ROAD" },
    { DisplayName: "Dukes", Class: "MUSCLE" },
    { DisplayName: "Duke O'Death", Class: "MUSCLE" },
    { DisplayName: "Beater Dukes", Class: "MUSCLE" },
    { DisplayName: "Dump", Class: "INDUSTRIAL" },
    { DisplayName: "Dune Buggy", Class: "OFF_ROAD" },
    { DisplayName: "Space Docker", Class: "OFF_ROAD" },
    { DisplayName: "Dune FAV", Class: "OFF_ROAD" },
    { DisplayName: "Ramp Buggy", Class: "OFF_ROAD" },
    { DisplayName: "Ramp Buggy", Class: "OFF_ROAD" },
    { DisplayName: "Duster", Class: "PLANE" },
    { DisplayName: "Dynasty", Class: "SPORT_CLASSIC" },
    { DisplayName: "Elegy Retro Custom", Class: "SPORT" },
    { DisplayName: "Elegy RH8", Class: "SPORT" },
    { DisplayName: "Ellie", Class: "MUSCLE" },
    { DisplayName: "Emerus", Class: "SUPER" },
    { DisplayName: "Emperor", Class: "SEDAN" },
    { DisplayName: "Emperor", Class: "SEDAN" },
    { DisplayName: "Emperor", Class: "SEDAN" },
    { DisplayName: "Enduro", Class: "MOTORCYCLE" },
    { DisplayName: "Entity XXR", Class: "SUPER" },
    { DisplayName: "Entity XF", Class: "SUPER" },
    { DisplayName: "Esskey", Class: "MOTORCYCLE" },
    { DisplayName: "Euros", Class: "SPORT" },
    { DisplayName: "Everon", Class: "OFF_ROAD" },
    { DisplayName: "Exemplar", Class: "COUPE" },
    { DisplayName: "F620", Class: "COUPE" },
    { DisplayName: "Faction", Class: "MUSCLE" },
    { DisplayName: "Faction Custom", Class: "MUSCLE" },
    { DisplayName: "Faction Custom Donk", Class: "MUSCLE" },
    { DisplayName: "Fagaloa", Class: "SPORT_CLASSIC" },
    { DisplayName: "Faggio Sport", Class: "MOTORCYCLE" },
    { DisplayName: "Faggio", Class: "MOTORCYCLE" },
    { DisplayName: "Faggio Mod", Class: "MOTORCYCLE" },
    { DisplayName: "FIB", Class: "EMERGENCY" },
    { DisplayName: "FIB", Class: "EMERGENCY" },
    { DisplayName: "FCR 1000", Class: "MOTORCYCLE" },
    { DisplayName: "FCR 1000 Custom", Class: "MOTORCYCLE" },
    { DisplayName: "Felon", Class: "COUPE" },
    { DisplayName: "Felon GT", Class: "COUPE" },
    { DisplayName: "Feltzer", Class: "SPORT" },
    { DisplayName: "Stirling GT", Class: "SPORT_CLASSIC" },
    { DisplayName: "Fire Truck", Class: "EMERGENCY" },
    { DisplayName: "Fixter", Class: "CYCLE" },
    { DisplayName: "Flash GT", Class: "SPORT" },
    { DisplayName: "Flatbed", Class: "INDUSTRIAL" },
    { DisplayName: "FMJ", Class: "SUPER" },
    { DisplayName: "Forklift", Class: "UTILITY" },
    { DisplayName: "PR4", Class: "OPEN_WHEEL" },
    { DisplayName: "R88", Class: "OPEN_WHEEL" },
    { DisplayName: "FQ 2", Class: "SUV" },
    { DisplayName: "Freecrawler", Class: "OFF_ROAD" },
    { DisplayName: "Freight Train", Class: "RAIL" },
    { DisplayName: "Freight Train", Class: "RAIL" },
    { DisplayName: "Freight Train", Class: "RAIL" },
    { DisplayName: "Freight Train", Class: "RAIL" },
    { DisplayName: "Freight Train", Class: "RAIL" },
    { DisplayName: "Freight Train", Class: "RAIL" },
    { DisplayName: null, Class: "UTILITY" },
    { DisplayName: "Frogger", Class: "HELICOPTER" },
    { DisplayName: "Frogger", Class: "HELICOPTER" },
    { DisplayName: "Fugitive", Class: "SEDAN" },
    { DisplayName: "Furia", Class: "SUPER" },
    { DisplayName: "Furore GT", Class: "SPORT" },
    { DisplayName: "Fusilade", Class: "SPORT" },
    { DisplayName: "Futo", Class: "SPORT" },
    { DisplayName: "Futo GTX", Class: "SPORT" },
    { DisplayName: "Gargoyle", Class: "MOTORCYCLE" },
    { DisplayName: "Gauntlet", Class: "MUSCLE" },
    { DisplayName: "Redwood Gauntlet", Class: "MUSCLE" },
    { DisplayName: "Gauntlet Classic", Class: "MUSCLE" },
    { DisplayName: "Gauntlet Hellfire", Class: "MUSCLE" },
    { DisplayName: "Gauntlet Classic Custom", Class: "MUSCLE" },
    { DisplayName: "GB200", Class: "SPORT" },
    { DisplayName: "Gang Burrito", Class: "VAN" },
    { DisplayName: "Gang Burrito", Class: "VAN" },
    { DisplayName: "Glendale", Class: "SEDAN" },
    { DisplayName: "Glendale Custom", Class: "SEDAN" },
    { DisplayName: "GP1", Class: "SUPER" },
    { DisplayName: "Graintrailer", Class: "UTILITY" },
    { DisplayName: "Granger", Class: "SUV" },
    { DisplayName: "Gresley", Class: "SUV" },
    { DisplayName: "Growler", Class: "SPORT" },
    { DisplayName: "GT500", Class: "SPORT_CLASSIC" },
    { DisplayName: "Guardian", Class: "INDUSTRIAL" },
    { DisplayName: "Habanero", Class: "SUV" },
    { DisplayName: "Hakuchou", Class: "MOTORCYCLE" },
    { DisplayName: "Hakuchou Drag", Class: "MOTORCYCLE" },
    { DisplayName: "Half-track", Class: "MILITARY" },
    { DisplayName: "Dock Handler", Class: "INDUSTRIAL" },
    { DisplayName: "Hauler", Class: "COMMERCIAL" },
    { DisplayName: "Hauler Custom", Class: "COMMERCIAL" },
    { DisplayName: "Havok", Class: "HELICOPTER" },
    { DisplayName: "Hellion", Class: "OFF_ROAD" },
    { DisplayName: "Hermes", Class: "MUSCLE" },
    { DisplayName: "Hexer", Class: "MOTORCYCLE" },
    { DisplayName: "Hotknife", Class: "MUSCLE" },
    { DisplayName: "Hotring Sabre", Class: "SPORT" },
    { DisplayName: "Howard NX-25", Class: "PLANE" },
    { DisplayName: "FH-1 Hunter", Class: "HELICOPTER" },
    { DisplayName: "Huntley S", Class: "SUV" },
    { DisplayName: "Hustler", Class: "MUSCLE" },
    { DisplayName: "Hydra", Class: "PLANE" },
    { DisplayName: "Imorgon", Class: "SPORT" },
    { DisplayName: "Impaler", Class: "MUSCLE" },
    { DisplayName: "Apocalypse Impaler", Class: "MUSCLE" },
    { DisplayName: "Future Shock Impaler", Class: "MUSCLE" },
    { DisplayName: "Nightmare Impaler", Class: "MUSCLE" },
    { DisplayName: "Apocalypse Imperator", Class: "MUSCLE" },
    { DisplayName: "Future Shock Imperator", Class: "MUSCLE" },
    { DisplayName: "Nightmare Imperator", Class: "MUSCLE" },
    { DisplayName: "Infernus", Class: "SUPER" },
    { DisplayName: "Infernus Classic", Class: "SPORT_CLASSIC" },
    { DisplayName: "Ingot", Class: "SEDAN" },
    { DisplayName: "Innovation", Class: "MOTORCYCLE" },
    { DisplayName: "Insurgent Pick-Up", Class: "OFF_ROAD" },
    { DisplayName: "Insurgent", Class: "OFF_ROAD" },
    { DisplayName: "Insurgent Pick-Up Custom", Class: "OFF_ROAD" },
    { DisplayName: "Intruder", Class: "SEDAN" },
    { DisplayName: "Issi", Class: "COMPACT" },
    { DisplayName: "Issi Classic", Class: "COMPACTS" },
    { DisplayName: "Apocalypse Issi", Class: "COMPACTS" },
    { DisplayName: "Future Shock Issi", Class: "COMPACTS" },
    { DisplayName: "Nightmare Issi", Class: "COMPACTS" },
    { DisplayName: "Issi Sport", Class: "SPORT" },
    { DisplayName: "Itali GTB", Class: "SUPER" },
    { DisplayName: "Itali GTB Custom", Class: "SUPER" },
    { DisplayName: "Itali GTO", Class: "SPORT" },
    { DisplayName: "Itali RSX", Class: "SPORT" },
    { DisplayName: "Jackal", Class: "COUPE" },
    { DisplayName: "JB 700", Class: "SPORT_CLASSIC" },
    { DisplayName: "JB 700W", Class: "SPORT_CLASSIC" },
    { DisplayName: "Jester", Class: "SPORT" },
    { DisplayName: "Jester (Racecar)", Class: "SPORT" },
    { DisplayName: "Jester Classic", Class: "SPORT" },
    { DisplayName: "Jester RR", Class: "SPORT" },
    { DisplayName: "Jet", Class: "PLANE" },
    { DisplayName: "Jetmax", Class: "BOAT" },
    { DisplayName: "Journey", Class: "VAN" },
    { DisplayName: "Jugular", Class: "SPORT" },
    { DisplayName: "Kalahari", Class: "OFF_ROAD" },
    { DisplayName: "Kamacho", Class: "OFF_ROAD" },
    { DisplayName: "Blista Kanjo", Class: "COMPACT" },
    { DisplayName: "Khamelion", Class: "SPORT" },
    { DisplayName: "TM-02 Khanjali", Class: "MILITARY" },
    { DisplayName: "Komoda", Class: "SPORT" },
    { DisplayName: "Kosatka", Class: "BOAT" },
    { DisplayName: "Krieger", Class: "SUPER" },
    { DisplayName: "Kuruma", Class: "SPORT" },
    { DisplayName: "Kuruma (armored)", Class: "SPORT" },
    { DisplayName: "Landstalker", Class: "SUV" },
    { DisplayName: "Landstalker XL", Class: "SUV" },
    { DisplayName: "P-996 LAZER", Class: "PLANE" },
    { DisplayName: "RE-7B", Class: "SUPER" },
    { DisplayName: "Lectro", Class: "MOTORCYCLE" },
    { DisplayName: "Lifeguard", Class: "EMERGENCY" },
    { DisplayName: "Turreted Limo", Class: "SEDAN" },
    { DisplayName: "Locust", Class: "SPORT" },
    { DisplayName: "Longfin", Class: "BOAT" },
    { DisplayName: "Lurcher", Class: "MUSCLE" },
    { DisplayName: "Luxor", Class: "PLANE" },
    { DisplayName: "Luxor Deluxe", Class: "PLANE" },
    { DisplayName: "Lynx", Class: "SPORT" },
    { DisplayName: "Mamba", Class: "SPORT_CLASSIC" },
    { DisplayName: "Mammatus", Class: "PLANE" },
    { DisplayName: "Manana", Class: "SPORT_CLASSIC" },
    { DisplayName: "Manana Custom", Class: "MUSCLE" },
    { DisplayName: "Manchez", Class: "MOTORCYCLE" },
    { DisplayName: "Manchez Scout", Class: "MOTORCYCLE" },
    { DisplayName: "Marquis", Class: "BOAT" },
    { DisplayName: "Marshall", Class: "OFF_ROAD" },
    { DisplayName: "Massacro", Class: "SPORT" },
    { DisplayName: "Massacro (Racecar)", Class: "SPORT" },
    { DisplayName: "Maverick", Class: "HELICOPTER" },
    { DisplayName: "Menacer", Class: "OFF_ROAD" },
    { DisplayName: "Mesa", Class: "SUV" },
    { DisplayName: "Mesa", Class: "SUV" },
    { DisplayName: "Mesa", Class: "OFF_ROAD" },
    { DisplayName: "Freight Train", Class: "RAIL" },
    { DisplayName: "Michelli GT", Class: "SPORT_CLASSIC" },
    { DisplayName: "Ultralight", Class: "PLANE" },
    { DisplayName: "Miljet", Class: "PLANE" },
    { DisplayName: "Invade and Persuade Tank", Class: "MILITARY" },
    { DisplayName: "Minivan", Class: "VAN" },
    { DisplayName: "Minivan Custom", Class: "VAN" },
    { DisplayName: "Mixer", Class: "INDUSTRIAL" },
    { DisplayName: "Mixer", Class: "INDUSTRIAL" },
    { DisplayName: "Mogul", Class: "PLANE" },
    { DisplayName: "V-65 Molotok", Class: "PLANE" },
    { DisplayName: "Monroe", Class: "SPORT_CLASSIC" },
    { DisplayName: "Monster", Class: "OFF_ROAD" },
    { DisplayName: "Apocalypse Sasquatch", Class: "OFF_ROAD" },
    { DisplayName: "Future Shock Sasquatch", Class: "OFF_ROAD" },
    { DisplayName: "Nightmare Sasquatch", Class: "OFF_ROAD" },
    { DisplayName: "Moonbeam", Class: "MUSCLE" },
    { DisplayName: "Moonbeam Custom", Class: "MUSCLE" },
    { DisplayName: "Lawn Mower", Class: "UTILITY" },
    { DisplayName: "Mule", Class: "COMMERCIAL" },
    { DisplayName: "Mule", Class: "COMMERCIAL" },
    { DisplayName: "Mule", Class: "COMMERCIAL" },
    { DisplayName: "Mule Custom", Class: "COMMERCIAL" },
    { DisplayName: "Nebula Turbo", Class: "SPORT_CLASSIC" },
    { DisplayName: "Nemesis", Class: "MOTORCYCLE" },
    { DisplayName: "Neo", Class: "SPORT" },
    { DisplayName: "Neon", Class: "SPORT" },
    { DisplayName: "Nero", Class: "SUPER" },
    { DisplayName: "Nero Custom", Class: "SUPER" },
    { DisplayName: "Nightblade", Class: "MOTORCYCLE" },
    { DisplayName: "Nightshade", Class: "MUSCLE" },
    { DisplayName: "Nightshark", Class: "OFF_ROAD" },
    { DisplayName: "Nimbus", Class: "PLANE" },
    { DisplayName: "9F", Class: "SPORT" },
    { DisplayName: "9F Cabrio", Class: "SPORT" },
    { DisplayName: "P-45 Nokota", Class: "PLANE" },
    { DisplayName: "Novak", Class: "SUV" },
    { DisplayName: "Omnis", Class: "SPORT" },
    { DisplayName: "BR8", Class: "OPEN_WHEEL" },
    { DisplayName: "DR1", Class: "OPEN_WHEEL" },
    { DisplayName: "Oppressor", Class: "MOTORCYCLE" },
    { DisplayName: "Oppressor Mk II", Class: "MOTORCYCLE" },
    { DisplayName: "Oracle XS", Class: "COUPE" },
    { DisplayName: "Oracle", Class: "COUPE" },
    { DisplayName: "Osiris", Class: "SUPER" },
    { DisplayName: "Outlaw", Class: "OFF_ROAD" },
    { DisplayName: "Packer", Class: "COMMERCIAL" },
    { DisplayName: "Panto", Class: "COMPACT" },
    { DisplayName: "Paradise", Class: "VAN" },
    { DisplayName: "Paragon R", Class: "SPORT" },
    { DisplayName: "Paragon R (Armored)", Class: "SPORT" },
    { DisplayName: "Pariah", Class: "SPORT" },
    { DisplayName: "Patriot", Class: "SUV" },
    { DisplayName: "Patriot Stretch", Class: "SUV" },
    { DisplayName: "Kurtz 31 Patrol Boat", Class: "BOAT" },
    { DisplayName: "Police Prison Bus", Class: "EMERGENCY" },
    { DisplayName: "Festival Bus", Class: "SERVICE" },
    { DisplayName: "PCJ 600", Class: "MOTORCYCLE" },
    { DisplayName: "Penetrator", Class: "SUPER" },
    { DisplayName: "Penumbra", Class: "SPORT" },
    { DisplayName: "Penumbra FF", Class: "SPORT" },
    { DisplayName: "Peyote", Class: "SPORT_CLASSIC" },
    { DisplayName: "Peyote Gasser", Class: "MUSCLE" },
    { DisplayName: "Peyote Custom", Class: "SPORT_CLASSIC" },
    { DisplayName: "811", Class: "SUPER" },
    { DisplayName: "Phantom", Class: "COMMERCIAL" },
    { DisplayName: "Phantom Wedge", Class: "COMMERCIAL" },
    { DisplayName: "Phantom Custom", Class: "COMMERCIAL" },
    { DisplayName: "Phoenix", Class: "MUSCLE" },
    { DisplayName: "Picador", Class: "MUSCLE" },
    { DisplayName: "Pigalle", Class: "SPORT_CLASSIC" },
    { DisplayName: "Police Cruiser", Class: "EMERGENCY" },
    { DisplayName: "Police Cruiser", Class: "EMERGENCY" },
    { DisplayName: "Police Cruiser", Class: "EMERGENCY" },
    { DisplayName: "Unmarked Cruiser", Class: "EMERGENCY" },
    { DisplayName: "Police Bike", Class: "EMERGENCY" },
    { DisplayName: "Police Rancher", Class: "EMERGENCY" },
    { DisplayName: "Police Roadcruiser", Class: "EMERGENCY" },
    { DisplayName: "Police Transporter", Class: "EMERGENCY" },
    { DisplayName: "Police Maverick", Class: "HELICOPTER" },
    { DisplayName: "Pony", Class: "VAN" },
    { DisplayName: "Pony", Class: "VAN" },
    { DisplayName: "Pounder", Class: "COMMERCIAL" },
    { DisplayName: "Pounder Custom", Class: "COMMERCIAL" },
    { DisplayName: "Prairie", Class: "COMPACT" },
    { DisplayName: "Park Ranger", Class: "EMERGENCY" },
    { DisplayName: "Police Predator", Class: "BOAT" },
    { DisplayName: "Premier", Class: "SEDAN" },
    { DisplayName: "Previon", Class: "COUPE" },
    { DisplayName: "Primo", Class: "SEDAN" },
    { DisplayName: "Primo Custom", Class: "SEDAN" },
    { DisplayName: null, Class: "UTILITY" },
    { DisplayName: "X80 Proto", Class: "SUPER" },
    { DisplayName: "Pyro", Class: "PLANE" },
    { DisplayName: "Radius", Class: "SUV" },
    { DisplayName: "Raiden", Class: "SPORT" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Dune", Class: "SERVICE" },
    { DisplayName: "Rancher XL", Class: "OFF_ROAD" },
    { DisplayName: "Rancher XL", Class: "OFF_ROAD" },
    { DisplayName: "Rapid GT", Class: "SPORT" },
    { DisplayName: "Rapid GT", Class: "SPORT" },
    { DisplayName: "Rapid GT Classic", Class: "SPORT_CLASSIC" },
    { DisplayName: "Raptor", Class: "SPORT" },
    { DisplayName: "Rat Bike", Class: "MOTORCYCLE" },
    { DisplayName: "Rat-Loader", Class: "MUSCLE" },
    { DisplayName: "Rat-Truck", Class: "MUSCLE" },
    { DisplayName: "RC Bandito", Class: "OFF_ROAD" },
    { DisplayName: "Reaper", Class: "SUPER" },
    { DisplayName: "Rusty Rebel", Class: "OFF_ROAD" },
    { DisplayName: "Rebel", Class: "OFF_ROAD" },
    { DisplayName: "Rebla GTS", Class: "SUV" },
    { DisplayName: "Regina", Class: "SEDAN" },
    { DisplayName: "Remus", Class: "SPORT" },
    { DisplayName: "Rental Shuttle Bus", Class: "SERVICE" },
    { DisplayName: "Retinue", Class: "SPORT_CLASSIC" },
    { DisplayName: "Retinue Mk II", Class: "SPORT_CLASSIC" },
    { DisplayName: "Revolter", Class: "SPORT" },
    { DisplayName: "Rhapsody", Class: "COMPACT" },
    { DisplayName: "Rhino Tank", Class: "MILITARY" },
    { DisplayName: "Riata", Class: "OFF_ROAD" },
    { DisplayName: "Police Riot", Class: "EMERGENCY" },
    { DisplayName: "RCV", Class: "EMERGENCY" },
    { DisplayName: "Ripley", Class: "UTILITY" },
    { DisplayName: "Rocoto", Class: "SUV" },
    { DisplayName: "Rogue", Class: "PLANE" },
    { DisplayName: "Romero Hearse", Class: "SEDAN" },
    { DisplayName: "Rampant Rocket", Class: "MOTORCYCLE" },
    { DisplayName: "RT3000", Class: "SPORT" },
    { DisplayName: "Rubble", Class: "INDUSTRIAL" },
    { DisplayName: "Ruffian", Class: "MOTORCYCLE" },
    { DisplayName: "Ruiner", Class: "MUSCLE" },
    { DisplayName: "Ruiner 2000", Class: "MUSCLE" },
    { DisplayName: "Ruiner", Class: "MUSCLE" },
    { DisplayName: "Rumpo", Class: "VAN" },
    { DisplayName: "Rumpo", Class: "VAN" },
    { DisplayName: "Rumpo Custom", Class: "VAN" },
    { DisplayName: "Ruston", Class: "SPORT" },
    { DisplayName: "S80RR", Class: "SUPER" },
    { DisplayName: "Sabre Turbo", Class: "MUSCLE" },
    { DisplayName: "Sabre Turbo Custom", Class: "MUSCLE" },
    { DisplayName: "Sadler", Class: "UTILITY" },
    { DisplayName: "Sadler", Class: "UTILITY" },
    { DisplayName: "Sanchez (livery)", Class: "MOTORCYCLE" },
    { DisplayName: "Sanchez", Class: "MOTORCYCLE" },
    { DisplayName: "Sanctus", Class: "MOTORCYCLE" },
    { DisplayName: "Sandking XL", Class: "OFF_ROAD" },
    { DisplayName: "Sandking SWB", Class: "OFF_ROAD" },
    { DisplayName: "Savage", Class: "HELICOPTER" },
    { DisplayName: "Savestra", Class: "SPORT_CLASSIC" },
    { DisplayName: "SC1", Class: "SUPER" },
    { DisplayName: "Apocalypse Scarab", Class: "MILITARY" },
    { DisplayName: "Future Shock Scarab", Class: "MILITARY" },
    { DisplayName: "Nightmare Scarab", Class: "MILITARY" },
    { DisplayName: "Schafter", Class: "SEDAN" },
    { DisplayName: "Schafter V12", Class: "SPORT" },
    { DisplayName: "Schafter LWB", Class: "SPORT" },
    { DisplayName: "Schafter V12 (Armored)", Class: "SEDAN" },
    { DisplayName: "Schafter LWB (Armored)", Class: "SEDAN" },
    { DisplayName: "Schlagen GT", Class: "SPORT" },
    { DisplayName: "Schwartzer", Class: "SPORT" },
    { DisplayName: "Scorcher", Class: "CYCLE" },
    { DisplayName: "Scramjet", Class: "SUPER" },
    { DisplayName: "Scrap Truck", Class: "UTILITY" },
    { DisplayName: "Seabreeze", Class: "PLANE" },
    { DisplayName: "Seashark", Class: "BOAT" },
    { DisplayName: "Seashark", Class: "BOAT" },
    { DisplayName: "Seashark", Class: "BOAT" },
    { DisplayName: "Sea Sparrow", Class: "HELICOPTER" },
    { DisplayName: "Sparrow", Class: "HELICOPTER" },
    { DisplayName: "Sparrow", Class: "HELICOPTER" },
    { DisplayName: "Seminole", Class: "SUV" },
    { DisplayName: "Seminole Frontier", Class: "SUV" },
    { DisplayName: "Sentinel XS", Class: "COUPE" },
    { DisplayName: "Sentinel", Class: "COUPE" },
    { DisplayName: "Sentinel", Class: "SPORT" },
    { DisplayName: "Serrano", Class: "SUV" },
    { DisplayName: "Seven-70", Class: "SPORT" },
    { DisplayName: "Shamal", Class: "PLANE" },
    { DisplayName: "ETR1", Class: "SUPER" },
    { DisplayName: "Sheriff Cruiser", Class: "EMERGENCY" },
    { DisplayName: "Sheriff SUV", Class: "EMERGENCY" },
    { DisplayName: "Shotaro", Class: "MOTORCYCLE" },
    { DisplayName: "Skylift", Class: "HELICOPTER" },
    { DisplayName: "Slamtruck", Class: "UTILITY" },
    { DisplayName: "Slamvan", Class: "MUSCLE" },
    { DisplayName: "Lost Slamvan", Class: "MUSCLE" },
    { DisplayName: "Slamvan Custom", Class: "MUSCLE" },
    { DisplayName: "Apocalypse Slamvan", Class: "MUSCLE" },
    { DisplayName: "Future Shock Slamvan", Class: "MUSCLE" },
    { DisplayName: "Nightmare Slamvan", Class: "MUSCLE" },
    { DisplayName: "Sovereign", Class: "MOTORCYCLE" },
    { DisplayName: "Specter", Class: "SPORT" },
    { DisplayName: "Specter Custom", Class: "SPORT" },
    { DisplayName: "Speeder", Class: "BOAT" },
    { DisplayName: "Speeder", Class: "BOAT" },
    { DisplayName: "Speedo", Class: "VAN" },
    { DisplayName: "Clown Van", Class: "VAN" },
    { DisplayName: "Speedo Custom", Class: "VAN" },
    { DisplayName: "Squaddie", Class: "SUV" },
    { DisplayName: "Squalo", Class: "BOAT" },
    { DisplayName: "Stafford", Class: "SEDAN" },
    { DisplayName: "Stallion", Class: "MUSCLE" },
    { DisplayName: "Burger Shot Stallion", Class: "MUSCLE" },
    { DisplayName: "Stanier", Class: "SEDAN" },
    { DisplayName: "LF-22 Starling", Class: "PLANE" },
    { DisplayName: "Stinger", Class: "SPORT_CLASSIC" },
    { DisplayName: "Stinger GT", Class: "SPORT_CLASSIC" },
    { DisplayName: "Stockade", Class: "COMMERCIAL" },
    { DisplayName: "Stockade", Class: "COMMERCIAL" },
    { DisplayName: "Stratum", Class: "SEDAN" },
    { DisplayName: "Streiter", Class: "SPORT" },
    { DisplayName: "Stretch", Class: "SEDAN" },
    { DisplayName: "B-11 Strikeforce", Class: "PLANE" },
    { DisplayName: "Stromberg", Class: "SPORT_CLASSIC" },
    { DisplayName: "Stryder", Class: "MOTORCYCLE" },
    { DisplayName: "Mallard", Class: "PLANE" },
    { DisplayName: "Submersible", Class: "BOAT" },
    { DisplayName: "Kraken", Class: "BOAT" },
    { DisplayName: "Sugoi", Class: "SPORT" },
    { DisplayName: "Sultan", Class: "SPORT" },
    { DisplayName: "Sultan Classic", Class: "SPORT" },
    { DisplayName: "Sultan RS Classic", Class: "SPORT" },
    { DisplayName: "Sultan RS", Class: "SUPER" },
    { DisplayName: "Suntrap", Class: "BOAT" },
    { DisplayName: "Super Diamond", Class: "SEDAN" },
    { DisplayName: "SuperVolito", Class: "HELICOPTER" },
    { DisplayName: "SuperVolito Carbon", Class: "HELICOPTER" },
    { DisplayName: "Surano", Class: "SPORT" },
    { DisplayName: "Surfer", Class: "VAN" },
    { DisplayName: "Surfer", Class: "VAN" },
    { DisplayName: "Surge", Class: "SEDAN" },
    { DisplayName: "Swift", Class: "HELICOPTER" },
    { DisplayName: "Swift Deluxe", Class: "HELICOPTER" },
    { DisplayName: "Swinger", Class: "SPORT_CLASSIC" },
    { DisplayName: "T20", Class: "SUPER" },
    { DisplayName: "Taco Van", Class: "VAN" },
    { DisplayName: "Tailgater", Class: "SEDAN" },
    { DisplayName: "Tailgater S", Class: "SEDAN" },
    { DisplayName: "Taipan", Class: "SUPER" },
    { DisplayName: "Tampa", Class: "MUSCLE" },
    { DisplayName: "Drift Tampa", Class: "SPORT" },
    { DisplayName: "Weaponized Tampa", Class: "MUSCLE" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: null, Class: "UTILITY" },
    { DisplayName: "Freight Train", Class: "RAIL" },
    { DisplayName: "Taxi", Class: "SERVICE" },
    { DisplayName: "Technical", Class: "OFF_ROAD" },
    { DisplayName: "Technical Aqua", Class: "OFF_ROAD" },
    { DisplayName: "Technical Custom", Class: "OFF_ROAD" },
    { DisplayName: "Tempesta", Class: "SUPER" },
    { DisplayName: "Terrorbyte", Class: "COMMERCIAL" },
    { DisplayName: "Tezeract", Class: "SUPER" },
    { DisplayName: "Thrax", Class: "SUPER" },
    { DisplayName: "Thrust", Class: "MOTORCYCLE" },
    { DisplayName: "Thruster", Class: "MILITARY" },
    { DisplayName: "Tigon", Class: "SUPER" },
    { DisplayName: "Tipper", Class: "INDUSTRIAL" },
    { DisplayName: "Tipper", Class: "INDUSTRIAL" },
    { DisplayName: "Titan", Class: "PLANE" },
    { DisplayName: "Toreador", Class: "SPORT_CLASSIC" },
    { DisplayName: "Torero", Class: "SPORT_CLASSIC" },
    { DisplayName: "Tornado", Class: "SPORT_CLASSIC" },
    { DisplayName: "Tornado", Class: "SPORT_CLASSIC" },
    { DisplayName: "Tornado", Class: "SPORT_CLASSIC" },
    { DisplayName: "Tornado", Class: "SPORT_CLASSIC" },
    { DisplayName: "Tornado Custom", Class: "SPORT_CLASSIC" },
    { DisplayName: "Tornado Rat Rod", Class: "SPORT_CLASSIC" },
    { DisplayName: "Toro", Class: "BOAT" },
    { DisplayName: "Toro", Class: "BOAT" },
    { DisplayName: "Toros", Class: "SUV" },
    { DisplayName: "Tourbus", Class: "SERVICE" },
    { DisplayName: "Towtruck", Class: "UTILITY" },
    { DisplayName: "Towtruck", Class: "UTILITY" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Tractor", Class: "UTILITY" },
    { DisplayName: "Fieldmaster", Class: "UTILITY" },
    { DisplayName: "Fieldmaster", Class: "UTILITY" },
    { DisplayName: "Mobile Operations Center", Class: "UTILITY" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Anti-Aircraft Trailer", Class: "MILITARY" },
    { DisplayName: "Trashmaster", Class: "SERVICE" },
    { DisplayName: "Trashmaster", Class: "SERVICE" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Whippet Race Bike", Class: "CYCLE" },
    { DisplayName: "Endurex Race Bike", Class: "CYCLE" },
    { DisplayName: "Tri-Cycles Race Bike", Class: "CYCLE" },
    { DisplayName: "Trophy Truck", Class: "OFF_ROAD" },
    { DisplayName: "Desert Raid", Class: "OFF_ROAD" },
    { DisplayName: "Tropic", Class: "BOAT" },
    { DisplayName: "Tropic", Class: "BOAT" },
    { DisplayName: "Tropos Rallye", Class: "SPORT" },
    { DisplayName: "Tug", Class: "BOAT" },
    { DisplayName: "Tula", Class: "PLANE" },
    { DisplayName: "Tulip", Class: "MUSCLE" },
    { DisplayName: "Turismo Classic", Class: "SPORT_CLASSIC" },
    { DisplayName: "Turismo R", Class: "SUPER" },
    { DisplayName: "Trailer", Class: "UTILITY" },
    { DisplayName: "Tyrant", Class: "SUPER" },
    { DisplayName: "Tyrus", Class: "SUPER" },
    { DisplayName: "Utility Truck", Class: "UTILITY" },
    { DisplayName: "Utility Truck", Class: "UTILITY" },
    { DisplayName: "Utility Truck", Class: "UTILITY" },
    { DisplayName: "Vacca", Class: "SUPER" },
    { DisplayName: "Vader", Class: "MOTORCYCLE" },
    { DisplayName: "Vagner", Class: "SUPER" },
    { DisplayName: "Vagrant", Class: "OFF_ROAD" },
    { DisplayName: "Valkyrie", Class: "HELICOPTER" },
    { DisplayName: "Valkyrie MOD.0", Class: "HELICOPTER" },
    { DisplayName: "Vamos", Class: "MUSCLE" },
    { DisplayName: "Vectre", Class: "SPORT" },
    { DisplayName: "Velum", Class: "PLANE" },
    { DisplayName: "Velum 5-Seater", Class: "PLANE" },
    { DisplayName: "Verlierer", Class: "SPORT" },
    { DisplayName: "Verus", Class: "OFF_ROAD" },
    { DisplayName: "Vestra", Class: "PLANE" },
    { DisplayName: "Vetir", Class: "MILITARY" },
    { DisplayName: "Veto Classic", Class: "SPORT" },
    { DisplayName: "Veto Modern", Class: "SPORT" },
    { DisplayName: "Vigero", Class: "MUSCLE" },
    { DisplayName: "Vigilante", Class: "SUPER" },
    { DisplayName: "Vindicator", Class: "MOTORCYCLE" },
    { DisplayName: "Virgo", Class: "MUSCLE" },
    { DisplayName: "Virgo Classic Custom", Class: "MUSCLE" },
    { DisplayName: "Virgo Classic", Class: "MUSCLE" },
    { DisplayName: "Viseris", Class: "SPORT_CLASSIC" },
    { DisplayName: "Visione", Class: "SUPER" },
    { DisplayName: "Volatol", Class: "PLANE" },
    { DisplayName: "Volatus", Class: "HELICOPTER" },
    { DisplayName: "Voltic", Class: "SUPER" },
    { DisplayName: "Rocket Voltic", Class: "SUPER" },
    { DisplayName: "Voodoo Custom", Class: "MUSCLE" },
    { DisplayName: "Voodoo", Class: "MUSCLE" },
    { DisplayName: "Vortex", Class: "MOTORCYCLE" },
    { DisplayName: "V-STR", Class: "SPORT" },
    { DisplayName: "Warrener", Class: "SEDAN" },
    { DisplayName: "Warrener HKR", Class: "SEDAN" },
    { DisplayName: "Washington", Class: "SEDAN" },
    { DisplayName: "Wastelander", Class: "SERVICE" },
    { DisplayName: "Weevil", Class: "COMPACTS" },
    { DisplayName: "Windsor", Class: "COUPE" },
    { DisplayName: "Windsor Drop", Class: "COUPE" },
    { DisplayName: "Winky", Class: "OFF_ROAD" },
    { DisplayName: "Wolfsbane", Class: "MOTORCYCLE" },
    { DisplayName: "XA-21", Class: "SUPER" },
    { DisplayName: "XLS", Class: "SUV" },
    { DisplayName: "XLS (Armored)", Class: "SUV" },
    { DisplayName: "Yosemite", Class: "MUSCLE" },
    { DisplayName: "Drift Yosemite", Class: "MUSCLE" },
    { DisplayName: "Yosemite Rancher", Class: "OFF_ROAD" },
    { DisplayName: "Youga", Class: "VAN" },
    { DisplayName: "Youga Classic", Class: "VAN" },
    { DisplayName: "Youga Classic 4x4", Class: "VAN" },
    { DisplayName: "190z", Class: "SPORT_CLASSIC" },
    { DisplayName: "Zentorno", Class: "SUPER" },
    { DisplayName: "Zhaba", Class: "OFF_ROAD" },
    { DisplayName: "Zion", Class: "COUPE" },
    { DisplayName: "Zion Cabrio", Class: "COUPE" },
    { DisplayName: "Zion Classic", Class: "SPORT_CLASSIC" },
    { DisplayName: "Zombie Bobber", Class: "MOTORCYCLE" },
    { DisplayName: "Zombie Chopper", Class: "MOTORCYCLE" },
    { DisplayName: "Zorrusso", Class: "SUPER" },
    { DisplayName: "ZR350", Class: "SPORT" },
    { DisplayName: "Apocalypse ZR380", Class: "SPORT" },
    { DisplayName: "Future Shock ZR380", Class: "SPORT" },
    { DisplayName: "Nightmare ZR380", Class: "SPORT" },
    { DisplayName: "Z-Type", Class: "SPORT_CLASSIC" },
  ];
  const [filteredVehicleData, setFilteredVehicleData] = useState(vehicleData);

  useEffect(() => {
    let filteredData = vehicleData.filter(
      (vehicle) => vehicle.Class == dropdownText.toLocaleUpperCase()
    );
    setFilteredVehicleData(filteredData);
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
              currentClassId={currentClassId}
              setCurrentClassId={setCurrentClassId}
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
