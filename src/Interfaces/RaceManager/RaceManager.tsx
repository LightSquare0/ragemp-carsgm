import Card from "../../General Components/Card/Card";
import { Container } from "../../Utils/UtilsStyles";
import { RaceList, SelectedRace } from "./RaceManagerStyles";

const RaceManager: React.FC = () => {
  return (
    <Container>
      <Card row>
        <RaceList>
          <tr>
            <th>Lobby name</th>
            <th>Clients</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>
              Jucam samp aici
              <br />
              Eclipse Tour - City
            </td>
            <td>
              15/22
            </td>
            <td>
              Waiting
            </td>
          </tr>
        </RaceList>
        <SelectedRace></SelectedRace>
      </Card>
    </Container>
  );
};

export default RaceManager;
