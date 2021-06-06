mp.events.add("sendLoginToServer", (username, password) => {
  mp.events.callRemote("serverside:OnPlayerLogin", username, password);
});

mp.events.add("sendRegisterToServer", (username, password, email) => {
  mp.events.callRemote("serverside:OnPlayerRegister", username, password, email);
})

mp.events.add("clientside:LoginResult", (result) => {
  browser.call("react:LoginResult", result);
})

mp.events.add("clientside:RegisterResult", (result) => {
  browser.call("react:RegisterResult", result);
})
