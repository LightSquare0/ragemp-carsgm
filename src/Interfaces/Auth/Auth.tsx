import { useState } from "react";
import Card from "../../General Components/Card/Card";
import Checkbox from "../../General Components/Checkbox/Checkbox";
import Input from "../../General Components/Input/Input";
import { Button } from "../../Globals/GlobalStyles/ButtonStyles";
import {
  ControlsContainer,
  FormContainer,
  Hr,
  Option,
  OptionsContainer,
  ServerLogo,
  Title,
} from "./AuthStyles";
import athrons_logo from "../../Static/athrons_logo.svg";
import { useContext } from "react";
import { NotificationsContext } from "../../General Components/Notifications/NotificationsContext";
import { withRouter } from "react-router-dom";
import { Container } from "../../Utils/UtilsStyles";

interface UserObject {
  username: string;
  password: string;
  email: string;
}
//@ts-ignore
mp.invoke("focus", true);

const Auth: React.FC = (props) => {
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
      mp.trigger("sendLoginToServer", username, password, rememberMe);
    } else {
      //@ts-ignore
      mp.trigger("sendRegisterToServer", username, password, email);
    }
  };

  mp.events.add("react:LoginResult", (result: number) => {
    SetLoginResult(result);
    console.log(`set result to ${result}`);
    if (result == 1) {
      //@ts-ignore
      // mp.invoke("focus", false);
      //@ts-ignore
      props.history.push("/");
    } else if (result == 0) {
      Notify("Eroare de compilare", "Mai baga o fisa", "error");
      console.log("samppppppp");
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
      <Card>
        <ControlsContainer>
          <FormContainer>
            <ServerLogo src={athrons_logo}></ServerLogo>
            {authType == "login" && (
              <>
                <Title>Login</Title>
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
                <Title>Register</Title>
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

export default withRouter(Auth);
