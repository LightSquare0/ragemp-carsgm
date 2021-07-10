mp.gui.chat.push("react client started");
// F2 - trigger cursor
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
  // mp.game.graphics.startScreenEffect("DeathFailNeutralIn", 5000, false);

  mp.game.cam.doScreenFadeOut(300);
  setTimeout(() => {
    mp.game.cam.doScreenFadeIn(300);
  }, 3000);
});

mp.gui.chat.show(false);

let chatbox = mp.browsers.new("package://hud/chat/chat.html");
chatbox.markAsChat();
