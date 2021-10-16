import { browser } from "../client";

mp.events.add("clientside:SendServerData", () => {
  mp.events.callRemoteProc("serverside:SendServerData").then((data) => {
    browser.call("react:GetServerData", data);
  });
});
