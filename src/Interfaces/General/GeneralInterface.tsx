import { Container } from "../../Utils/UtilsStyles";
import {
  Avatar,
  DropdownArrow,
  Header,
  TopBar,
  User,
  UserArea,
} from "./GeneralInterfaceStyles";
import { UserContext } from "../../Globals/UserContext";
import { ServerData } from "../../Hud/RaceUi/RaceHud/RaceEvents";
import { useContext } from "react";

interface GeneralItems {
  header: string;
}

const userstring = "https://a.rsg.sc//n/light_square/s";

const GeneralInterface: React.FC<GeneralItems> = (props) => {
  
  const { ServerData, setServerData } = useContext<{
    ServerData: ServerData;
    setServerData: React.Dispatch<React.SetStateAction<ServerData>>;
  }>(UserContext);

  return (
    <Container>
      <TopBar>
        <Header>{props.header}</Header>
        <UserArea>
          <Avatar src={userstring} />
          <User>{ServerData.Player.Name}</User>
          <DropdownArrow color="white" size="1rem" icon="caret-down-solid" />
        </UserArea>
      </TopBar>
      {props.children}
    </Container>
  );
};

export default GeneralInterface;
