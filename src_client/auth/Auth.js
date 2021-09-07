import { browser } from "../client";
import { PrepareLogin } from "../players/Players";

PrepareLogin();

mp.events.add("browserDomReady", (browser) => {
  if (browser.url === "package://webview/index.html" || "http://localhost:8080" || "http://naivoe.go.ro:8080") {
    browser.call("react:DisplayLogin");
    mp.gui.chat.show(false);
    if (mp.storage.data.authData) {
      var authUsername = mp.storage.data.authData.username;
      var authPassword = mp.storage.data.authData.password;
      browser.call("react:triggerRememberMe", authUsername, authPassword);
    }
  }
});

mp.events.add("sendLoginToServer", (username, password, rememberMe) => {
  if (rememberMe) {
    mp.storage.data.authData = { username: username, password: password };
  }
  mp.events.callRemote("serverside:OnPlayerLogin", username, password);
});

mp.events.add("sendRegisterToServer", (username, password, email) => {
  mp.events.callRemote(
    "serverside:OnPlayerRegister",
    username,
    password,
    email
  );
});

mp.events.add("clientside:LoginResult", (result, playerName) => {
  browser.call("react:LoginResult", result, playerName);
  if (result === 1) {

  }
});

mp.events.add("clientside:RegisterResult", (result) => {
  browser.call("react:RegisterResult", result);
  if (result === 1) {
    mp.gui.chat.show(true);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.players.local.freezePosition(false);
    mp.game.ui.displayRadar(true);
  }
});
