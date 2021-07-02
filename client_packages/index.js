

var browser;
browser = mp.browsers.new("http://localhost:8080");

require("./client.js");
require("./auth/Auth.js");
require("./hud/Speedometer.js");
require("./flymode/fly.js");
require("./race/Race.js")
