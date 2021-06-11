let browser;
browser = mp.browsers.new("http://localhost:8080");
mp.gui.chat.push("browser created")

require("./client.js")
require("./auth/Auth.js")
require("./hud/Speedometer.js")