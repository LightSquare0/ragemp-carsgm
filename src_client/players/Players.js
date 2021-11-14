import { browser } from "../client";

mp.events.add("clientside:SpawnPlayer", () => {
  RemoveBackground();
  mp.events.call("clientside:DisplayRoot");
});

export const PrepareBackground = () => {
  mp.players.local.freezePosition(true);
  mp.events.callRemote("serverside:SetPlayerTransparency", 0);
  mp.game.ui.displayRadar(false);
  let sceneryCamera = mp.cameras.new(
    "default",
    new mp.Vector3(-45.322342, -824.4542, 1296.235),
    new mp.Vector3(0, 0, 0),
    40
  );

  mp.players.local.position = new mp.Vector3(-45.322342, -824.4542, 1296.235);
  mp.game.gameplay.setWeatherTypeNowPersist("CLEAR");
  mp.game.invoke("0xF36199225D6D8C86", 0.0);
  sceneryCamera.setActive(true);
  sceneryCamera.shake("HAND_SHAKE", 0.7);
  sceneryCamera.pointAtCoord(-45.322342, -824.4542, 987.33685);
  mp.game.graphics.transitionToBlurred(2000);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
};

export const RemoveBackground = () => {
  mp.gui.chat.show(true);
  mp.game.cam.renderScriptCams(false, true, 2000, true, false);
  mp.events.callRemote("serverside:SetPlayerTransparency", 255);
  mp.players.local.freezePosition(false);
  mp.game.graphics.transitionFromBlurred(500);
  mp.game.ui.displayRadar(true);
};
