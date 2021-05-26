
mp.gui.chat.push("react client started");

let browser;

mp.events.add("guiReady", () => {
  browser = mp.browsers.new("package://index.html");
});

// Handle event from server and send data to react app
mp.events.add("onMessageFromServer", (value) => {
  browser.execute(`trigger('onMessage', '${value}')`);
});

// Handle event from react app
mp.events.add("showUrl", (url) => {
  mp.gui.chat.push(url);
});

// F2 - trigger cursor
mp.keys.bind(0x71, true, () => {
  let state = !mp.gui.cursor.visible;
  mp.gui.cursor.show(state, state);
});

mp.events.add("sendInformationToServer", (username, password) => {
  mp.events.callRemote("serverside:OnPlayerLogin", username, password);
});

mp.events.add("clientside:LoginResult", (result) => {
  browser.call("react:LoginResult", result);
})