import { CardContent, CardHeader, CardWrapper } from "./CardStyles";

interface Props {
  header?: string,
  row?: boolean,
  column?: boolean,
}

const Card: React.FC<Props> = (props) => {
  return (
    <>
      <CardWrapper>
        <CardHeader>{props.header}</CardHeader>
        <CardContent row = {props.row} column = {props.column} >
         {props.children}
        </CardContent>
      </CardWrapper>
    </>
  );
};

export default Card;
