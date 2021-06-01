import { CardContent, CardHeader, CardWrapper } from "./CardStyles";

interface Props {
  header?: string,
  row?: string

}

const Card: React.FC<Props> = (props) => {
  return (
    <>
      <CardWrapper style={{padding: "0px 0px 0px 0px"}}>
        <CardHeader>{props.header}</CardHeader>
        <CardContent>
         {props.children}
        </CardContent>
      </CardWrapper>
    </>
  );
};

export default Card;
