mp.players.local.freezePosition(true);
mp.gui.chat.show(false);
mp.game.ui.displayRadar(false);
let sceneryCamera = mp.cameras.new(
  "default",
  new mp.Vector3(-640.68726, 36.51645, 61.35225),
  new mp.Vector3(0, 0, 0),
  40
);

sceneryCamera.pointAtCoord(-700.28845, -8.905725, 50.32167); 
sceneryCamera.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);

mp.events.add("browserDomReady", (browser) => {
  if (browser.url === "package://webview/index.html" || "http://localhost:8080" || "http://naivoe.go.ro:8080") {
    browser.call("react:DisplayLogin");
    if (mp.storage.data.authData) {
      authUsername = mp.storage.data.authData.username;
      authPassword = mp.storage.data.authData.password;
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
    mp.gui.chat.show(true);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
    mp.players.local.freezePosition(false);
    mp.game.ui.displayRadar(true);
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
