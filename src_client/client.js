require("./auth/Auth.js");
require("./hud/Speedometer.js");
require("./flymode/fly.js");
require("./race/Race.js");
require("./players/Players.js");
require("./race/RaceManager.js");
require("./notifications/Notifications.js");
require("./MoveSkyCamera/index");
require("./race/RaceCreator");
require("./server/ServerData");

let urls = {
  compiled: "package://webview/index.html",
  live: "http://naivoe.go.ro:8080"
}

mp.game.ui.setRadarZoom(900);
mp.gui.chat.show(false);

export const chatbox = mp.browsers.new("package://chat/chat.html");
chatbox.markAsChat();

export let browser = undefined;
mp.nametags.enabled = false;
browser = mp.browsers.new(urls.live);

mp.game.gxt.set("PM_PAUSE_HDR", "Invictum Racing");
// ` - trigger cursor
mp.keys.bind(0xc0, true, () => {
  let state = !mp.gui.cursor.visible;
  mp.gui.cursor.show(state, state);
});

mp.events.add("clientside:PlayEffect", (effect, duration, loopable) => {
  mp.game.graphics.startScreenEffect(effect, duration, loopable);
});

mp.events.add("clientside:StopEffect", (effect) => {
  mp.game.graphics.stopScreenEffect(effect);
});

mp.events.add("playerDeath", (player, reason, killer) => {
  mp.game.cam.doScreenFadeOut(300);
  setTimeout(() => {
    mp.game.cam.doScreenFadeIn(300);
  }, 3000);
});


mp.keys.bind(0x72, false, () => { // F3
  if (!mp.game.recorder.isRecording()) {
    mp.game.recorder.start(1);
  } else {
    mp.game.recorder.stop();
  }
});