import { Skewify } from "../../Globals/GlobalStyles/Skew";
import GeneralInterface from "../General/GeneralInterface";
import {
  Gamemode,
  GamemodeContainer,
  GamemodeContent,
  GamemodeDescription,
  GamemodeTitle,
  GamemodeWallpaper,
} from "./GamemodeSelectorStyles";
import freeroam from "../../Static/freeroam-edited.png";
import racing from "../../Static/races-edited.png";

const GamemodeSelector: React.FC = (props) => {
  const SelectGamemode = (gamemode: string) => {
    switch (gamemode) {
      case "freemode":
        //@ts-ignore
        mp.trigger("clientside:GamemodeFreemodeSelected");
        break;
      case "racing":
        //@ts-ignore
        mp.trigger("clientside:GamemodeRacingSelected");
      default:
        break;
    }
  };

  return (
    <>
      <GeneralInterface header="Select a gamemode">
        <GamemodeContainer>
          <Gamemode onClick={() => SelectGamemode("freemode")}>
            <GamemodeWallpaper src={freeroam} />
            <GamemodeContent>
              <GamemodeTitle>FREEROAM</GamemodeTitle>
              <GamemodeDescription>
                Roam freely around the streets of Los Santos and Blaine County,
                use your hard earned money to buy your dream cars and
                properties. Participate in head-to-head races and various
                events.
              </GamemodeDescription>
            </GamemodeContent>
          </Gamemode>
          <Gamemode onClick={() => SelectGamemode("racing")}>
            <GamemodeWallpaper src={racing} />
            <GamemodeContent>
              <GamemodeTitle>RACING</GamemodeTitle>
              <GamemodeDescription>
                Race through more than 200 unique tracks around Los Santos and
                Blaine County and defeat your opponents while earning money and
                unlocking new posibilities.
              </GamemodeDescription>
            </GamemodeContent>
          </Gamemode>
        </GamemodeContainer>
      </GeneralInterface>
    </>
  );
};

export default GamemodeSelector;
