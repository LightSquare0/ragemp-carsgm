import { browser } from "../client";
import { PrepareLogin } from "../players/Players";

mp.events.add({
  playerReady: (player) => {
    PrepareLogin();
  },

  browserDomReady: (browser) => {
    if (
      browser.url === "package://webview/index.html" ||
      "http://localhost:8080" ||
      "http://naivoe.go.ro:8080"
    ) {
      browser.call("react:DisplayLogin");
      mp.discord.update('race.invictum.mp | DEV BUILD', 'Logging in');
      mp.gui.chat.show(false);
      if (mp.storage.data.authData) {
        var authUsername = mp.storage.data.authData.username;
        var authPassword = mp.storage.data.authData.password;
        browser.call("react:triggerRememberMe", authUsername, authPassword);
      }
    }
  },
  
  sendLoginToServer: (username, password, rememberMe) => {
    if (rememberMe) {
      mp.storage.data.authData = { username: username, password: password };
    }
    mp.events.callRemote("serverside:OnPlayerLogin", username, password);
  },

  sendRegisterToServer: (username, password, email) => {
    mp.events.callRemote(
      "serverside:OnPlayerRegister",
      username,
      password,
      email
    );
  },

  "clientside:LoginResult": (result, playerName) => {
    browser.call("react:LoginResult", result, playerName);
    if (result == 1){
      mp.discord.update('race.invictum.mp | DEV BUILD', `as ${playerName}`)
    }
  },

  "clientside:RegisterResult": (result) => {
    browser.call("react:RegisterResult", result);
  },
});
