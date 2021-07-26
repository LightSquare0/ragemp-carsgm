import { browser } from "../client";


mp.events.add("clientside:DisplayNotification", (type, title, text) => {
  browser.call("react:DisplayNotification", type, title, text);
});
