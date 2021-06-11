mp.gui.chat.push("react client started");
// F2 - trigger cursor
mp.keys.bind(0x71, true, () => {
  let state = !mp.gui.cursor.visible;
  mp.gui.cursor.show(state, state);
});

mp.gui.chat.show(false);

let chatbox = mp.browsers.new('package://hud/chat/chat.html');
chatbox.markAsChat()