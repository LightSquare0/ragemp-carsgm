mp.players.local.freezePosition(true);
mp.gui.chat.show(false);
mp.game.ui.displayRadar(false);
let sceneryCamera = mp.cameras.new(
  "default",
  new mp.Vector3(-640.68726, 36.51645, 61.35225),
  new mp.Vector3(0, 0, 0),
  40
);

sceneryCamera.pointAtCoord(-700.28845, -8.905725, 50.32167); // Changes the rotation of the camera to point towards a location
sceneryCamera.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);

mp.events.add("browserDomReady", (browser) => {
  if (browser.url === "http://localhost:8080") {
    browser.call("react:DisplayLogin");
  }
});

mp.events.add("sendLoginToServer", (username, password) => {
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
