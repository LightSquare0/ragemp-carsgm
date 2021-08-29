import { Container } from "../../Utils/UtilsStyles";
import DownArrow from "../../Static/down-arrow.svg";
import {
  Avatar,
  DropdownArrow,
  Header,
  TopBar,
  User,
  UserArea,
} from "./GeneralInterfaceStyles";

interface GeneralItems {
  header: string;
}

const userstring = "https://a.rsg.sc//n/light_square/s";

const GeneralInterface: React.FC<GeneralItems> = (props) => {
  return (
    <Container>
      <TopBar>
        <Header>{props.header}</Header>
        <UserArea>
          <Avatar src={userstring} />
          <User>Laity</User>
          <DropdownArrow src={DownArrow} />
        </UserArea>
      </TopBar>
      {props.children}
    </Container>
  );
};

export default GeneralInterface;
