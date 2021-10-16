import { useState } from "react";
import Card from "../../General Components/Card/Card";
import Checkbox from "../../General Components/Checkbox/Checkbox";
import Input from "../../General Components/Input/Input";
import { Button } from "../../Globals/GlobalStyles/ButtonStyles";
import {
  ControlsContainer,
  FormContainer,
  LogoHead,
  Option,
  OptionsContainer,
} from "./AuthStyles";
import { useContext } from "react";
import { NotificationsContext } from "../../General Components/Notifications/NotificationsContext";
import { useHistory, withRouter } from "react-router-dom";
import { Container } from "../../Utils/UtilsStyles";
import { Skewify, DeSkewify } from "../../Globals/GlobalStyles/Skew";
import { Routes } from "../../Utils/RoutesEnum";

interface UserObject {
  username: string;
  password: string;
  email: string;
}
//@ts-ignore
// mp.invoke("focus", true);

const Auth: React.FC = (props) => {
  const history = useHistory();

  const [authType, SetAuthType] = useState<string>("login");
  const [userdata, SetUserdata] = useState<UserObject>({
    username: "",
    password: "",
    email: "",
  });
  const [rememberMe, SetRememberMe] = useState<boolean>(false);
  const [loginResult, SetLoginResult] = useState<number>(-1);

  const { Notify } = useContext(NotificationsContext);

  const HandleChange = (event: any) => {
    const value = event.target.value;
    SetUserdata({
      ...userdata,
      [event.target.name]: value,
    });
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
      mp.trigger("sendLoginToServer", username, password, rememberMe);
    } else {
      //@ts-ignore
      mp.trigger("sendRegisterToServer", username, password, email);
    }
  };

  mp.events.add("react:LoginResult", (result: number, playerName: string) => {
    SetLoginResult(result);
    console.log(`set result to ${result}`);
    if (result == 1) {
      //@ts-ignore
      // mp.invoke("focus", false);
      mp.trigger("clientside:OpenGamemodeSelectorUI");
    }
  });
  mp.events.add("react:RegisterResult", (result: number) => {
    SetLoginResult(result);
    console.log(`set result to ${result}`);
  });

  mp.events.add("react:triggerRememberMe", (authUsername, authPassword) => {
    SetUserdata({ username: authUsername, password: authPassword, email: "" });
    SetRememberMe(true);
  });

  return (
    <Container>
      <ControlsContainer>
        <FormContainer>
          <LogoHead>
            Invictum <span>Racing</span>
          </LogoHead>
          {authType == "login" && (
            <>
              <Input
                icon="user"
                placeholder="Type your username"
                name="username"
                type="text"
                value={userdata.username}
                onChange={HandleChange}
              ></Input>
              <Input
                icon="key-solid"
                placeholder="Type your password"
                name="password"
                type="password"
                value={userdata.password}
                onChange={HandleChange}
              ></Input>
              <div
                style={{
                  alignSelf: "flex-start",
                  marginBottom: "1.3rem",
                  marginLeft: "2.6rem",
                }}
              >
                <Checkbox
                rounded={false}
                  checked={rememberMe}
                  onChange={HandleRemember}
                  text="Remember me"
                />
              </div>

              <Button
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={HandleAuth}
              >
                <div>Login</div>
              </Button>
            </>
          )}

          {authType == "register" && (
            <>
              <Input
                icon="user"
                placeholder="Type your desired username"
                type="text"
                name="username"
                value={userdata.username}
                onChange={HandleChange}
              ></Input>
              <Input
                icon="at-solid"
                placeholder="Enter a valid email adress"
                name="email"
                type="text"
                value={userdata.email}
                onChange={HandleChange}
              ></Input>
              <Input
                icon="key-solid"
                placeholder="Type your password"
                name="password"
                type="password"
                value={userdata.password}
                onChange={HandleChange}
              ></Input>

              <Button
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={HandleAuth}
              >
                <div>Register</div>
              </Button>
            </>
          )}
        </FormContainer>
        <OptionsContainer>
          <Option>Forgot password?</Option>
          <Option onClick={() => HandlePageChange()}>
            {authType == "login" ? <>Create an account</> : <>Login here</>}
          </Option>
        </OptionsContainer>
      </ControlsContainer>
    </Container>
  );
};

export default withRouter(Auth);
