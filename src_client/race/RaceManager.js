import { browser } from "../client";

mp.events.add("clientside:OpenRaceManagerUI", () => {
	browser.call("react:OpenRaceManagerUI");
	mp.gui.chat.push("called" + "\n");
});
