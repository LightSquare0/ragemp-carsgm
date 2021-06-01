import { useEffect, useState } from "react";
import Card from "../../General Components/Card/Card";
import Checkbox from "../../General Components/Checkbox/Checkbox";
import Input from "../../General Components/Input/Input";
import { Button } from "../../Globals/GlobalStyles/ButtonStyles";
import {
  Container,
  ControlsContainer,
  FormContainer,
  Hr,
  NewsContainer,
  Option,
  OptionsContainer,
  Photo,
  ServerLogo,
} from "./AuthStyles";
import athrons_logo from "../../Static/athrons_logo.svg";
import artwork from "../../Static/artwork_stunts_cropped.jpg";
import { Redirect } from "react-router-dom";

const Auth: React.FC = () => {
  const [authType, SetAuthType] = useState("login");

  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [email, SetEmail] = useState("");
  const [rememberMe, SetRememberMe] = useState(false);
  const [loginResult, SetLoginResult] = useState(-1);

  const HandleChange = (event: any, field: any) => {
    if (field === "username") {
      SetUsername(event.target.value);
    } else if (field === "password") {
      SetPassword(event.target.value);
    } else if (field === "email") SetEmail(event.target.value);
  };

  const HandleRemember = (event: any) => {
    SetRememberMe(event.target.checked);
  };

  const HandlePageChange = () => {
    if (authType == "login") SetAuthType("register");
    else SetAuthType("login");
  };

  const HandleLogin = () => {
    //@ts-ignore
    mp.trigger("sendInformationToServer", username, password);
  };

//@ts-ignore
  mp.events.add("react:LoginResult", (result: any) => {
    SetLoginResult(result);
    console.log(`set result to ${result}`);
  });

  if (loginResult == 1) {
    return <Redirect to="/" push />;
  } else if (loginResult == 0) {
    return <h1>mai baga o fisa</h1>;
  }

  console.log(username);
  console.log(password);
  return (
    <Container>
      <Card>
        <NewsContainer>
          <Photo src={artwork}></Photo>
        </NewsContainer>
        <ControlsContainer>
          <FormContainer>
            <ServerLogo src={athrons_logo}></ServerLogo>
            {authType == "login" && (
              <>
                <Input
                  icon="user"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => HandleChange(e, "username")}
                ></Input>
                <Input
                  icon="key-solid"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => HandleChange(e, "password")}
                ></Input>

                <Checkbox
                  checked={rememberMe}
                  onChange={HandleRemember}
                  text="Remember me"
                />

                <Button
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  onClick={HandleLogin}
                >
                  Login
                </Button>
              </>
            )}

            {authType == "register" && (
              <>
                <Input
                  icon="user"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => HandleChange(e, "username")}
                ></Input>
                <Input
                  icon="at-solid"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => HandleChange(e, "email")}
                ></Input>
                <Input
                  icon="key-solid"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => HandleChange(e, "password")}
                ></Input>

                <Button style={{ marginLeft: "auto", marginRight: "auto" }}>
                  Register
                </Button>
              </>
            )}
          </FormContainer>
          <Hr />
          <OptionsContainer>
            <Option>Forgot password?</Option>
            <Option onClick={() => HandlePageChange()}>
              {authType == "login" ? <>Register here</> : <>Login here</>}
            </Option>
          </OptionsContainer>
        </ControlsContainer>
      </Card>
    </Container>
  );
};

export default Auth;
