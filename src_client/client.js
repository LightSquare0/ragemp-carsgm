require("./auth/Auth.js");
require("./hud/Speedometer.js");
require("./flymode/fly.js");
require("./race/Race.js");
require("./players/Players.js");
require("./race/RaceManager.js");
require("./notifications/Notifications.js");
require("./MoveSkyCamera/index");
require("./race/RaceCreator");
require("./server/ServerData")

mp.gui.chat.show(false);

export const chatbox = mp.browsers.new("package://chat/chat.html");
chatbox.markAsChat();

export const browser = mp.browsers.new("http://naivoe.go.ro:8080");
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
