import { browser } from "../client";

mp.players.local.freezePosition(true);
mp.game.ui.displayRadar(false);
let sceneryCamera = mp.cameras.new(
  "default",
  new mp.Vector3(-45.322342, -824.4542, 1296.235),
  new mp.Vector3(0, 0, 0),
  40
);

mp.game.gameplay.setWeatherTypeNowPersist("CLEAR");
mp.game.invoke("0xF36199225D6D8C86", 0.0);
sceneryCamera.setActive(true);
sceneryCamera.shake("HAND_SHAKE", 0.7); 
sceneryCamera.pointAtCoord(-45.322342, -824.4542, 987.33685);
mp.game.graphics.transitionToBlurred(2000);
mp.game.cam.renderScriptCams(true, false, 0, true, false);

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

mp.events.add("clientside:LoginResult", (result) => {
  browser.call("react:LoginResult", result);
  if (result === 1) {
    // mp.events.call("clientside:OpenRaceManagerUI");
    mp.gui.chat.show(true);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.players.local.freezePosition(false);
    mp.game.graphics.transitionFromBlurred(500);
    mp.game.ui.displayRadar(true);
sceneryCamera.shake("HAND_SHAKE", 0.0); 
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
