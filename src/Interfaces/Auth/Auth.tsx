import { useState } from "react";
import Card from "../../General Components/Card/Card";
import Checkbox from "../../General Components/Checkbox/Checkbox";
import Input from "../../General Components/Input/Input";
import { Button } from "../../Globals/GlobalStyles/ButtonStyles";
import {
  Container,
  ControlsContainer,
  FormContainer,
  Hr,
  Option,
  OptionsContainer,
  ServerLogo,
} from "./AuthStyles";
import athrons_logo from "../../Static/athrons_logo.svg";
import { Redirect, useHistory } from "react-router-dom";
import React from "react";

interface UserObject {
  username: string;
  password: string;
  email: string;
}
//@ts-ignore
mp.invoke("focus", true);

const Auth: React.FC = () => {
  const [authType, SetAuthType] = useState<string>("login");
  const [userdata, SetUserdata] = useState<UserObject>({
    username: "",
    password: "",
    email: "",
  });
  const [rememberMe, SetRememberMe] = useState<boolean>(false);
  const [loginResult, SetLoginResult] = useState<number>(-1);

  const HandleChange = (event: any) => {
    const value = event.target.value;
    SetUserdata({
      ...userdata,
      [event.target.name]: value,
    });
    console.log(value);
    console.log(event.target.name);
  };

  const HandleRemember = (event: any) => {
    SetRememberMe(event.target.checked);
  };

  const HandlePageChange = () => {
    if (authType == "login") SetAuthType("register");
    else SetAuthType("login");
  };

  const HandleAuth = () => {
    const { username, password, email } = userdata;

    if (authType == "login") {
      //@ts-ignore
      mp.trigger("sendLoginToServer", username, password);
    } else {
      //@ts-ignore
      mp.trigger("sendRegisterToServer", username, password, email);
    }
  };

  //@ts-ignore
  mp.events.add("react:LoginResult", (result: number) => {
    SetLoginResult(result);
    console.log(`set result to ${result}`);
  });
  //@ts-ignore
  mp.events.add("react:RegisterResult", (result: number) => {
    SetLoginResult(result);
    console.log(`set result to ${result}`);
  });

  if (loginResult == 1) {
    //@ts-ignore
    mp.invoke("focus", false);
    return <Redirect to="/" push />;
  } else if (loginResult == 0) {
    return <h1>mai baga o fisa</h1>;
  }

  return (
    <Container>
      <Card>
        <ControlsContainer>
          <FormContainer>
            <ServerLogo src={athrons_logo}></ServerLogo>
            {authType == "login" && (
              <>
                <Input
                  icon="user"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={userdata.username}
                  onChange={HandleChange}
                ></Input>
                <Input
                  icon="key-solid"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={userdata.password}
                  onChange={HandleChange}
                ></Input>

                <Checkbox
                  checked={rememberMe}
                  onChange={HandleRemember}
                  text="Remember me"
                />

                <Button
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  onClick={HandleAuth}
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
                  name="username"
                  value={userdata.username}
                  onChange={HandleChange}
                ></Input>
                <Input
                  icon="at-solid"
                  placeholder="Email"
                  name="email"
                  type="text"
                  value={userdata.email}
                  onChange={HandleChange}
                ></Input>
                <Input
                  icon="key-solid"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={userdata.password}
                  onChange={HandleChange}
                ></Input>

                <Button
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  onClick={HandleAuth}
                >
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
