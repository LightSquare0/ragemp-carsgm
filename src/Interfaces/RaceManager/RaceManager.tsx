import Card from "../../General Components/Card/Card";
import { Container } from "../Auth/AuthStyles";

const RaceManager: React.FC = () => {
  return (
    <Container>
      <Card header="Race Manager UI">
	Select a lobby or host one.
      </Card>
    </Container>
  );
};

export default RaceManager;
