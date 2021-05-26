import { CardContent, CardHeader, CardWrapper } from "./CardStyles";

const Card = (props) => {
  return (
    <>
      <CardWrapper style={{padding: "0px 0px 0px 0px"}}>
        <CardHeader>{props.header}</CardHeader>
        <CardContent row>
         {props.children}
        </CardContent>
      </CardWrapper>
    </>
  );
};

export default Card;
