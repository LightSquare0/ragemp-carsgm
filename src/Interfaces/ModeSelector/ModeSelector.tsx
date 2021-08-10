import { Container } from "../../Utils/UtilsStyles";
import { Avatar, PlayerStats, Username } from "./ModeSelectorStyles";
// import { CircularProgressbar } from "react-circular-progressbar";
// import 'react-circular-progressbar/dist/styles.css';

const ModeSelector: React.FC = (props) => {
  return (
    <>
      <PlayerStats>
	<Username>Laity</Username>
	<Avatar src = "https://a.rsg.sc//n/light_square/n"/>

      </PlayerStats>
      <Container>{props.children}</Container>
    </>
  );
};

export default ModeSelector;
